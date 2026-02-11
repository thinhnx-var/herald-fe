import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TRADING_PAIRS } from "@/constants";
import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/utils/cn";

export default function PairSelector() {
	const { selectedPair, setSelectedPair } = useTradingStore();
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex items-center gap-2 px-3 py-2 rounded-lg bg-(--bg-tertiary) text-(--text-primary) text-sm font-medium cursor-pointer",
					"hover:bg-(--bg-primary) transition-colors",
				)}
			>
				<span className="w-6 h-6 rounded-full bg-(--green) flex items-center justify-center text-white text-[10px] font-bold">
					{selectedPair.baseToken.symbol[0]}
				</span>
				<span>{selectedPair.id}</span>
				<ChevronDown
					size={14}
					className={cn("transition-transform", isOpen && "rotate-180")}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-50 mt-1 w-48 rounded-lg border border-(--border) bg-(--bg-secondary) py-1 shadow-lg">
					{TRADING_PAIRS.map((pair) => (
						<button
							type="button"
							key={pair.id}
							onClick={() => {
								setSelectedPair(pair);
								setIsOpen(false);
							}}
							className={cn(
								"w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer flex items-center gap-2",
								"hover:bg-(--bg-tertiary)",
								pair.id === selectedPair.id
									? "text-(--accent)"
									: "text-(--text-primary)",
							)}
						>
							<span className="w-5 h-5 rounded-full bg-(--green) flex items-center justify-center text-white text-[9px] font-bold">
								{pair.baseToken.symbol[0]}
							</span>
							{pair.id}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
