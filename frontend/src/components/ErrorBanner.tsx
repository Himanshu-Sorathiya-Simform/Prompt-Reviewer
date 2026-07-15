import { useEffect, useState } from "react";

interface ErrorBannerProps {
	message: string;
	isRateLimited: boolean;
	rateLimitReset?: number | null;
}

function formatCountdown(seconds: number): string {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	if (m > 0) return `${m}m ${s}s`;
	return `${s}s`;
}

function computeRemaining(resetTimestamp: number): number {
	return Math.max(0, Math.ceil(resetTimestamp - Date.now() / 1000));
}

export default function ErrorBanner({
	message,
	isRateLimited,
	rateLimitReset,
}: ErrorBannerProps) {
	// Initialise synchronously via lazy initializer — no setState inside effect
	const [secondsLeft, setSecondsLeft] = useState<number | null>(() => {
		if (!isRateLimited || !rateLimitReset) return null;
		return computeRemaining(rateLimitReset);
	});

	useEffect(() => {
		if (!isRateLimited || !rateLimitReset) return;

		const interval = setInterval(() => {
			const remaining = computeRemaining(rateLimitReset);
			setSecondsLeft(remaining);
			if (remaining <= 0) clearInterval(interval);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRateLimited, rateLimitReset]);

	return (
		<div
			role="alert"
			className="rounded-xl border border-error-border bg-error-bg p-5"
		>
			<div className="flex items-start gap-3">
				<svg
					className="mt-0.5 h-5 w-5 shrink-0 text-error"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
						clipRule="evenodd"
					/>
				</svg>

				<div className="flex-1">
					{isRateLimited ?
						<>
							<p className="font-semibold text-error">
								Rate limit reached
							</p>
							<p className="mt-1 text-sm text-content-secondary">
								You&apos;ve used all 15 reviews for this hour.
								{secondsLeft !== null && secondsLeft > 0 && (
									<>
										{" "}
										Your limit resets in{" "}
										<span className="font-semibold tabular-nums text-content-primary">
											{formatCountdown(secondsLeft)}
										</span>
										.
									</>
								)}
								{secondsLeft === 0 && " You can try again now."}
							</p>
						</>
					:	<>
							<p className="font-semibold text-error">
								Something went wrong
							</p>
							<p className="mt-1 text-sm text-content-secondary">
								{message}
							</p>
						</>
					}
				</div>
			</div>
		</div>
	);
}
