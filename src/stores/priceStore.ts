import { create } from "zustand";
import type { Candle, PriceData } from "@/types";

interface PriceState {
	/** Latest price per pair (from WebSocket). */
	prices: Record<string, PriceData>;
	/** Latest candle tick per pair+timeframe key (from WebSocket). */
	lastCandle: Record<string, Candle>;

	setPrice: (pair: string, data: PriceData) => void;
	setLastCandle: (key: string, candle: Candle) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
	prices: {},
	lastCandle: {},

	setPrice: (pair, data) =>
		set((state) => ({
			prices: { ...state.prices, [pair]: data },
		})),

	setLastCandle: (key, candle) =>
		set((state) => ({
			lastCandle: { ...state.lastCandle, [key]: candle },
		})),
}));
