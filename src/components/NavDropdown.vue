<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

defineProps({ label: { type: String, required: true } })

const open = ref(false)
const root = ref(null)
let timer = null

function show() {
  clearTimeout(timer)
  open.value = true
}
function hideSoon() {
  clearTimeout(timer)
  timer = setTimeout(() => (open.value = false), 120)
}
function onFocusOut(e) {
  if (!root.value?.contains(e.relatedTarget)) open.value = false
}
function onDocClick(e) {
  if (root.value && !root.value.contains(e.target)) open.value = false
}
function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  clearTimeout(timer)
})
</script>

<template>
  <li ref="root" class="menu-item" @mouseenter="show" @mouseleave="hideSoon" @focusout="onFocusOut">
    <button
      type="button"
      class="menu-link"
      aria-haspopup="true"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ label }}
      <Icon name="chevrons" :size="14" class="chev" />
    </button>
    <div v-show="open" class="dropdown" @click="open = false">
      <slot />
    </div>
  </li>
</template>
