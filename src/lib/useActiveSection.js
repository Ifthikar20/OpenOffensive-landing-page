import { ref, onMounted, onBeforeUnmount } from 'vue'

// Tracks which section (by element id) is currently near the top of the viewport,
// for highlighting the matching link in a table of contents.
export function useActiveSection(ids) {
  const active = ref(ids[0])
  let io = null

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    const visible = new Set()
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        const first = ids.find((id) => visible.has(id))
        if (first) active.value = first
      },
      { rootMargin: '-12% 0px -72% 0px' }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
  })

  onBeforeUnmount(() => io?.disconnect())
  return active
}
