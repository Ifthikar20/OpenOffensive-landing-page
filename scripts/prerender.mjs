// Post-build step for a static host (GitHub Pages, Cloudflare Pages, Netlify, S3, ...).
//  - One HTML file per route with its own <title>, description, and canonical URL,
//    so deep links answer 200 and share properly instead of leaning on a 404 fallback.
//  - dist/404.html: the app shell, noindex, for unknown paths.
//  - sitemap.xml, robots.txt, and CNAME (custom domain) generated from src/lib/site.js.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_PAGES, NOT_FOUND, canonicalUrl } from '../src/lib/pages.js'
import { SITE } from '../src/lib/site.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const shell = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Rewrite one attribute of the first tag matching `tag`. Throws if the shell changed shape.
function setAttr(html, tag, attr, value) {
  if (!tag.test(html)) throw new Error(`prerender: index.html is missing ${tag}`)
  return html.replace(tag, (m) =>
    m.replace(new RegExp(`(\\s${attr}=")[^"]*(")`), (_, a, b) => a + esc(value) + b)
  )
}

function render(meta, canonicalPath, noindex = false) {
  const url = canonicalUrl(canonicalPath)
  let html = shell.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(meta.title)}</title>`)
  html = setAttr(html, /<meta\s+name="description"[^>]*>/, 'content', meta.description)
  html = setAttr(html, /<meta\s+property="og:title"[^>]*>/, 'content', meta.title)
  html = setAttr(html, /<meta\s+property="og:description"[^>]*>/, 'content', meta.description)
  html = setAttr(html, /<meta\s+property="og:url"[^>]*>/, 'content', url)
  html = setAttr(html, /<link\s+rel="canonical"[^>]*>/, 'href', url)
  if (noindex) {
    html = html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
  }
  return html
}

function write(rel, data) {
  const file = join(dist, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, data)
}

for (const page of ALL_PAGES) {
  const rel = page.path === '/' ? 'index.html' : join(page.path.slice(1), 'index.html')
  write(rel, render(page, page.path, page.noindex))
}
write('404.html', render(NOT_FOUND, '/', true))

const lastmod = new Date().toISOString().slice(0, 10)
const urls = ALL_PAGES.filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${canonicalUrl(p.path)}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join('\n')
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)
write('CNAME', `${new URL(SITE.url).host}\n`)

console.log(`prerender: ${ALL_PAGES.length} routes + 404.html, sitemap.xml, robots.txt, CNAME`)
