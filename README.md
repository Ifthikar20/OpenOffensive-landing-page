# OpenOffensive landing page

The website for [OpenOffensive](https://github.com/Ifthikar20/open-offensive), the open-source
multi-agent AI pentester. Built with Vue 3, Vue Router, and Vite. It builds to plain static files
and needs no server.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page |
| `/docs` | Documentation: overview, quickstart, concepts, commands, configuration |
| `/blog`, `/blog/:slug` | Blog |
| `/login` | Sign-in placeholder. Under construction |

The docs page is intentionally high level. Deeper documentation stays in the main repository.

## Develop

Requires Node 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # writes dist/
npm run preview    # serves dist/ locally
```

`npm run build` also runs `scripts/prerender.mjs`, which writes one HTML file per route with its own
title, description, and canonical URL, plus `404.html`, `sitemap.xml`, `robots.txt`, and `CNAME`.
Deep links such as `/docs/` therefore answer with a normal 200 on a static host.

## Where things live

```text
src/
  assets/         base.css (design tokens), header.css, home.css, docs.css, pages.css
  components/     header, footer, buttons, code block, and components/docs/* for the docs page
  content/        docs.js (docs copy) and posts/*.vue (blog posts)
  lib/            site.js (links and domain), pages.js (route metadata), posts.js (blog index)
  pages/          one file per route
public/           favicon and the optimized hero image
design/           source artwork that is not deployed
scripts/          the post-build prerender step
```

## Common changes

- **Domain.** Set `SITE.url` in `src/lib/site.js`. The canonical URLs, sitemap, robots file, and
  `CNAME` are all generated from it.
- **Colors.** The palette is defined once at the top of `src/assets/base.css`. It was sampled from
  the hero image.
- **Hero image.** `design/background.png` is the source. The site serves `public/background.webp`.
  After replacing the source, regenerate it:

  ```bash
  cwebp -q 80 -m 6 design/background.png -o public/background.webp
  ```

- **Blog.** Add an entry to `src/lib/posts.js`, create the post body in `src/content/posts/`, and
  register it in `src/lib/postComponents.js`.
- **Docs copy.** Edit `src/content/docs.js` and the components in `src/components/docs/`.

## Deploy

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it on every push to
`main`.

1. In the repository, open **Settings, Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`, or run the workflow by hand from the **Actions** tab.
3. Open **Settings, Pages, Custom domain**, enter your domain, and enable **Enforce HTTPS** once the
   certificate is issued.
4. At your domain registrar, add these DNS records.

   | Type | Host | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `ifthikar20.github.io` |

   Optional IPv6 records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
   `2606:50c0:8002::153`, `2606:50c0:8003::153`.

DNS changes can take a while to propagate. GitHub documents the current records in
[Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

The site expects to be served from the root of a domain. It will not work from a sub-path such as
`ifthikar20.github.io/OpenOffensive-landing-page/` until the custom domain is set.

### Any other static host

Use `npm run build` as the build command and `dist` as the output directory. Cloudflare Pages,
Netlify, and Vercel all work without extra configuration.
