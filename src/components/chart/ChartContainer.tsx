import CandlestickChart from "./CandlestickChart";
import PairSelector from "./PairSelector";
import PeriodSelector from "./PeriodSelector";
import PriceInfoBar from "./PriceInfoBar";
import TimeframeSelector from "./TimeframeSelector";

export default function ChartContainer() {
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
				<CandlestickChart />
			</div>

			<div className="flex items-center justify-between px-3 py-1 border-t border-(--border)">
				<PeriodSelector />
			</div>
		</div>
	);
}
