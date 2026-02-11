import Button from "@/components/ui/Button";
import type { TradeDirection } from "@/types";

interface SubmitButtonProps {
	direction: TradeDirection;
	disabled?: boolean;
	onClick?: () => void;
}

export default function SubmitButton({
	direction,
	disabled,
	onClick,
}: SubmitButtonProps) {
	const label =
		direction === "long" ? "Open Long Position" : "Open Short Position";

	return (
		<Button
			variant={direction === "long" ? "primary" : "danger"}
			size="lg"
			className="w-full"
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</Button>
	);
}
