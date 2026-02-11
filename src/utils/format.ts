export function formatAddress(address: string): string {
	if (address.length < 10) return address;
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatPrice(price: number, decimals = 4): string {
	return price.toFixed(decimals);
}

export function formatPercent(pct: number): string {
	const sign = pct >= 0 ? "+" : "";
	return `${sign}${pct.toFixed(2)}%`;
}

export function formatUsd(amount: number, decimals = 2): string {
	return `${amount.toLocaleString("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	})} USDC`;
}

export function formatTokenAmount(
	amount: number,
	symbol: string,
	decimals = 2,
): string {
	return `${amount.toLocaleString("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	})} ${symbol}`;
}
