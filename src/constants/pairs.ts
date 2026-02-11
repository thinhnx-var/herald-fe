import type { TradePair } from "@/types";
import { TOKENS } from "./tokens";

export const TRADING_PAIRS: TradePair[] = [
	{
		id: "HBAR-USDC",
		baseToken: TOKENS.HBAR,
		quoteToken: TOKENS.USDC,
		maxLeverage: 10,
		minDeposit: 10,
	},
];

export const DEFAULT_PAIR = TRADING_PAIRS[0];
