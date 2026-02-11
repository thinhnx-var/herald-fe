import { useState } from "react";
import { CHART_PERIODS } from "@/constants";
import type { ChartPeriod } from "@/types";
import { cn } from "@/utils/cn";

export default function PeriodSelector() {
	const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("3M");

	return (
		<div className="flex items-center gap-1">
			{CHART_PERIODS.map((period) => (
				<button
					key={period}
					type="button"
					onClick={() => setSelectedPeriod(period)}
					className={cn(
						"px-2 py-1 text-xs rounded transition-colors cursor-pointer",
						selectedPeriod === period
							? "bg-(--bg-tertiary) text-(--text-primary)"
							: "text-(--text-secondary) hover:text-(--text-primary)",
					)}
				>
					{period}
				</button>
			))}
		</div>
	);
}
