# VEX website

The official VEX website, built as a lightweight multi-page static site.

## Pages

- `index.html` — homepage introducing VEX and its central ambition
- `about.html` — philosophy, long-term direction, development status, and creators
- `docs.html` — interactive programming-language reference with topic replacement, search, practical examples, and in-page section links

## Documentation portal

The documentation page is organized like a language reference: topics are grouped in a left navigation, the selected article replaces the central content in place, and a right rail summarizes the topic and links to source documents. Search filters the available topics. Code examples have copy controls.

The visual identity reuses the site's charcoal, off-white, and lime palette. Documentation text and code remain neutral for readability; accent color is restricted to interface details.

Reference content is derived from the VEX `dev` branch specification, standard-library notes, installation guide, compiler semantic checks, and language completeness matrix. Experimental or incomplete behavior is labelled rather than presented as a guarantee. The detailed diagnostic catalogue and further function edge-case audit remain ongoing documentation work.

## Preview locally

From this directory, run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Shared assets

- `styles.css` — responsive visual identity and page layouts
- `script.js` — mobile global navigation and dynamic footer year
- `docs-content-*.js` — topic reference content
- `docs-app.js` — topic switching, search, table of contents, and code-copy behavior

The site uses plain HTML, CSS, and JavaScript. No framework or build step is required.
