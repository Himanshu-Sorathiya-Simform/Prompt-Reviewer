import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { computeRemaining, formatCountdown } from "../../utils/appUtils";

interface ErrorBannerProps {
	message: string;
	statusCode: number | null;
	rateLimitReset?: number | null;
}

function ErrorBanner({
	message,
	statusCode,
	rateLimitReset,
}: ErrorBannerProps) {
	const isUserRateLimited = statusCode === 429;

	const [secondsLeft, setSecondsLeft] = useState<number | null>(() => {
		if (!isUserRateLimited || !rateLimitReset) return null;
		return computeRemaining(rateLimitReset);
	});

	useEffect(() => {
		if (!isUserRateLimited || !rateLimitReset) return;

		const interval = setInterval(() => {
			const remaining = computeRemaining(rateLimitReset);
			setSecondsLeft(remaining);
			if (remaining <= 0) clearInterval(interval);
		}, 1000);

		return () => clearInterval(interval);
	}, [isUserRateLimited, rateLimitReset]);

	const getErrorTitle = () => {
		switch (statusCode) {
			case 400:
				return "Bad Request";
			case 404:
				return "Not Found";
			case 429:
				return "Rate limit reached";
			case 502:
				return "Bad Gateway";
			case 503:
				return "Service Unavailable";
			case 500:
			default:
				return "Something went wrong";
		}
	};

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
					<p className="font-semibold text-error">{getErrorTitle()}</p>
					<p className="mt-1 text-sm text-content-secondary">
						{message}
						{isUserRateLimited && secondsLeft !== null && secondsLeft > 0 && (
							<>
								{" "}
								Your limit resets in{" "}
								<span className="font-semibold tabular-nums text-content-primary">
									{formatCountdown(secondsLeft)}
								</span>
								.
							</>
						)}
						{isUserRateLimited && secondsLeft === 0 && " You can try again now."}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ErrorBanner;
