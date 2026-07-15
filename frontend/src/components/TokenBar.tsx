import type { UsageMetadata } from "../types";

interface TokenBarProps {
	usage: UsageMetadata;
}

interface TokenPillProps {
	label: string;
	value: number;
}

function TokenPill({ label, value }: TokenPillProps) {
	return (
		<div className="flex items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1.5 text-xs">
			<span className="font-medium text-content-muted">{label}</span>
			<span className="font-semibold tabular-nums text-content-secondary">
				{value.toLocaleString()}
			</span>
		</div>
	);
}

export default function TokenBar({ usage }: TokenBarProps) {
	return (
		<div
			className="flex flex-wrap items-center gap-2"
			role="status"
			aria-label="Token usage"
		>
			<span className="text-xs font-medium text-content-muted">Tokens:</span>
			<TokenPill
				label="Prompt"
				value={usage.userPromptTokens}
			/>
			<TokenPill
				label="Output"
				value={usage.outputTokens}
			/>
			{usage.thoughtTokens > 0 && (
				<TokenPill
					label="Thinking"
					value={usage.thoughtTokens}
				/>
			)}
			<TokenPill
				label="Total"
				value={usage.totalTokens}
			/>
		</div>
	);
}
