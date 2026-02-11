import type { PositionSummaryData } from "@/types";
import { formatPrice, formatTokenAmount, formatUsd } from "@/utils/format";

interface PositionSummaryProps {
	data: PositionSummaryData;
}

export default function PositionSummary({ data }: PositionSummaryProps) {
	const rows = [
		{
			label: "Position Size",
			value: formatTokenAmount(data.positionSize, data.positionSizeUnit),
		},
		{ label: "Position Value", value: formatUsd(data.positionValue, 2) },
		{
			label: "Entry Price",
			value: `${formatPrice(data.entryPrice, 4)} USDC`,
		},
		{
			label: "Estimated Liquidation Price",
			value: `${formatPrice(data.estLiquidationPrice, 4)} USDC`,
		},
		{ label: "Platform Fee", value: formatUsd(data.platformFee, 4) },
		{ label: "Trading Fee", value: formatUsd(data.tradingFee, 4) },
		{
			label: "Hourly Borrow Fee",
			value: formatTokenAmount(data.hourlyBorrowFee, data.positionSizeUnit),
		},
	];

	return (
		<div className="space-y-2">
			{rows.map((row) => (
				<div
					key={row.label}
					className="flex items-center justify-between text-sm"
				>
					<span className="text-(--text-secondary)">{row.label}</span>
					<span className="text-(--text-primary)">{row.value}</span>
				</div>
			))}
		</div>
	);
}
