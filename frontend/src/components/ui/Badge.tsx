import type { ReactNode } from "react";

interface BadgeProps {
	children: ReactNode;
	textClass?: string;
	bgClass?: string;
}

export default function Badge({ children, textClass, bgClass }: BadgeProps) {
	return (
		<span
			className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${textClass ?? ""} ${bgClass ?? ""}`}
		>
			{children}
		</span>
	);
}
