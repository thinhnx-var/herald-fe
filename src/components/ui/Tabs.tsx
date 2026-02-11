import { cn } from "@/utils/cn";

interface Tab {
	label: string;
	value: string;
}

interface TabsProps {
	tabs: Tab[];
	value: string;
	onChange: (value: string) => void;
	variant?: "default" | "pill";
	className?: string;
}

export default function Tabs({
	tabs,
	value,
	onChange,
	variant = "default",
	className,
}: TabsProps) {
	return (
		<div
			className={cn(
				"flex",
				variant === "pill" && "rounded-lg bg-(--bg-primary) p-1 gap-1",
				variant === "default" && "border-b border-(--border) gap-4",
				className,
			)}
		>
			{tabs.map((tab) => (
				<button
					key={tab.value}
					type="button"
					onClick={() => onChange(tab.value)}
					className={cn(
						"text-sm font-medium transition-colors cursor-pointer",
						variant === "pill" && [
							"flex-1 px-4 py-2 rounded-md",
							tab.value === value
								? "bg-(--bg-tertiary) text-(--text-primary)"
								: "text-(--text-secondary) hover:text-(--text-primary)",
						],
						variant === "default" && [
							"pb-2 px-1",
							tab.value === value
								? "text-(--text-primary) border-b-2 border-(--accent)"
								: "text-(--text-secondary) hover:text-(--text-primary)",
						],
					)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
