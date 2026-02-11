import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface SelectOption {
	label: string;
	value: string;
}

interface SelectProps {
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
	placeholder?: string;
}

export default function Select({
	options,
	value,
	onChange,
	className,
	placeholder = "Select...",
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const selectedOption = options.find((o) => o.value === value);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={ref} className={cn("relative", className)}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex items-center justify-between gap-2 w-full rounded-lg border border-(--border) bg-(--bg-primary) px-3 py-2 text-sm cursor-pointer",
					"hover:border-(--accent) transition-colors",
					isOpen && "border-(--accent)",
				)}
			>
				<span
					className={
						selectedOption ? "text-(--text-primary)" : "text-(--text-secondary)"
					}
				>
					{selectedOption?.label || placeholder}
				</span>
				<ChevronDown
					size={16}
					className={cn(
						"text-(--text-secondary) transition-transform",
						isOpen && "rotate-180",
					)}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-50 mt-1 w-full rounded-lg border border-(--border) bg-(--bg-secondary) py-1 shadow-lg">
					{options.map((option) => (
						<button
							type="button"
							key={option.value}
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
							}}
							className={cn(
								"w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer",
								"hover:bg-(--bg-tertiary)",
								option.value === value
									? "text-(--accent)"
									: "text-(--text-primary)",
							)}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
