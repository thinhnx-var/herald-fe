import Select from "@/components/ui/Select";
import { DEPOSIT_TOKENS } from "@/constants";
import type { Token } from "@/types";

interface DepositTokenSelectProps {
	value: Token;
	onChange: (token: Token) => void;
}

export default function DepositTokenSelect({
	value,
	onChange,
}: DepositTokenSelectProps) {
	const options = DEPOSIT_TOKENS.map((token) => ({
		label: token.symbol,
		value: token.symbol,
	}));

	return (
		<div className="space-y-1">
			<span className="text-xs text-(--text-secondary)">Deposit Token</span>
			<Select
				options={options}
				value={value.symbol}
				onChange={(symbol) => {
					const token = DEPOSIT_TOKENS.find((t) => t.symbol === symbol);
					if (token) onChange(token);
				}}
			/>
		</div>
	);
}
