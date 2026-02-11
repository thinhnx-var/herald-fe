import { CHART_TIMEFRAMES } from "@/constants";
import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/utils/cn";

export default function TimeframeSelector() {
	const { chartTimeframe, setChartTimeframe } = useTradingStore();

	return (
		<div className="flex items-center gap-1">
			{CHART_TIMEFRAMES.map((tf) => (
				<button
					key={tf}
					type="button"
					onClick={() => setChartTimeframe(tf)}
					className={cn(
						"px-2 py-1 text-xs rounded transition-colors cursor-pointer",
						chartTimeframe === tf
							? "bg-(--bg-tertiary) text-(--text-primary)"
							: "text-(--text-secondary) hover:text-(--text-primary)",
					)}
				>
					{tf}
				</button>
			))}
		</div>
	);
}
