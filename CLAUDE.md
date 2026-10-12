# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Frontend capstone app for the Frontend AI Engineering track. Replace this line with a one-sentence description of the app once chosen.

## Stack

- Language: TypeScript (strict mode)
- Framework: React 18 with Vite
- Styling: Tailwind CSS
- Testing: Vitest + React Testing Library
- Package manager: npm
- Node: current LTS

## Structure

```
.github/workflows/   CI workflows
docs/                Notes, decisions, setup checklist
public/              Static files served as-is
src/
  assets/            Images, fonts, icons
  components/        Reusable UI components
  hooks/             Custom React hooks
  pages/             Route-level screens
  lib/               Helpers, API clients, utilities
  types/             Shared TypeScript types
  styles/            Global styles
tests/               Integration and end-to-end tests
```

Unit tests sit next to the code they cover; `tests/` is for broader tests.

## Commands

- `npm install`: install dependencies
- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run test`: run unit tests
- `npm run lint`: lint the codebase

(Commands become valid once the app is scaffolded.)

## Conventions

- Functional components and hooks only; no class components.
- One component per file, PascalCase file names (`SearchBar.tsx`).
- Prefer named exports over default exports.
- Keep components small; extract logic into custom hooks (`useThing.ts`).
- No `any`; use `unknown` and narrow, or define proper types.
- Accessibility first: semantic HTML, labels on inputs, visible focus states.
- Co-locate tests next to the code: `Component.test.tsx`.

## Git

- Commit messages follow Conventional Commits 1.0.0: `type(scope): summary`.
- Allowed types: feat, fix, docs, style, refactor, test, chore, build, ci.
- Keep commits small and focused; imperative mood, summary under 72 characters.
- Work on feature branches; keep `main` working.

## Working with Claude

- Explain a plan before large multi-file changes.
- Do not add dependencies without saying why.
- Run lint and tests after changes and report the results.
- Never commit secrets or `.env` files.
