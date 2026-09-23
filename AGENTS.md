# Design Core -- instructions for AI agents

Design Core is a personal, file-based design tool: one repo, one owner, many companies.

**Before doing anything else, read `.cursor/rules/design-tool.mdc` in full.** It is the complete, binding rule set for this repo and applies to every AI assistant (Copilot, Claude, Cursor, or anything else).

Restated:

- All design data lives under `public/data/companies/<company-slug>/` (projects, design-system, captures, users). Everything else is the tool itself. Both kinds of work are allowed; say which one you are doing.
- Pick the company from context; if there are several and it is unclear, ask.
- Run `npm run doctor` whenever something seems broken and follow its fixes.
- Never commit, push, fetch, pull, or merge without being asked.
- No em-dashes in copy or UI text. Code comments are single-line.
