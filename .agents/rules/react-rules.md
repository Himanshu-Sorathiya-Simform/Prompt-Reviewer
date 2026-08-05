---
trigger: always_on
---

# React & UI Architecture Rules

These rules apply to all code generation, refactoring, and AI interactions within this workspace.

## 1. General AI Behavior & Workflow

- **Zero Assumptions:** Always ask clarifying questions directly instead of assuming or guessing intent, context, or requirements.
- **Strict Scope:** Answer exactly and only what is asked. Omit unnecessary commentary or conversational filler.
- **Design Tokens First:** ALWAYS create complete design tokens (CSS variables/theme constants) that will be used across the application. If unsure about the tokens after analyzing the intent or generating a plan, stop and ask directly before writing code.

## 2. Tailwind CSS (v4)

- **Version:** Strictly use Tailwind CSS v4.
- **No Arbitrary Values:** NEVER use arbitrary values or dynamic brackets (e.g., `w-[15px]`, `text-[#aeaeae]`) for colors, spacing, or any other utility.
- **Variables:** Always define core variables (design tokens) and use them universally throughout the app.

## 3. TypeScript

- **Maximum Strictness:** Enforce the strictest possible TypeScript rules covering every edge case a compiler might throw, without needing to read the `tsconfig`.
- **No Any:** NEVER use `any`. Default to `unknown` if a type is completely indeterminable.
- **Type Definitions:** Use `interface` exclusively for objects. Use `type` for all other type definitions.
- **Simplicity:** Do not create overly complex or acrobatic types just to satisfy a requirement; prioritize strictness combined with readability.

## 4. React (v19)

- **Version:** Default to using React 19 features where applicable.
- **State & Props:** Keep state as localized as possible. Do not lift state unnecessarily. If prop drilling becomes excessive, use Context; otherwise, default to standard local state.
- **Context API:** Context must live in a dedicated file containing ONLY the Provider component and the custom consumption hook. The Context object itself must NEVER be exported.
- **Optimization:** NEVER prematurely optimize with `useCallback` or `useMemo`. Only implement them if explicitly requested or strictly justified by the workload (and output the reasoning when you do).
- **Hooks & Dependencies:** Always properly and exhaustively fill dependency arrays for `useEffect`, `useCallback`, and `useMemo`.
- **Custom Hooks:** Always extract reusable functionality, or logic that is irrelevant to the UI rendering, into separate custom hooks.
- **Event Handlers:** Inline simple 1-2 line handlers directly in the JSX (e.g., `onClick={() => ...}`). Extract multi-line or complex logic into separate functions with highly descriptive names (e.g., `handleSearchChange`, never just `handleChange`).
- **Rendering:** Strongly prefer early returns over nested, messy JSX. Accept nested JSX only if the layout strictly requires it (and evaluate if a separate component is better).
- **Styling:** NEVER use inline `style={{}}` objects.

## 5. Architecture, Exports & Naming

- **Project Structure:** Keep the folder structure simple and flat for a single-feature website.
- **Component Exports:** All React components MUST be `default` exports.
- **Utility/Type Exports:** Everything else MUST be a `named` export.
- **Export Location:** All exports MUST be declared at the very end of the file, not inline with the declaration.
- **Type Exports:** When exporting a type, explicitly prefix it (e.g., `export type { User };`).
- **File Conventions:**
    - Reusable types must go in `types/{name}Types.ts`.
    - Global functions must go in `utils/{name}Utils.ts` (e.g., `dateUtils.ts`).
    - Global constants must go in `constants/{name}Constants.ts`.
