import { useQuery } from "@tanstack/react-query";
import { OHLCV_LIMITS, POOL_ADDRESSES } from "@/constants/pools";
import { fetchOhlcv } from "@/services/api/endpoints/gecko-terminal";
import { useTradingStore } from "@/stores/tradingStore";
import type { Candle } from "@/types";

interface UseOhlcvOptions {
	pollingInterval?: number | false;
}

export function useOhlcv(options: UseOhlcvOptions = {}) {
	const { selectedPair, chartTimeframe } = useTradingStore();
	const poolAddress = POOL_ADDRESSES[selectedPair.id];
	const limit = OHLCV_LIMITS[chartTimeframe];

	return useQuery<Candle[]>({
		queryKey: ["ohlcv", selectedPair.id, chartTimeframe],
		queryFn: () => {
			if (!poolAddress) {
				throw new Error(`No pool address for pair ${selectedPair.id}`);
			}
			return fetchOhlcv(poolAddress, chartTimeframe, limit);
		},
		enabled: !!poolAddress,
		staleTime: 20_000,
		refetchInterval: options.pollingInterval || false,
	});
}
