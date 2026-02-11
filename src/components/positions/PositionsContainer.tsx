import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import type { Position } from "@/types";
import PositionsTable from "./PositionsTable";

// Sample positions for initial rendering
const SAMPLE_POSITIONS: Position[] = [
	{
		id: "1",
		pair: "HBAR-USDC",
		direction: "long",
		depositToken: "USDC",
		depositAmount: 10.23,
		leverage: 10,
		positionSize: 100,
		positionValue: 1023,
		entryPrice: 0.1023,
		currentPrice: 0.1033,
		estLiquidationPrice: 0.1019,
		pnlNet: -0.98,
		pnlGross: 1.18,
		pnlPercent: 0.98,
		status: "open",
		openedAt: Date.now() - 3600000,
	},
	{
		id: "2",
		pair: "HBAR-USDC",
		direction: "short",
		depositToken: "USDC",
		depositAmount: 102.3,
		leverage: 10,
		positionSize: 100,
		positionValue: 1023,
		entryPrice: 0.1023,
		currentPrice: 0.1033,
		estLiquidationPrice: 0.1019,
		pnlNet: -0.98,
		pnlGross: -1.18,
		pnlPercent: -0.98,
		status: "open",
		openedAt: Date.now() - 7200000,
	},
];

const TABS = [
	{ label: "Position", value: "position" },
	{ label: "History", value: "history" },
];

export default function PositionsContainer() {
	const [activeTab, setActiveTab] = useState("position");

	// TODO: Replace with real data from usePositions / useTradeHistory hooks
	const openPositions = SAMPLE_POSITIONS.filter((p) => p.status === "open");
	const closedPositions = SAMPLE_POSITIONS.filter((p) => p.status !== "open");

	return (
		<div className="flex flex-col h-full bg-(--bg-secondary) rounded-lg overflow-hidden">
			<div className="px-3 py-2 border-b border-(--border)">
				<Tabs tabs={TABS} value={activeTab} onChange={setActiveTab} />
			</div>

			<div className="flex-1 overflow-auto">
				{activeTab === "position" ? (
					<PositionsTable positions={openPositions} showClose />
				) : (
					<PositionsTable positions={closedPositions} showClose={false} />
				)}
			</div>
		</div>
	);
}
