import type { FeeConfig, TradeDirection } from "@/types";

export function calculatePositionSize(
	deposit: number,
	leverage: number,
): number {
	return deposit * leverage;
}

export function calculatePositionValue(size: number, price: number): number {
	return size * price;
}

export function calculateLiquidationPrice(
	entryPrice: number,
	leverage: number,
	direction: TradeDirection,
): number {
	if (leverage <= 0) return 0;
	if (direction === "long") {
		return entryPrice * (1 - 1 / leverage);
	}
	return entryPrice * (1 + 1 / leverage);
}

export function calculatePnl(
	entryPrice: number,
	currentPrice: number,
	size: number,
	direction: TradeDirection,
): { net: number; gross: number; percent: number } {
	const priceDiff =
		direction === "long"
			? currentPrice - entryPrice
			: entryPrice - currentPrice;

	const gross = priceDiff * size;
	const percent = entryPrice > 0 ? (priceDiff / entryPrice) * 100 : 0;
	const net = gross;

	return { net, gross, percent };
}

export function calculateFees(
	deposit: number,
	positionSize: number,
	fees: FeeConfig,
): { platform: number; trading: number; hourlyBorrow: number } {
	const borrowedAmount = positionSize - deposit;
	return {
		platform: deposit * fees.platformFeeRate,
		trading: positionSize * fees.tradingFeeRate,
		hourlyBorrow: borrowedAmount * fees.hourlyBorrowRate,
	};
}
