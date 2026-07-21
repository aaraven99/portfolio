# Repository Guidelines

## Project Structure & Module Organization

The working portfolio app is in `Portfolio/`. Main application code lives in `Portfolio/app/`: `page.tsx` renders the site, `content.ts` holds editable portfolio data, `layout.tsx` defines metadata, and `globals.css` contains global styling and motion. Static assets are in `Portfolio/public/`. Tests live in `Portfolio/tests/`. Build output and generated folders such as `Portfolio/.next/`, `Portfolio/dist/`, `Portfolio/work/`, and `Portfolio/node_modules/` should not be edited by hand.

## Build, Test, and Development Commands

Run commands from `Portfolio/`.

- `npm run dev`: starts the local Vinext development server.
- `npm run build`: creates a production build.
- `npm test`: runs the build, then Node test files in `tests/`.
- `npm run lint`: runs ESLint while ignoring generated build folders.
- `npm run db:generate`: generates Drizzle artifacts when schema changes require it.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep portfolio copy and structured entries in `app/content.ts` so the page remains easy to update. Use two-space indentation, double quotes, and semicolons, matching the existing files. Component names use `PascalCase`; helpers, constants, and CSS class names use descriptive lower-case or camelCase names based on local convention.

## Testing Guidelines

Tests use Node's built-in test runner with `.mjs` files under `Portfolio/tests/`. Add focused assertions for rendered content, accessibility-critical labels, and regressions in important portfolio sections. Name new tests by behavior or page area, for example `hero-navigation.test.mjs`. Run `npm test` before handing off user-facing changes.

## Commit & Pull Request Guidelines

Recent commits use short imperative messages, such as `Simplify portfolio chart labels` and `Refine portfolio visuals and alignment`. Keep commits scoped to one logical change. Pull requests should include a concise summary, validation commands run, screenshots for visual changes, and links to any related issue or deployment URL.

## Security & Configuration Tips

Do not commit secrets, tokens, or local deployment credentials from `.vercel/`. Keep public contact details intentional and editable through content or metadata files. If `.openai/hosting.json` is present, preserve its project ID and follow the existing hosting workflow.
