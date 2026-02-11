import { cn } from "@/utils/cn";

interface SliderProps {
	value: number;
	min: number;
	max: number;
	step: number;
	onChange: (value: number) => void;
	presets?: number[];
	color?: "green" | "red";
	className?: string;
}

export default function Slider({
	value,
	min,
	max,
	step,
	onChange,
	presets,
	color = "green",
	className,
}: SliderProps) {
	const percent = ((value - min) / (max - min)) * 100;
	const trackColor = color === "green" ? "var(--green)" : "var(--red)";

	return (
		<div className={cn("space-y-2", className)}>
			<div className="relative">
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
					style={{
						background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${percent}%, var(--border) ${percent}%, var(--border) 100%)`,
					}}
				/>
			</div>

			{presets && (
				<div className="flex justify-between">
					{presets.map((preset) => (
						<button
							key={preset}
							type="button"
							onClick={() => onChange(preset)}
							className={cn(
								"text-xs px-1 py-0.5 rounded transition-colors cursor-pointer",
								value === preset
									? "text-(--text-primary)"
									: "text-(--text-secondary) hover:text-(--text-primary)",
							)}
						>
							{preset === 0 ? "0" : `${preset}x`}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
