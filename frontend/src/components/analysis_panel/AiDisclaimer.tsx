import { Info } from "lucide-react";

export default function AiDisclaimer() {
	return (
		<p
			className="flex items-center gap-1.5 text-xs text-content-muted"
			role="note"
		>
			<Info
				className="h-3.5 w-3.5 shrink-0 text-severity-medium"
				aria-hidden="true"
			/>
			AI-generated analysis — results may be inaccurate. Use as a guide, not
			ground truth.
		</p>
	);
}
