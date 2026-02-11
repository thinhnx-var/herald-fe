import { useTradeForm } from "@/hooks/useTradeForm";
import DepositAmountInput from "./DepositAmountInput";
import DepositTokenSelect from "./DepositTokenSelect";
import DirectionTabs from "./DirectionTabs";
import LeverageSlider from "./LeverageSlider";
import PositionSummary from "./PositionSummary";
import SubmitButton from "./SubmitButton";

export default function TradePanel() {
	const {
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
	} = useTradeForm();

	return (
		<div className="flex flex-col h-full bg-(--bg-secondary) rounded-lg overflow-hidden">
			<div className="px-4 py-3 border-b border-(--border)">
				<h2 className="text-base font-semibold text-(--text-primary)">
					Open Position
				</h2>
			</div>

			<div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
				<DirectionTabs value={direction} onChange={setDirection} />

				<DepositTokenSelect value={depositToken} onChange={setDepositToken} />

				<DepositAmountInput value={depositAmount} onChange={setDepositAmount} />

				<LeverageSlider
					value={leverage}
					onChange={setLeverage}
					direction={direction}
				/>

				<SubmitButton
					direction={direction}
					disabled={!isValid}
					onClick={() => {
						// TODO: Implement contract interaction
					}}
				/>

				<div className="border-t border-(--border) pt-3">
					<PositionSummary data={summary} />
				</div>
			</div>
		</div>
	);
}
