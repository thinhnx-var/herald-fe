import Input from "@/components/ui/Input";

interface DepositAmountInputProps {
	value: string;
	onChange: (value: string) => void;
	onMax?: () => void;
}

export default function DepositAmountInput({
	value,
	onChange,
	onMax,
}: DepositAmountInputProps) {
	return (
		<div className="space-y-1">
			<span className="text-xs text-(--text-secondary)">Deposit Amount</span>
			<Input
				type="number"
				placeholder="0"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				min="0"
				step="any"
				suffix={
					<button
						type="button"
						onClick={onMax}
						className="text-xs font-semibold text-(--green) hover:brightness-110 cursor-pointer"
					>
						MAX
					</button>
				}
			/>
		</div>
	);
}
