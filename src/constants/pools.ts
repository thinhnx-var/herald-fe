import type { ChartTimeframe } from "@/types";

/** GeckoTerminal pool addresses for each trading pair (SaucerSwap V2). */
export const POOL_ADDRESSES: Record<string, string> = {
	"HBAR-USDC": "0xc5b707348da504e9be1bd4e21525459830e7b11d",
};

/** Default candle limit per timeframe. */
export const OHLCV_LIMITS: Record<ChartTimeframe, number> = {
	"5m": 300,
	"15m": 200,
	"1h": 200,
	"4h": 200,
	"1D": 365,
};
