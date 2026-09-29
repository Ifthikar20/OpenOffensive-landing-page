import { createRouter, createWebHistory } from 'vue-router'
import { pageFor, NOT_FOUND, canonicalUrl } from '@/lib/pages'

const routes = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/docs', name: 'docs', component: () => import('@/pages/DocsPage.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/pages/BlogIndexPage.vue') },
  {
    path: '/blog/:slug',
    name: 'post',
    component: () => import('@/pages/BlogPostPage.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

const reduceMotion = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 24, behavior: reduceMotion() ? 'auto' : 'smooth' }
    return { top: 0 }
  },
})

function setTag(selector, attr, value) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

// Keep <title>, description, and canonical in step with the route.
router.afterEach((to) => {
  const path = to.path.replace(/\/+$/, '') || '/'
  const page = pageFor(path)
  document.title = page.title
  setTag('meta[name="description"]', 'content', page.description)
  setTag('meta[property="og:title"]', 'content', page.title)
  setTag('meta[property="og:description"]', 'content', page.description)
  const canonical = canonicalUrl(page === NOT_FOUND ? '/' : page.path)
  setTag('meta[property="og:url"]', 'content', canonical)
  setTag('link[rel="canonical"]', 'href', canonical)
})

export default router
