# kyletjones.com

This repository contains the source for [kyletjones.com](https://kyletjones.com/).

## Managing Projects

Projects on the homepage are now data-driven. To add, edit, or reorder projects, update `projects.json` in the repository root.

Each project entry supports the following fields:

- `title` (string, required) — Project name
- `url` (string, required) — Link to the project (site, docs, or repo)
- `icon` (string, optional) — Emoji displayed as the project icon (e.g., `🤖`, `📊`)
- `meta` (string, optional) — Short tag shown under the title (e.g., `Open Source`, `Personal Project`)
- `description` (string, optional) — Brief description

Example:

```json
[
  {
    "title": "PM Simulation",
    "url": "https://kylejones200.github.io/pm_simulation/",
    "icon": "🧩",
    "meta": "Personal Project",
    "description": "Interactive simulation for project management scenarios."
  }
]
```

Notes:

- `script.js` fetches `projects.json` at runtime and renders the cards in the `Projects` section.
- If `projects.json` fails to load for any reason, a built-in fallback list is used, so the section will still render.
- On GitHub Pages, `projects.json` is served as a static file from the site root; the Content Security Policy allows same-origin fetches.

## Local development

Because this is a static site, you can use any local HTTP server to preview changes (browsers often block `fetch()` from `file://`). Examples:

- Python 3: `python3 -m http.server 8000`
- Node (serve): `npx serve .`

Then open `http://localhost:8000/` in your browser.

## Deployment

The site is deployed via GitHub Pages. Commit and push changes to publish. The `CNAME` file ensures the custom domain is correctly configured.