import SkeletonLine from "./SkeletonLine";

function SkeletonLoader() {
	return (
		<div
			className="animate-pulse flex flex-col space-y-12"
			aria-label="Loading analysis…"
			aria-busy="true"
		>
			<div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
				<div className="flex items-baseline gap-2">
					<SkeletonLine className="h-16 w-24" />
					<SkeletonLine className="h-6 w-12" />
				</div>
				<div className="flex items-center">
					<SkeletonLine className="h-6 w-32" />
				</div>
			</div>

			<div className="border-l-2 border-border pl-4 py-1">
				<SkeletonLine className="h-3 w-40 mb-3" />
				<div className="space-y-2">
					<SkeletonLine className="h-4 w-full" />
					<SkeletonLine className="h-4 w-5/6" />
					<SkeletonLine className="h-4 w-4/5" />
				</div>
			</div>

			<div>
				<div className="border-b-2 border-border-strong pb-1 mb-6 mt-12 first:mt-0">
					<SkeletonLine className="h-4 w-28" />
				</div>
				<div className="mt-6 flex flex-col gap-6">
					{[0, 1].map((i) => (
						<div
							key={i}
							className="flex flex-col gap-2 pb-6 border-b border-border/50 last:border-0 last:pb-0"
						>
							<div className="flex items-center gap-3">
								<SkeletonLine className="h-4 w-16" />
								<SkeletonLine className="h-4 w-24" />
							</div>
							<div className="space-y-2 mt-1">
								<SkeletonLine className="h-4 w-full" />
								<SkeletonLine className="h-4 w-3/4" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				<div className="border-b-2 border-border-strong pb-1 mb-6 mt-12 first:mt-0">
					<SkeletonLine className="h-4 w-36" />
				</div>
				<div className="mt-6">
					<ul className="space-y-3">
						{[0, 1, 2].map((i) => (
							<li
								key={i}
								className="flex items-center gap-3"
							>
								<SkeletonLine className="h-2 w-2 shrink-0 rounded-full" />
								<SkeletonLine className="h-4 flex-1" />
							</li>
						))}
					</ul>
				</div>
			</div>

			<div>
				<div className="border-b-2 border-border-strong pb-1 mb-6 mt-12 first:mt-0">
					<SkeletonLine className="h-4 w-32" />
				</div>
				<div className="mt-6">
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-end gap-3">
							<SkeletonLine className="h-4 w-16" />
							<SkeletonLine className="h-4 w-24" />
						</div>
						<SkeletonLine className="h-40 w-full rounded-md" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SkeletonLoader;
