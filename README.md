# Design Core

File-based design tool for UI ideation, interactive prototyping, and design system reference. Built with vanilla HTML/CSS/JS + Vite — no framework, no database, no backend.

Designers use [Cursor](https://cursor.com) to prompt AI to build interactive prototypes, then push to Git for shareable GitHub Pages links.

## Setup

```bash
npm install
npm run dev
```

Open the Vite URL shown in terminal (default `http://localhost:3000`).

## Workspaces

- **Home** — Project list
- **Project Hub** — Jump to canvas or prototypes
- **Canvas** — Infinite canvas for arranging static screen ideation
- **Prototypes** — Interactive HTML/CSS/JS mini-apps built with AI
- **Design System** — Global component reference

## File Structure

```
public/data/
  projects/
    index.json
    <project-id>/
      project.json
      canvas.json
      screens/          ← Static HTML (no JS) for canvas ideation
      prototypes/
        index.json
        <prototype-id>/
          meta.json
          index.html    ← Interactive prototype (HTML/CSS/JS)
  design-system/
    registry.json
    components/         ← Component HTML snippets
```

## Sharing

Push to `main` and prototypes deploy to GitHub Pages automatically.

## Getting Started

See [GETTING_STARTED.md](GETTING_STARTED.md) for a step-by-step guide (no coding experience needed).

## License

MIT
