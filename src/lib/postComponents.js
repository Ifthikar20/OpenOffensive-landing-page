import { defineAsyncComponent } from 'vue'

// Each post body is a template-only component, code-split per route.
export const postComponents = {
  'introducing-openoffensive': defineAsyncComponent(
    () => import('@/content/posts/IntroducingOpenOffensive.vue')
  ),
  'graph-of-agents': defineAsyncComponent(() => import('@/content/posts/GraphOfAgents.vue')),
  'openoffensive-in-ci': defineAsyncComponent(
    () => import('@/content/posts/OpenOffensiveInCi.vue')
  ),
}
