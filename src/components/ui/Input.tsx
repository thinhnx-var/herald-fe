import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	suffix?: ReactNode;
}

export default function Input({ className, suffix, ...props }: InputProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-2 rounded-lg border border-(--border) bg-(--bg-primary) px-3 py-2",
				"focus-within:border-(--accent) transition-colors",
				className,
			)}
		>
			<input
				className="flex-1 bg-transparent text-(--text-primary) outline-none placeholder:text-(--text-secondary) text-sm w-full"
				{...props}
			/>
			{suffix && <div className="shrink-0">{suffix}</div>}
		</div>
	);
}
