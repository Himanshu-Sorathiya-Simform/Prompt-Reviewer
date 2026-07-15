interface SectionDividerProps {
	label: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
	return (
		<div
			className="flex items-center gap-3"
			aria-hidden="true"
		>
			<div className="h-px flex-1 bg-border" />
			<span className="text-xs font-semibold uppercase tracking-widest text-content-muted">
				{label}
			</span>
			<div className="h-px flex-1 bg-border" />
		</div>
	);
}
