import type { WsMessage } from "@/types";

type MessageHandler = (message: WsMessage) => void;

interface WebSocketClientOptions {
	url: string;
	reconnectInterval?: number;
	maxReconnectAttempts?: number;
	onOpen?: () => void;
	onClose?: () => void;
	onError?: (error: Event) => void;
}

export class WebSocketClient {
	private ws: WebSocket | null = null;
	private readonly url: string;
	private readonly reconnectInterval: number;
	private readonly maxReconnectAttempts: number;
	private reconnectAttempts = 0;
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private handlers = new Map<string, Set<MessageHandler>>();
	private isManualClose = false;
	private readonly options: WebSocketClientOptions;

	constructor(options: WebSocketClientOptions) {
		this.options = options;
		this.url = options.url;
		this.reconnectInterval = options.reconnectInterval ?? 3000;
		this.maxReconnectAttempts = options.maxReconnectAttempts ?? 10;
	}

	connect(): void {
		if (this.ws?.readyState === WebSocket.OPEN) return;

		this.isManualClose = false;
		this.ws = new WebSocket(this.url);

		this.ws.onopen = () => {
			this.reconnectAttempts = 0;
			this.options.onOpen?.();
		};

		this.ws.onmessage = (event: MessageEvent) => {
			try {
				const message: WsMessage = JSON.parse(event.data as string);
				const typeHandlers = this.handlers.get(message.type);
				if (typeHandlers) {
					for (const handler of typeHandlers) handler(message);
				}
				const allHandlers = this.handlers.get("*");
				if (allHandlers) {
					for (const handler of allHandlers) handler(message);
				}
			} catch (err) {
				console.error("[WS] Failed to parse message:", err);
			}
		};

		this.ws.onclose = () => {
			this.options.onClose?.();
			if (!this.isManualClose) {
				this.scheduleReconnect();
			}
		};

		this.ws.onerror = (error) => {
			this.options.onError?.(error);
		};
	}

	disconnect(): void {
		this.isManualClose = true;
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
		this.ws?.close();
		this.ws = null;
	}

	subscribe(type: string, handler: MessageHandler): () => void {
		if (!this.handlers.has(type)) {
			this.handlers.set(type, new Set());
		}
		this.handlers.get(type)?.add(handler);

		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify({ action: "subscribe", channel: type }));
		}

		return () => {
			this.handlers.get(type)?.delete(handler);
		};
	}

	send(data: unknown): void {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(data));
		}
	}

	get isConnected(): boolean {
		return this.ws?.readyState === WebSocket.OPEN;
	}

	private scheduleReconnect(): void {
		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.warn("[WS] Max reconnect attempts reached");
			return;
		}

		this.reconnectAttempts++;
		const delay = this.reconnectInterval * Math.min(this.reconnectAttempts, 5);

		this.reconnectTimer = setTimeout(() => {
			this.connect();
		}, delay);
	}
}
