<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

// The site's pill button. Renders a <router-link> for `to`, or an <a> for `href`
// (http links open in a new tab).
const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'dark' }, // dark | white | outline
  size: { type: String, default: 'md' }, // sm | md | lg
  icon: { type: String, default: null },
  iconAfter: { type: Boolean, default: false },
})

const external = computed(() => !!props.href && /^https?:/.test(props.href))
const classes = computed(() => [
  'pill',
  props.size !== 'md' && `pill-${props.size}`,
  props.variant !== 'dark' && `pill-${props.variant}`,
])
const iconSize = computed(() => (props.size === 'lg' ? 20 : 17))
</script>

<template>
  <router-link v-if="to" :to="to" :class="classes">
    <Icon v-if="icon && !iconAfter" :name="icon" :size="iconSize" />
    <slot />
    <Icon v-if="icon && iconAfter" :name="icon" :size="iconSize" />
  </router-link>
  <a
    v-else
    :href="href"
    :class="classes"
    :target="external ? '_blank' : null"
    :rel="external ? 'noopener' : null"
  >
    <Icon v-if="icon && !iconAfter" :name="icon" :size="iconSize" />
    <slot />
    <Icon v-if="icon && iconAfter" :name="icon" :size="iconSize" />
  </a>
</template>
