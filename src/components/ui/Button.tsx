import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: "bg-(--green) text-white hover:brightness-110 active:brightness-90",
	secondary:
		"bg-(--bg-tertiary) text-(--text-primary) border border-(--border) hover:border-(--accent)",
	danger: "bg-(--red) text-white hover:brightness-110 active:brightness-90",
	ghost:
		"bg-transparent text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-tertiary)",
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "px-2 py-1 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-6 py-3 text-base",
};

export default function Button({
	variant = "primary",
	size = "md",
	className,
	disabled,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				"rounded-lg font-medium transition-all cursor-pointer",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				variantStyles[variant],
				sizeStyles[size],
				className,
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
