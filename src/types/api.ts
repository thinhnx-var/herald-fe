export interface ApiResponse<T> {
	data: T;
	status: number;
	message?: string;
}

export type WsMessageType = "price" | "position_update" | "candle";

export interface WsMessage<T = unknown> {
	type: WsMessageType;
	pair: string;
	payload: T;
	timestamp: number;
}
