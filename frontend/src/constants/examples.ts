import type { ExamplePrompt } from "../types/index";

export const EXAMPLES: ExamplePrompt[] = [
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
