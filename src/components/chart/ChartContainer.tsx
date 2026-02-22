import { useOhlcv } from "@/hooks/useOhlcv";
import CandlestickChart from "./CandlestickChart";
import PairSelector from "./PairSelector";
import PeriodSelector from "./PeriodSelector";
import PriceInfoBar from "./PriceInfoBar";
import TimeframeSelector from "./TimeframeSelector";

export default function ChartContainer() {
	const {
		data: candles,
		isLoading,
		isError,
		error,
	} = useOhlcv({
		pollingInterval: 30_000,
	});

	return (
		<div className="flex flex-col h-full bg-(--bg-secondary) rounded-lg overflow-hidden">
			<div className="flex items-center justify-between gap-4 px-3 py-2 border-b border-(--border)">
				<div className="flex items-center gap-4">
					<TimeframeSelector />
				</div>
			</div>

			<div className="flex items-center gap-4 px-3 py-2 border-b border-(--border)">
				<PairSelector />
				<PriceInfoBar />
			</div>

			<div className="flex-1 min-h-0">
				{isLoading && (
					<div className="flex items-center justify-center h-full text-(--text-secondary) text-sm">
						Loading chart data...
					</div>
				)}
				{isError && (
					<div className="flex items-center justify-center h-full text-(--red) text-sm">
						Failed to load chart:{" "}
						{error instanceof Error ? error.message : "Unknown error"}
					</div>
				)}
				{candles && <CandlestickChart candles={candles} />}
			</div>

			<div className="flex items-center justify-between px-3 py-1 border-t border-(--border)">
				<PeriodSelector />
			</div>
		</div>
	);
}
