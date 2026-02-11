import type { Position } from "@/types";
import PositionRow from "./PositionRow";

interface PositionsTableProps {
	positions: Position[];
	showClose?: boolean;
}

const COLUMN_HEADERS = [
	"Pair",
	"Position",
	"Deposit",
	"Entry Price",
	"Est Liq. Price",
	"PnL (Net/Gross)",
	"Status",
	"Action",
];

export default function PositionsTable({
	positions,
	showClose = true,
}: PositionsTableProps) {
	if (positions.length === 0) {
		return (
			<div className="flex items-center justify-center py-8 text-sm text-(--text-secondary)">
				No positions found
			</div>
		);
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-(--border)">
						{COLUMN_HEADERS.map((header) => (
							<th
								key={header}
								className="px-3 py-2 text-left text-xs font-medium text-(--text-secondary)"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{positions.map((position) => (
						<PositionRow
							key={position.id}
							position={position}
							showClose={showClose}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
