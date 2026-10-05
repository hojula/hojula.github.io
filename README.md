# hojula.github.io

Personal academic website of Jan Hlavsa: plain HTML, CSS and JavaScript, with no build step.

```
index.html              # the whole page
assets/css/style.css    # styles (light + dark theme)
assets/js/main.js       # theme toggle, BibTeX toggle/copy, active nav link
assets/img/             # portrait, paper teasers, favicon
assets/docs/            # CV, ETH SSRF certificate, Rakathon press release
.nojekyll               # serve files as-is (no Jekyll processing)
```

## Deploy to GitHub Pages

1. Create a public repository named **`hojula.github.io`** on GitHub.
2. Push this folder to it:
   ```sh
   git init -b main
   git add .
   git commit -m "Personal website"
   git remote add origin git@github.com:hojula/hojula.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set *Source* to *Deploy from a branch*, then pick `main` and `/ (root)`.
4. The site goes live at <https://hojula.github.io> within a minute or two.

If you use a different repository name, the site is served at `https://hojula.github.io/<repo>/`.
In that case, update the `og:image`, `og:url` and JSON-LD URLs in `index.html`.

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Things to update

- **Google Scholar**: the button points to a Scholar search. Replace it with your profile URL
  (`https://scholar.google.com/citations?user=…`); look for the `TODO` comment in `index.html`.
- **CV PDF**: to update it, overwrite `assets/docs/jan-hlavsa-cv.pdf` (both CV buttons link to that file).
- **MVA paper**: once it is accepted, add its links and a teaser image to the first publication card.
