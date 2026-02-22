import { useState } from "react";
import { FEES, TOKENS } from "@/constants";
import { usePriceData } from "@/hooks/usePriceData";
import { useTradingStore } from "@/stores/tradingStore";
import type { PositionSummaryData, Token, TradeDirection } from "@/types";
import {
	calculateFees,
	calculateLiquidationPrice,
	calculatePositionSize,
	calculatePositionValue,
} from "@/utils/math";

export function useTradeForm() {
	const { selectedPair } = useTradingStore();
	const { data: priceData } = usePriceData();

	const [depositToken, setDepositToken] = useState<Token>(TOKENS.USDC);
	const [depositAmount, setDepositAmount] = useState("");
	const [leverage, setLeverage] = useState(5);
	const [direction, setDirection] = useState<TradeDirection>("long");

	const entryPrice = priceData?.price ?? 0;
	const baseTokenSymbol = selectedPair.baseToken.symbol;

	const amount = Number.parseFloat(depositAmount) || 0;
	const positionSize = calculatePositionSize(amount, leverage);
	const positionValue = calculatePositionValue(positionSize, entryPrice);
	const estLiquidationPrice = calculateLiquidationPrice(
		entryPrice,
		leverage,
		direction,
	);
	const fees = calculateFees(amount, positionSize, FEES);

	const summary: PositionSummaryData = {
		positionSize,
		positionSizeUnit: baseTokenSymbol,
		positionValue,
		entryPrice,
		estLiquidationPrice,
		platformFee: fees.platform,
		tradingFee: fees.trading,
		hourlyBorrowFee: fees.hourlyBorrow,
	};

	const isValid = amount > 0 && leverage > 0;

	return {
		depositToken,
		setDepositToken,
		depositAmount,
		setDepositAmount,
		leverage,
		setLeverage,
		direction,
		setDirection,
		summary,
		isValid,
	};
}
