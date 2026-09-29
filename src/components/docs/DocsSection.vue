<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <section :id="id" class="docs-section">
    <h2>
      <router-link class="anchor" :to="{ hash: `#${id}` }" :aria-label="`Link to ${title}`">#</router-link>
      {{ title }}
    </h2>
    <p v-if="lead" class="section-lead">{{ lead }}</p>
    <slot />
  </section>
</template>
