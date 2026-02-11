import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Position } from "@/types";
import { formatPrice, formatUsd } from "@/utils/format";
import PnlDisplay from "./PnlDisplay";

interface PositionRowProps {
	position: Position;
	showClose?: boolean;
}

export default function PositionRow({
	position,
	showClose = true,
}: PositionRowProps) {
	const isLong = position.direction === "long";

	return (
		<tr className="border-b border-(--border) hover:bg-(--bg-tertiary)/50 transition-colors">
			<td className="px-3 py-3 text-sm">
				<div className="font-medium text-(--text-primary)">{position.pair}</div>
				<Badge variant={isLong ? "green" : "red"}>
					{isLong ? "Long" : "Short"} {position.leverage}x
				</Badge>
			</td>
			<td className="px-3 py-3 text-sm text-(--text-primary)">
				{formatUsd(position.positionValue, 2)}
				<div className="text-xs text-(--text-secondary)">
					{position.positionSize} {position.pair.split("-")[0]}
				</div>
			</td>
			<td className="px-3 py-3 text-sm text-(--text-primary)">
				{formatUsd(position.depositAmount, 3)}
			</td>
			<td className="px-3 py-3 text-sm text-(--text-primary)">
				{formatPrice(position.entryPrice, 4)}
			</td>
			<td className="px-3 py-3 text-sm text-(--text-primary)">
				{formatPrice(position.estLiquidationPrice, 4)}
			</td>
			<td className="px-3 py-3">
				<PnlDisplay net={position.pnlNet} gross={position.pnlGross} />
			</td>
			<td className="px-3 py-3 text-sm">
				<Badge
					variant={
						position.status === "open"
							? "green"
							: position.status === "liquidated"
								? "red"
								: "neutral"
					}
				>
					{position.status.charAt(0).toUpperCase() + position.status.slice(1)}
				</Badge>
			</td>
			<td className="px-3 py-3">
				{showClose && position.status === "open" && (
					<Button
						variant="danger"
						size="sm"
						onClick={() => {
							// TODO: Implement close position
						}}
					>
						Close
					</Button>
				)}
			</td>
		</tr>
	);
}
