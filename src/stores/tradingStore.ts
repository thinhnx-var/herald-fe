import { create } from "zustand";
import { DEFAULT_PAIR, DEFAULT_TIMEFRAME } from "@/constants";
import type { ChartTimeframe, TradeDirection, TradePair } from "@/types";

interface TradingState {
	selectedPair: TradePair;
	direction: TradeDirection;
	chartTimeframe: ChartTimeframe;
	setSelectedPair: (pair: TradePair) => void;
	setDirection: (dir: TradeDirection) => void;
	setChartTimeframe: (tf: ChartTimeframe) => void;
}

export const useTradingStore = create<TradingState>((set) => ({
	selectedPair: DEFAULT_PAIR,
	direction: "long",
	chartTimeframe: DEFAULT_TIMEFRAME,
	setSelectedPair: (pair) => set({ selectedPair: pair }),
	setDirection: (dir) => set({ direction: dir }),
	setChartTimeframe: (tf) => set({ chartTimeframe: tf }),
}));
