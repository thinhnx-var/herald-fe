import type { TradeDirection } from "@/types";
import { cn } from "@/utils/cn";

interface DirectionTabsProps {
	value: TradeDirection;
	onChange: (value: TradeDirection) => void;
}

export default function DirectionTabs({ value, onChange }: DirectionTabsProps) {
	return (
		<div className="flex rounded-lg bg-(--bg-primary) p-1 gap-1">
			<button
				type="button"
				onClick={() => onChange("long")}
				className={cn(
					"flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
					value === "long"
						? "bg-(--green) text-white"
						: "text-(--text-secondary) hover:text-(--text-primary)",
				)}
			>
				Buy | Long
			</button>
			<button
				type="button"
				onClick={() => onChange("short")}
				className={cn(
					"flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
					value === "short"
						? "bg-(--red) text-white"
						: "text-(--text-secondary) hover:text-(--text-primary)",
				)}
			>
				Sell | Short
			</button>
		</div>
	);
}
