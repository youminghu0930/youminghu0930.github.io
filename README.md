# Youming Hu — personal page

Polished page: https://youminghu0930.github.io/  
GitHub introduction: https://github.com/youminghu0930

A single personal introduction with About, Work & achievements, Skills & focus, and Find me. The profile README and this site present the same content and link to each other.

## Structure

```text
index.html
main.js
navigation.js
styles.css
materials/content.json
materials/data/
scripts/serve.mjs
scripts/build-site.mjs
.github/workflows/pages.yml
```

Edit `materials/content.json` for copy and links; put media in `materials/data/`. Keep the sibling `main-private.github/README.md` in sync when changing personal content.

## Run

Node.js 22+, no dependencies.

```sh
node scripts/serve.mjs
```

Open http://localhost:8200. Stop with Ctrl+C.

## Build

```sh
node scripts/build-site.mjs
node scripts/serve.mjs --dist
```

The workflow builds and deploys `dist/` on pushes to main or master. In GitHub repository Settings → Pages, choose GitHub Actions as the source. Build output is ignored by Git.

The sibling profile repository remote is `youminghu0930/youminghu0930`; its root README supplies the personal GitHub introduction. This differs from the public organization’s `profile/README.md` arrangement.

## Parallel landing pages

The personal and public GitHub landing READMEs link to each other and to their own polished pages. The polished personal page and portfolio link to each other in the main content; each left navigator returns to its own GitHub parent.

## Shared appearance

The canonical design lives in `main-public.github.io/design/`: edit `theme.json` for colors and corner radii or `styles.template.css` for layout and typography. From that repository, run `node scripts/sync-design.mjs` to update both pages, then `node scripts/sync-design.mjs --check` to check for differences. Both `styles.css` files are generated. See `design/SPEC.md` in the public polished-page repository for the shared markup contract and alternate checkout paths.
