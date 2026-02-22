import { useQuery } from "@tanstack/react-query";
import { POOL_ADDRESSES } from "@/constants/pools";
import { fetchOhlcv } from "@/services/api/endpoints/gecko-terminal";
import { useTradingStore } from "@/stores/tradingStore";
import type { PriceData } from "@/types";

export function usePriceData() {
	const { selectedPair } = useTradingStore();
	const poolAddress = POOL_ADDRESSES[selectedPair.id];

	return useQuery<PriceData>({
		queryKey: ["priceData", selectedPair.id],
		queryFn: async () => {
			if (!poolAddress)
				throw new Error(`No pool address for ${selectedPair.id}`);

			const candles = await fetchOhlcv(poolAddress, "1h", 24);

			if (candles.length === 0) {
				throw new Error("No candle data available");
			}

			const latest = candles[candles.length - 1];
			const oldest = candles[0];

			const price = latest.close;
			const high24h = Math.max(...candles.map((c) => c.high));
			const low24h = Math.min(...candles.map((c) => c.low));
			const volume24h = candles.reduce((sum, c) => sum + c.volume, 0);
			const change24h =
				oldest.open > 0 ? ((price - oldest.open) / oldest.open) * 100 : 0;

			return {
				pair: selectedPair.id,
				price,
				change24h,
				high24h,
				low24h,
				volume24h,
				timestamp: Date.now(),
			};
		},
		enabled: !!poolAddress,
		staleTime: 15_000,
		refetchInterval: 30_000,
	});
}
