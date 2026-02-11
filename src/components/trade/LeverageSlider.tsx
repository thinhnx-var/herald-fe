import Slider from "@/components/ui/Slider";
import {
	LEVERAGE_MAX,
	LEVERAGE_MIN,
	LEVERAGE_PRESETS,
	LEVERAGE_STEP,
} from "@/constants";
import type { TradeDirection } from "@/types";

interface LeverageSliderProps {
	value: number;
	onChange: (value: number) => void;
	direction: TradeDirection;
}

export default function LeverageSlider({
	value,
	onChange,
	direction,
}: LeverageSliderProps) {
	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between">
				<span className="text-xs text-(--text-secondary)">Leverage</span>
				<span className="text-sm font-semibold text-(--text-primary)">
					{value}x
				</span>
			</div>
			<Slider
				value={value}
				min={LEVERAGE_MIN}
				max={LEVERAGE_MAX}
				step={LEVERAGE_STEP}
				onChange={onChange}
				presets={LEVERAGE_PRESETS}
				color={direction === "long" ? "green" : "red"}
			/>
		</div>
	);
}
