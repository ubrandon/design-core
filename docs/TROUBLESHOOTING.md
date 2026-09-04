# Troubleshooting

First move for almost everything: run `npm run doctor` (or ask the AI to). It checks Node, dependencies, and every company's data files, then names what's broken and the exact fix. The entries below cover the known traps and what's behind them.

## "My new screen doesn't show up on the canvas"

Every screen needs two things: the HTML file in the project's `screens/` folder AND an entry in that project's `canvas.json`. If either is missing the screen silently doesn't appear. `npm run doctor` flags both directions (listed but missing, and existing but unlisted).

Deleting a screen in the canvas intentionally keeps its HTML file on disk, so an unlisted-file note can also mean a screen was removed from the canvas. Use Undo in the same tab to restore a recent deletion, even after reloading.

## "My prototype or screen has no styling"

The stylesheet links must climb back to the site root: canvas screens use **six** `../` (`../../../../../../styles/shared.css`), prototypes use **seven**. `company.css` is `../../../design-system/company.css` from a screen and `../../../../design-system/company.css` from a prototype. One level off and styles silently fail, sometimes only on the published site. `npm run doctor` checks the depth; otherwise inspect the `<link>` tags.

## "Icons are invisible"

Only two icon styles are loaded: regular (`ph`) and filled (`ph-fill`). Any other Phosphor weight (`ph-bold`, `ph-duotone`, ...) renders as nothing. Swap the icon class to a loaded weight.

## "A whole page of the tool shows nothing / my projects disappeared"

Almost always a broken JSON data file (a missing or extra comma from a hand edit), or the wrong company is selected. Check the company switcher in the left rail first. Otherwise `npm run doctor` names the exact file and error.

## "A company is missing from the switcher"

The company folder exists under `public/data/companies/` but is not listed in `public/data/companies/index.json`. `npm run doctor` reports this; add the `{ "slug", "name", "createdAt" }` entry.

## "Copy link gives people localhost"

The share URL isn't configured yet. Make sure GitHub Pages is enabled (**Settings → Pages → Source → GitHub Actions**), then run `npm run sync-public-url` once (or set `publicBaseUrl` in `public/data/site.json` by hand).

## "Port 3000 is already in use"

Design Core always runs at http://localhost:3000 so links stay stable, and it refuses to start if something else is on that port. Usually the something else is another Design Core window: close it (or stop its dev server) and run `npm run dev` again.

## "Captures go to the wrong company"

The capture script picks the company from `--company <slug>` (or `DESIGN_CORE_COMPANY`), and only auto-picks when there is exactly one company. From the UI, the Captures page uses the currently selected company.
