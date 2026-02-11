export type TradeDirection = "long" | "short";

export type ChartTimeframe = "5m" | "15m" | "1h" | "4h" | "1D";

export type ChartPeriod =
	| "1D"
	| "5D"
	| "1M"
	| "3M"
	| "6M"
	| "YTD"
	| "1Y"
	| "5Y"
	| "All";

export type PositionStatus = "open" | "closed" | "liquidated";

export interface Token {
	symbol: string;
	name: string;
	address: string;
	decimals: number;
	logoUrl: string;
}

export interface TradePair {
	id: string;
	baseToken: Token;
	quoteToken: Token;
	maxLeverage: number;
	minDeposit: number;
}

export interface PriceData {
	pair: string;
	price: number;
	change24h: number;
	high24h: number;
	low24h: number;
	volume24h: number;
	timestamp: number;
}

export interface Candle {
	time: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}

export interface Position {
	id: string;
	pair: string;
	direction: TradeDirection;
	depositToken: string;
	depositAmount: number;
	leverage: number;
	positionSize: number;
	positionValue: number;
	entryPrice: number;
	currentPrice: number;
	estLiquidationPrice: number;
	pnlNet: number;
	pnlGross: number;
	pnlPercent: number;
	status: PositionStatus;
	openedAt: number;
	closedAt?: number;
}

export interface TradeFormState {
	depositToken: Token;
	depositAmount: string;
	leverage: number;
	direction: TradeDirection;
}

export interface PositionSummaryData {
	positionSize: number;
	positionSizeUnit: string;
	positionValue: number;
	entryPrice: number;
	estLiquidationPrice: number;
	platformFee: number;
	tradingFee: number;
	hourlyBorrowFee: number;
}

export interface FeeConfig {
	platformFeeRate: number;
	tradingFeeRate: number;
	hourlyBorrowRate: number;
}
