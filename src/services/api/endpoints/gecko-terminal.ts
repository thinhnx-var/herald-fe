import axios from "axios";
import type { Candle, ChartTimeframe } from "@/types";

const GECKO_BASE_URL = "https://api.geckoterminal.com/api/v2";

const geckoClient = axios.create({
	baseURL: GECKO_BASE_URL,
	timeout: 15_000,
	headers: { Accept: "application/json" },
});

interface TimeframeConfig {
	timeframe: "minute" | "hour" | "day";
	aggregate: number;
}

const TIMEFRAME_MAP: Record<ChartTimeframe, TimeframeConfig> = {
	"5m": { timeframe: "minute", aggregate: 5 },
	"15m": { timeframe: "minute", aggregate: 15 },
	"1h": { timeframe: "hour", aggregate: 1 },
	"4h": { timeframe: "hour", aggregate: 4 },
	"1D": { timeframe: "day", aggregate: 1 },
};

interface GeckoOhlcvResponse {
	data: {
		id: string;
		type: string;
		attributes: {
			ohlcv_list: [number, string, string, string, string, string][];
		};
	};
}

export async function fetchOhlcv(
	poolAddress: string,
	chartTimeframe: ChartTimeframe,
	limit = 300,
): Promise<Candle[]> {
	const { timeframe, aggregate } = TIMEFRAME_MAP[chartTimeframe];

	const response = await geckoClient.get<GeckoOhlcvResponse>(
		`/networks/hedera-hashgraph/pools/${poolAddress}/ohlcv/${timeframe}`,
		{
			params: {
				aggregate,
				limit,
				currency: "usd",
			},
		},
	);

	const raw = response.data.data.attributes.ohlcv_list;

	return raw
		.map(([timestamp, open, high, low, close, volume]) => ({
			time: timestamp,
			open: Number(open),
			high: Number(high),
			low: Number(low),
			close: Number(close),
			volume: Number(volume),
		}))
		.reverse();
}
