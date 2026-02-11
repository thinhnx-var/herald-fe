import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/format";

export default function PriceInfoBar() {
	const { selectedPair } = useTradingStore();

	// TODO: Replace with real price data from usePriceStream hook
	const priceData = {
		price: 0.08145,
		change24h: -10,
		high24h: 0.0947,
		low24h: 0.08001,
		volume24h: 12.035,
	};

	const isNegative = priceData.change24h < 0;

	return (
		<div className="flex items-center gap-6 text-sm">
			<div>
				<span
					className={cn(
						"text-lg font-semibold",
						isNegative ? "text-(--red)" : "text-(--green)",
					)}
				>
					{formatPrice(priceData.price, 5)}
				</span>
				<span
					className={cn(
						"ml-2 text-xs",
						isNegative ? "text-(--red)" : "text-(--green)",
					)}
				>
					{isNegative ? "" : "+"}
					{priceData.change24h}%
				</span>
			</div>

			<div className="flex items-center gap-4 text-(--text-secondary)">
				<div>
					<span className="text-xs">24h High</span>
					<p className="text-(--text-primary)">
						{formatPrice(priceData.high24h, 4)}
					</p>
				</div>
				<div>
					<span className="text-xs">24h Low</span>
					<p className="text-(--text-primary)">
						{formatPrice(priceData.low24h, 5)}
					</p>
				</div>
				<div>
					<span className="text-xs">
						24h Volume ({selectedPair.quoteToken.symbol})
					</span>
					<p className="text-(--text-primary)">
						{priceData.volume24h.toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
}
