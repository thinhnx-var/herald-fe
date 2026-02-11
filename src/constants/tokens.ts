import type { Token } from "@/types";

export const TOKENS: Record<string, Token> = {
	HBAR: {
		symbol: "HBAR",
		name: "Hedera",
		address: "0x0000000000000000000000000000000000000000",
		decimals: 8,
		logoUrl: "/tokens/hbar.svg",
	},
	USDC: {
		symbol: "USDC",
		name: "USD Coin",
		address: "0x0000000000000000000000000000000000000001",
		decimals: 6,
		logoUrl: "/tokens/usdc.svg",
	},
};

export const DEPOSIT_TOKENS = [TOKENS.USDC];
