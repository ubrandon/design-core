# Design Core -- instructions for Claude

Design Core is a personal, file-based design tool: one repo, one owner, many companies. The binding rules live in `.cursor/rules/design-tool.mdc` and apply to you exactly as written ("Cursor" there means whatever AI assistant is working in this repo).

@.cursor/rules/design-tool.mdc

Restated:

- All design data lives under `public/data/companies/<company-slug>/` (projects, design-system, captures, users). Everything else is the tool itself. Both kinds of work are allowed; say which one you are doing.
- Pick the company from context; if there are several and it is unclear, ask.
- Run `npm run doctor` whenever something seems broken and follow its fixes.
- Never commit, push, fetch, pull, or merge without being asked.
- No em-dashes in copy or UI text. Code comments are single-line.
