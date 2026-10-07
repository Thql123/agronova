Agriflow Development Guidelines
Project

Agriflow is a farm management platform being built for a hackathon.

Tech Stack
Next.js
React
TypeScript
Tailwind CSS
Next.js App Router
General Rules
Use TypeScript for all application code.
Use the Next.js App Router.
Prefer Server Components by default.
Use Client Components only when client-side interactivity is required.
Use Tailwind CSS for styling.
Build responsive interfaces for mobile, tablet and desktop.
Follow the existing Figma design and product requirements.
Keep components reusable and focused.
Avoid unnecessary dependencies.
Do not install a package unless it is actually needed.
Do not modify unrelated files.
Do not rewrite working code unnecessarily.
Preserve the existing project architecture unless there is a strong reason to change it.
UI
Prioritize clean, modern and professional interfaces.
Maintain consistent spacing, typography and component patterns.
Include loading, empty and error states where appropriate.
Consider accessibility when building interactive elements.
Avoid hardcoded values when they should be reusable configuration or data.
Data and Security
Never hardcode secrets or API keys.
Never commit .env.local.
Use environment variables for sensitive configuration.
Do not expose server-only secrets to client components.
Validate user input before processing it.
Git
Do not work directly on main.
Use feature branches for development.
Keep commits focused and descriptive.
Do not modify Git history unless explicitly requested.
Do not force-push unless explicitly requested.
Before Coding

Before implementing a task:

Inspect the existing project structure.
Identify the files relevant to the task.
Reuse existing components where appropriate.
Explain the implementation approach briefly.
Make the smallest reasonable set of changes.
After Coding

After completing a task:

Explain what was changed.
List the files modified.
Mention any dependencies added.
Check for TypeScript or lint errors.
Do not modify unrelated parts of the application.
Product Principle

Build the simplest implementation that satisfies the current Agriflow MVP requirement.

Do not over-engineer the application.