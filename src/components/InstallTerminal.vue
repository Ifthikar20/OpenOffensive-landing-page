<script setup>
import { ref, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

// A dark terminal card with a copy button. Lines render with a `$` prompt; dim
// lines are context. `copy` overrides what the button copies (defaults to every
// non-dim line, one per row).
const props = defineProps({
  name: { type: String, default: 'bash' },
  lines: { type: Array, required: true }, // [{ text, dim? }]
  copy: { type: String, default: '' },
  flush: { type: Boolean, default: false },
})

const copied = ref(false)
let timer = null

function done() {
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1500)
}

function fallback(text) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'absolute'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  } catch {
    /* clipboard blocked: nothing else to try */
  }
  done()
}

async function copyCmd() {
  const text =
    props.copy ||
    props.lines
      .filter((l) => !l.dim)
      .map((l) => l.text)
      .join('\n')
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      done()
    } else {
      fallback(text)
    }
  } catch {
    fallback(text)
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="term" :class="{ flush }" role="group" :aria-label="`${name} commands`">
    <div class="term-bar">
      <span class="term-name">{{ name }}</span>
      <button class="copy" :class="{ copied }" type="button" aria-label="Copy command" @click="copyCmd">
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
        <span class="sq"><Icon :name="copied ? 'check' : 'copy'" :size="15" /></span>
      </button>
    </div>
    <div class="term-body">
      <div v-for="(l, i) in lines" :key="i" class="cmd" :class="{ dim: l.dim }"><span class="prompt">$</span>{{ l.text }}</div>
    </div>
  </div>
</template>
