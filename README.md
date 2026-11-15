# VEX website

The official VEX website, built as a lightweight multi-page static site.

## Pages

- `index.html` — homepage introducing VEX and its central ambition
- `about.html` — philosophy, long-term direction, development status, and creators
- `docs.html` — documentation status; explains that documentation will be expanded and updated in the future

## Preview locally

From this directory, run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Shared assets

- `styles.css` — responsive visual identity and layouts
- `script.js` — mobile navigation and dynamic footer year

The site uses plain HTML, CSS, and JavaScript. No framework or build step is required.