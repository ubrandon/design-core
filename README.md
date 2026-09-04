# Design Core

A personal, file-based design tool. Describe screens and prototypes to an AI, it writes plain HTML/CSS/JS, and the tool renders them on an infinite canvas, as interactive prototypes, and as a design system reference. Vanilla HTML/CSS/JS + Vite, no framework, no database, no backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 (fixed port so links stay stable)
```

## Companies

One repo holds many companies. Each company is a top-level grouping of projects with its own design system and captures, all under `public/data/companies/<company-slug>/`. `public/data/companies/index.json` lists them.

- The home page has a company picker; the left rail has a company switcher (with "add new company").
- Every page accepts `?company=<slug>` and remembers the last choice in the browser. Share links include `&company=`.
- Project ids only need to be unique within a company.

## Scripts

```bash
npm run dev                                                    # start the tool
npm run build                                                  # production build (dist/)
npm run preview                                                # preview the build
npm run doctor                                                 # health check: Node, deps, every company's JSON, canvas entries, CSS link depth
npm run test:canvas                                            # synchronization, undo, and browser interaction regression tests
npm run capture -- --company <slug>                            # screenshot a live app into that company's captures/ (auto-picks if only one company)
npm run sync-public-url                                        # write publicBaseUrl into public/data/site.json from the git remote
npm run import-company -- <path-to-old-repo> <slug> "<Name>"   # copy an old single-company repo's public/data into a company folder and fix relative links
```

## Canvas controls

Use **V** to select, **H** to pan, and **T** to place a title. Space+drag temporarily pans. **Shift+1** frames all content, **Shift+2** frames the selection, and **0** returns to actual size. Automatic framing stops as soon as you interact with the view.

Select two or more objects to use **Arrange** for alignment, or three or more for equal spacing. The toolbar shows save status, undo/redo, and a **?** shortcut guide.

**Cmd/Ctrl+Z** undoes an action; **Cmd/Ctrl+Shift+Z** redoes it. History keeps the last 100 actions per company and project in the current tab, including across reloads. Delete removes an object from the canvas and retains its screen HTML file on disk so it can be restored. Undo preserves unrelated changes made by an AI or editor.

## Folder layout

Vite serves `public/` at the site root, so browser paths drop the `public/` prefix (`data/companies/<slug>/...`).

```
index.html, project.html, canvas.html, prototype.html, design-system.html, captures.html
public/
  scripts/                    Browser JS for the tool
  styles/                     shared.css (tokens), ds.css (components), app.css (tool chrome)
  data/
    site.json                 Optional { "publicBaseUrl": "https://..." } for share links
    companies/
      index.json              { "companies": [{ "slug", "name", "createdAt" }] }
      <company-slug>/
        projects/
          index.json
          <project-id>/
            project.json
            canvas.json
            screens/          Static HTML fragments for the canvas
            prototypes/
              index.json
              <prototype-id>/ meta.json + index.html
        design-system/
          company.css         Brand overrides and company component classes
          registry.json       Groups and categories for the design system page
          components/<company-slug>/   Preview fragments
        captures/             config.json, manifest.json, screenshots
        users/                Per-user preferences (managed by the tool)
scripts/                      Node CLIs (doctor, capture, import-company, sync-public-url) and the dev-server API
docs/                         design-system.md, captures.md, TROUBLESHOOTING.md
```

Stylesheet links inside design files are relative: canvas screens use six `../` to reach `styles/`, prototypes use seven, and `company.css` is three or four levels up respectively. `npm run doctor` checks these.

## Sharing

Push to `main` and the site deploys to GitHub Pages via the workflow in `.github/`. Set `publicBaseUrl` in `public/data/site.json` (or run `npm run sync-public-url`) so **Copy link** gives the public URL while working on localhost.

## AI rules

`.cursor/rules/design-tool.mdc` is the full rule set for any AI working in this repo. `CLAUDE.md` and `AGENTS.md` point at it.

## License

MIT
