import type { ChangeEvent, FormEvent } from "react";
import useReview from "../hooks/useReview";
import type { ExamplePrompt } from "../types/index";

/* ─── Example Prompts Data ───────────────────────────────────────────────── */

const EXAMPLES: ExamplePrompt[] = [
	{
		label: "Vague",
		badge: "Beginner",
		prompt: "Explain React hooks.",
	},
	{
		label: "Decent",
		badge: "Intermediate",
		prompt: "Explain the difference between useEffect and useLayoutEffect in React, with examples of when to use each one.",
	},
	{
		label: "Expert",
		badge: "Expert",
		prompt: "You are a senior React engineer. Explain how to build a custom useDebounce hook in TypeScript that: (1) accepts a generic value and a delay in milliseconds, (2) correctly cancels the timeout on cleanup to avoid memory leaks, (3) behaves correctly under React StrictMode double-invocation, and (4) compare its trade-offs against using lodash.debounce. Include edge cases and a usage example.",
	},
];

/* ─── PromptHeader ───────────────────────────────────────────────────────── */

function PromptHeader() {
	return (
		<div className="mb-3">
			<label
				htmlFor="prompt-input"
				className="block text-lg font-semibold text-content-primary"
			>
				Your Prompt
			</label>
			<p className="mt-0.5 text-sm text-content-muted">
				Paste any AI prompt and get a detailed quality review.
			</p>
		</div>
	);
}

/* ─── PromptTextarea ─────────────────────────────────────────────────────── */

interface PromptTextareaProps {
	value: string;
	onChange: (value: string) => void;
	isLoading: boolean;
}

function PromptTextarea({ value, onChange, isLoading }: PromptTextareaProps) {
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="group relative">
			<textarea
				id="prompt-input"
				name="prompt"
				value={value}
				onChange={handleChange}
				disabled={isLoading}
				placeholder="e.g. You are a senior engineer. Explain how to implement..."
				rows={6}
				aria-label="Enter your prompt for review"
				className="w-full min-h-40 rounded-xl border border-border bg-surface-raised px-4 py-4 text-sm leading-relaxed text-content-primary placeholder:text-content-muted transition-colors focus:border-brand focus:outline-none disabled:opacity-60"
				spellCheck
			/>
		</div>
	);
}

/* ─── PromptToolbar ──────────────────────────────────────────────────────── */

interface PromptToolbarProps {
	charCount: number;
	promptTokens: number | null;
	isEmpty: boolean;
	isLoading: boolean;
	appState: string;
	onReset: () => void;
	onSelectExample: (prompt: string) => void;
}

function PromptToolbar({
	charCount,
	promptTokens,
	isEmpty,
	isLoading,
	appState,
	onReset,
	onSelectExample,
}: PromptToolbarProps) {
	const showReset = appState !== "idle";

	return (
		<div className="mt-3 space-y-3">
			{/* Example chips */}
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-xs text-content-muted">Try an example:</span>
				{EXAMPLES.map((ex) => (
					<button
						key={ex.label}
						type="button"
						onClick={() => onSelectExample(ex.prompt)}
						className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-content-secondary transition-colors hover:border-brand hover:text-brand"
					>
						{ex.label}
					</button>
				))}
			</div>

			{/* Action row */}
			<div className="flex items-center justify-between">
				{/* Left: char count + token count */}
				<div className="flex items-center gap-3 text-xs tabular-nums text-content-muted">
					<span aria-live="polite">
						{charCount > 0 ?
							`${charCount.toLocaleString()} chars`
						:	"Start typing…"}
					</span>
					{promptTokens !== null && (
						<>
							<span aria-hidden="true">·</span>
							<span className="font-medium text-content-secondary">
								{promptTokens.toLocaleString()} tokens
							</span>
						</>
					)}
				</div>

				{/* Right: Reset + Analyze */}
				<div className="flex items-center gap-2">
					{showReset && (
						<button
							type="button"
							onClick={onReset}
							disabled={isLoading}
							className="rounded-lg px-3 py-2 text-sm font-medium text-content-secondary transition-colors hover:bg-surface-overlay hover:text-content-primary disabled:opacity-50"
						>
							Reset
						</button>
					)}
					<button
						type="submit"
						disabled={isEmpty || isLoading}
						aria-busy={isLoading}
						className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-content-inverted transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ?
							<>
								<svg
									className="h-4 w-4 animate-spin"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
									/>
								</svg>
								Analyzing…
							</>
						:	<>
								<svg
									className="h-4 w-4"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
								</svg>
								Analyze Prompt
							</>
						}
					</button>
				</div>
			</div>
		</div>
	);
}

/* ─── InputSection (export default) ─────────────────────────────────────── */

export default function InputPanel() {
	const {
		promptText,
		setPromptText,
		appState,
		usage,
		isLoading,
		handleSubmit,
		handleReset,
	} = useReview();

	const charCount = promptText.length;
	const isEmpty = promptText.trim().length === 0;
	const promptTokens = usage?.userPromptTokens ?? null;

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isEmpty && !isLoading) handleSubmit();
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			noValidate
			aria-label="Prompt input"
		>
			<PromptHeader />
			<PromptTextarea
				value={promptText}
				onChange={setPromptText}
				isLoading={isLoading}
			/>
			<PromptToolbar
				charCount={charCount}
				promptTokens={promptTokens}
				isEmpty={isEmpty}
				isLoading={isLoading}
				appState={appState}
				onReset={handleReset}
				onSelectExample={setPromptText}
			/>
		</form>
	);
}
