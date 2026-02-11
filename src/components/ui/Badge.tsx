import { cn } from "@/utils/cn";

type BadgeVariant = "green" | "red" | "neutral";

interface BadgeProps {
	variant?: BadgeVariant;
	children: React.ReactNode;
	className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
	green: "bg-(--green)/20 text-(--green)",
	red: "bg-(--red)/20 text-(--red)",
	neutral: "bg-(--bg-tertiary) text-(--text-secondary)",
};

export default function Badge({
	variant = "neutral",
	children,
	className,
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium",
				variantStyles[variant],
				className,
			)}
		>
			{children}
		</span>
	);
}
