function SkeletonLine({ className }: { className: string }) {
	return <div className={`skeleton-pulse rounded ${className}`} />;
}

export default function SkeletonLoader() {
	return (
		<div
			className="animate-pulse space-y-8 pt-2"
			aria-label="Loading analysis…"
			aria-busy="true"
		>
			{/* Scoreboard skeleton */}
			<div className="flex items-start gap-5">
				<div className="skeleton-pulse h-[136px] w-[136px] shrink-0 rounded-full" />
				<div className="flex-1 space-y-3 pt-3">
					<SkeletonLine className="h-6 w-24" />
					<SkeletonLine className="h-4 w-full" />
					<SkeletonLine className="h-4 w-5/6" />
					<SkeletonLine className="h-4 w-3/4" />
				</div>
			</div>

			{/* Section divider skeleton */}
			<SkeletonLine className="h-px w-full" />

			{/* Issues skeleton */}
			<div className="space-y-4">
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className="flex gap-4 border-l-4 border-border py-2 pl-4"
					>
						<div className="flex-1 space-y-2">
							<SkeletonLine className="h-3 w-32" />
							<SkeletonLine className="h-4 w-full" />
							<SkeletonLine className="h-4 w-4/5" />
						</div>
					</div>
				))}
			</div>

			{/* Section divider skeleton */}
			<SkeletonLine className="h-px w-full" />

			{/* Suggestions skeleton */}
			<div className="space-y-3">
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className="flex items-center gap-3"
					>
						<SkeletonLine className="h-4 w-4 shrink-0 rounded-full" />
						<SkeletonLine className="h-4 flex-1" />
					</div>
				))}
			</div>

			{/* Section divider skeleton */}
			<SkeletonLine className="h-px w-full" />

			{/* Improved prompt skeleton */}
			<SkeletonLine className="h-36 w-full rounded-xl" />
		</div>
	);
}
