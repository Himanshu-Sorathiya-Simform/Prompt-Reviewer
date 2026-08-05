import { typeLabels } from "../../constants/configConstants";
import type { Issue } from "../../types/appTypes";

interface IssueCardProps {
	issue: Issue;
}

function IssueCard({ issue }: IssueCardProps) {
	return (
		<div className="flex flex-col gap-2 pb-6 border-b border-border/50 last:border-0 last:pb-0">
			<div className="flex items-center gap-3">
				<span className="text-xs font-bold uppercase tracking-widest text-content-primary">
					[{issue.severity}]
				</span>
				<span className="text-xs font-medium uppercase tracking-widest text-content-muted">
					{typeLabels[issue.type]}
				</span>
			</div>

			<p className="text-sm leading-relaxed text-content-secondary">
				{issue.description}
			</p>
		</div>
	);
}

export default IssueCard;
