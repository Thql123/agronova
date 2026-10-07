# Agriflow Development Guidelines

## Project

Agriflow is a farm management platform being built as a polished hackathon MVP.

The core product flow is:

User
→ Farm
→ Batch
→ Daily Record
→ Dashboard insights

Prioritize making this core workflow functional before adding secondary features.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router

## General Rules

- Use TypeScript for all application code.
- Use the Next.js App Router.
- Prefer Server Components by default.
- Use Client Components only when client-side interactivity is required.
- Use Tailwind CSS for styling.
- Build responsive interfaces for mobile, tablet, and desktop.
- Follow the existing Figma design and product requirements.
- Keep components focused and reusable where reuse is actually beneficial.
- Prefer existing dependencies and platform capabilities before introducing new packages.
- Do not install a package unless it is actually needed for the current task.
- Do not modify unrelated files.
- Do not rewrite working code unnecessarily.
- Preserve the existing project architecture unless there is a clear reason to change it.
- Do not implement features beyond the requested task just because they may be useful later.

## Architecture

- Keep architecture appropriate for a hackathon MVP.
- Do not introduce abstractions solely for hypothetical future requirements.
- Do not introduce global state management unless the application actually requires it.
- Do not introduce authentication, database, API, or third-party services unless the current task requires them.
- Prefer simple, explicit implementations over premature abstraction.
- Keep server-side logic on the server whenever possible.
- Keep client-side JavaScript limited to components that require browser interaction or client state.

## UI

- Treat the Agriflow Figma design as the primary visual reference.
- Prioritize clean, modern, professional interfaces.
- Maintain consistent spacing, typography, borders, and component patterns.
- Build shared layout components when multiple screens genuinely use the same structure.
- Include loading, empty, and error states where appropriate.
- Consider accessibility when building interactive elements.
- Avoid hardcoding business data or repeated configuration.
- Do not create abstractions for one-off static UI values unless there is a clear benefit.

## Data and Security

- Never hardcode secrets or API keys.
- Never commit `.env.local`.
- Use environment variables for sensitive configuration.
- Do not expose server-only secrets to Client Components.
- Validate user input before processing it.
- Do not assume provisional data models are final unless they have been confirmed for the MVP.

## Git

- Do not work directly on `main`.
- Use feature branches for development.
- Keep commits focused and descriptive.
- Prefer conventional commit messages such as `feat:`, `fix:`, `chore:`, and `refactor:`.
- Do not modify Git history unless explicitly requested.
- Do not force-push unless explicitly requested.
- Do not create commits or push changes unless explicitly requested.

## Before Coding

Before implementing a task:

1. Read this `AGENTS.md`.
2. Inspect the existing project structure.
3. Identify the files relevant to the task.
4. Reuse existing components where appropriate.
5. Briefly explain the implementation approach.
6. Make the smallest reasonable set of changes.
7. Ask before making a major architectural change that is outside the requested scope.

## After Coding

After completing a task:

1. Explain what was changed.
2. List the files created or modified.
3. Mention any dependencies added and why.
4. Run or recommend the relevant TypeScript, lint, and build checks.
5. Report any remaining errors or warnings.
6. Do not modify unrelated parts of the application.

## Product Principle

Build the simplest implementation that satisfies the current Agriflow MVP requirement.

The priority order is:

1. Functional product
2. Good user experience
3. Clean architecture
4. Maintainable code
5. Good engineering practices
6. Hackathon-appropriate development speed

Do not over-engineer the application.