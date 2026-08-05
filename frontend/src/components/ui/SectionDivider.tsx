interface SectionDividerProps {
	label: string;
}

function SectionDivider({ label }: SectionDividerProps) {
	return (
		<div className="border-b-2 border-border-strong pb-1 mb-6 mt-12 first:mt-0">
			<span className="text-sm font-bold uppercase tracking-widest text-content-primary">
				{label}
			</span>
		</div>
	);
}

export default SectionDivider;
