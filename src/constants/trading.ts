import type { ChartPeriod, ChartTimeframe, FeeConfig } from "@/types";

export const LEVERAGE_PRESETS = [0, 2, 4, 6, 8, 10];
export const LEVERAGE_MIN = 0;
export const LEVERAGE_MAX = 10;
export const LEVERAGE_STEP = 0.1;

export const CHART_TIMEFRAMES: ChartTimeframe[] = [
	"5m",
	"15m",
	"1h",
	"4h",
	"1D",
];

export const CHART_PERIODS: ChartPeriod[] = [
	"1D",
	"5D",
	"1M",
	"3M",
	"6M",
	"YTD",
	"1Y",
	"5Y",
	"All",
];

export const DEFAULT_TIMEFRAME: ChartTimeframe = "1h";

export const FEES: FeeConfig = {
	platformFeeRate: 0.001,
	tradingFeeRate: 0.0005,
	hourlyBorrowRate: 0.00005,
};
