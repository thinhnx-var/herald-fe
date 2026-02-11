import { RotateCcw, Wallet } from "lucide-react";
import { RESET_LAYOUT_EVENT } from "@/pages/home";
import { formatAddress } from "@/utils/format";

function resetDashboardLayout() {
	window.dispatchEvent(new CustomEvent(RESET_LAYOUT_EVENT));
}

export default function Header() {
	// TODO: Replace with real wallet connection
	const isConnected = false;
	const address = "";

	return (
		<header className="flex items-center justify-between gap-4 px-4 py-2 border-b border-(--border) bg-(--bg-secondary)">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-(--green) flex items-center justify-center">
						<span className="text-white text-xs font-bold">DL</span>
					</div>
					<span className="text-(--text-primary) font-semibold text-lg">
						Dex Leverage
					</span>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={resetDashboardLayout}
					className="p-2 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-tertiary) transition-colors cursor-pointer"
					title="Reset layout"
				>
					<RotateCcw size={16} />
				</button>

				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-tertiary) border border-(--border) text-sm text-(--text-primary) hover:border-(--accent) transition-colors cursor-pointer"
				>
					<Wallet size={16} />
					{isConnected ? formatAddress(address) : "Connect Wallet"}
				</button>
			</div>
		</header>
	);
}
