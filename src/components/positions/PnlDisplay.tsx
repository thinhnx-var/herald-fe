import { cn } from "@/utils/cn";

interface PnlDisplayProps {
	net: number;
	gross: number;
}

function formatPnl(value: number): string {
	const sign = value >= 0 ? "+" : "";
	return `${sign}$${Math.abs(value).toFixed(2)}`;
}

export default function PnlDisplay({ net, gross }: PnlDisplayProps) {
	const isPositive = net >= 0;

	return (
		<div className="text-right">
			<div
				className={cn(
					"text-sm font-medium",
					isPositive ? "text-(--green)" : "text-(--red)",
				)}
			>
				{formatPnl(net)}
			</div>
			<div
				className={cn(
					"text-xs",
					gross >= 0 ? "text-(--green)" : "text-(--red)",
				)}
			>
				{formatPnl(gross)}
			</div>
		</div>
	);
}
