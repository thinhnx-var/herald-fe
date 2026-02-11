import { useCallback, useEffect, useState } from "react";
import type { ResponsiveLayouts } from "react-grid-layout";
import { Responsive, useContainerWidth } from "react-grid-layout";
import ChartContainer from "@/components/chart/ChartContainer";
import PositionsContainer from "@/components/positions/PositionsContainer";
import TradePanel from "@/components/trade/TradePanel";

const LAYOUT_STORAGE_KEY = "herald-dashboard-layout";
export const RESET_LAYOUT_EVENT = "herald-reset-dashboard-layout";

const defaultLayouts: ResponsiveLayouts = {
	lg: [
		{ i: "chart", x: 0, y: 0, w: 8, h: 6, minW: 4, minH: 4 },
		{ i: "positions", x: 0, y: 6, w: 8, h: 4, minW: 4, minH: 3 },
		{ i: "trade", x: 8, y: 0, w: 4, h: 10, minW: 3, minH: 8 },
	],
};

function loadLayoutsFromStorage(): ResponsiveLayouts {
	try {
		const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as ResponsiveLayouts;
			if (parsed && typeof parsed === "object") return parsed;
		}
	} catch {
		// ignore invalid or missing data
	}
	return defaultLayouts;
}

function saveLayoutsToStorage(layouts: ResponsiveLayouts) {
	try {
		localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layouts));
	} catch {
		// ignore quota or other storage errors
	}
}

export default function HomePage() {
	const { width, containerRef, mounted } = useContainerWidth();
	const [layouts, setLayouts] = useState<ResponsiveLayouts>(defaultLayouts);

	useEffect(() => {
		setLayouts(loadLayoutsFromStorage());
	}, []);

	useEffect(() => {
		const handleResetLayout = () => {
			setLayouts(defaultLayouts);
			saveLayoutsToStorage(defaultLayouts);
		};
		window.addEventListener(RESET_LAYOUT_EVENT, handleResetLayout);
		return () =>
			window.removeEventListener(RESET_LAYOUT_EVENT, handleResetLayout);
	}, []);

	const handleLayoutChange = useCallback(
		(_currentLayout: unknown, allLayouts: ResponsiveLayouts) => {
			setLayouts(allLayouts);
			saveLayoutsToStorage(allLayouts);
		},
		[],
	);

	return (
		<div ref={containerRef} className="p-1">
			{mounted && (
				<Responsive
					layouts={layouts}
					onLayoutChange={handleLayoutChange}
					breakpoints={{
						lg: 1200,
						md: 996,
						sm: 768,
						xs: 480,
						xxs: 0,
					}}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					width={width}
					rowHeight={80}
					dragConfig={{
						enabled: false,
					}}
					resizeConfig={{
						enabled: true,
						handleComponent: (
							<div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-50 bg-(--text-secondary) rounded-tl" />
						),
					}}
				>
					<div key="chart" className="overflow-hidden">
						<ChartContainer />
					</div>
					<div key="positions" className="overflow-hidden">
						<PositionsContainer />
					</div>
					<div key="trade" className="overflow-hidden">
						<TradePanel />
					</div>
				</Responsive>
			)}
		</div>
	);
}
