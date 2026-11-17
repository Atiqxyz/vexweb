# VEX website

The official VEX website, built as a lightweight multi-page static site.

## Pages

- `index.html` — homepage introducing VEX and its central ambition
- `about.html` — philosophy, long-term direction, development status, and creators
- `docs.html` — searchable programming-language documentation portal with topic navigation, language guides, examples, and implementation-status notes

## Documentation

The documentation portal uses the site's existing charcoal, off-white, and lime visual identity. Documentation prose and code remain neutral for readability. The portal includes responsive topic navigation, on-page contents, searchable sections, and copyable code examples.

Language behavior is documented against the VEX compiler project. Experimental and incomplete areas are labelled rather than presented as implemented guarantees. The detailed implementation matrix and compiler design notes remain in the [VEX source repository](https://github.com/Atiqxyz/vex/tree/dev/docs).

## Preview locally

From this directory, run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Shared assets

- `styles.css` — responsive visual identity and layouts
- `script.js` — mobile navigation, documentation search, code-copy controls, and dynamic footer year

The site uses plain HTML, CSS, and JavaScript. No framework or build step is required.
