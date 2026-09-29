// Per-route metadata. Pure data with no framework imports, so the router (runtime)
// and scripts/prerender.mjs (build time) read the same source.
import { SITE } from './site.js'
import { posts } from './posts.js'

export const STATIC_PAGES = [
  { path: '/', title: 'OpenOffensive — multi-agent AI pentester', description: SITE.description },
  {
    path: '/docs',
    title: 'Documentation — OpenOffensive',
    description:
      'An introduction to OpenOffensive: what it does, how to get started, how it works, its security model, the commands, and how to contribute.',
  },
  {
    path: '/blog',
    title: 'Blog — OpenOffensive',
    description:
      'Notes on autonomous AI penetration testing — announcements, engineering deep-dives, and practical guides from the OpenOffensive team.',
  },
  {
    path: '/login',
    title: 'Sign in — OpenOffensive',
    description:
      'Sign-in for the OpenOffensive console is under construction. The console is an invite-only beta.',
    noindex: true,
  },
]

const POST_PAGES = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} — OpenOffensive`,
  description: p.excerpt,
}))

export const ALL_PAGES = [...STATIC_PAGES, ...POST_PAGES]
export const NOT_FOUND = {
  title: 'Page not found — OpenOffensive',
  description: SITE.description,
  noindex: true,
}

export const pageFor = (path) => ALL_PAGES.find((p) => p.path === path) || NOT_FOUND

// Static hosts serve /docs/ (a directory index), so canonical URLs end in a slash.
export const canonicalUrl = (path) => SITE.url + (path === '/' ? '/' : `${path}/`)
