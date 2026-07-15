import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { computeRemaining, formatCountdown } from "../../utils/index";

interface ErrorBannerProps {
	message: string;
	isRateLimited: boolean;
	rateLimitReset?: number | null;
}

export default function ErrorBanner({
	message,
	isRateLimited,
	rateLimitReset,
}: ErrorBannerProps) {
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
				<AlertCircle
					className="mt-0.5 h-5 w-5 shrink-0 text-error"
					aria-hidden="true"
				/>

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
