import useTheme from "../hooks/useTheme";

export default function Header() {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur-sm">
			<div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
				{/* Brand */}
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
						<svg
							className="h-4 w-4 text-content-inverted"
							viewBox="0 0 16 16"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M3.5 2A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V6.621a1.5 1.5 0 00-.44-1.06L10.44 2.44A1.5 1.5 0 009.378 2H3.5zm6 1.5v2a.5.5 0 00.5.5h2l-2.5-2.5zm-3 4a.5.5 0 000 1h4a.5.5 0 000-1h-4zm0 2a.5.5 0 000 1h4a.5.5 0 000-1h-4zm0 2a.5.5 0 000 1h2a.5.5 0 000-1h-2z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div>
						<span className="text-sm font-bold tracking-tight text-content-primary">
							PromptLens
						</span>
						<span className="ml-2 hidden text-xs text-content-muted sm:inline">
							AI Prompt Reviewer
						</span>
					</div>
				</div>

				{/* Right side */}
				<div className="flex items-center gap-3">
					<span className="hidden items-center gap-1.5 rounded-full bg-brand-subtle px-3 py-1 text-xs font-medium text-brand sm:flex">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
						Gemini
					</span>

					{/* Theme toggle */}
					<button
						type="button"
						onClick={toggleTheme}
						aria-label={
							isDark ? "Switch to light mode" : "Switch to dark mode"
						}
						className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
					>
						{isDark ?
							/* Sun icon */
							<svg
								className="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06L5.404 4.343a.75.75 0 10-1.06 1.06l1.06 1.061z" />
							</svg>
						:	/* Moon icon */
							<svg
								className="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
									clipRule="evenodd"
								/>
							</svg>
						}
					</button>
				</div>
			</div>
		</header>
	);
}
