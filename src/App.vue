<script setup>
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// The home page is the hero alone; inner pages keep the footer.
const route = useRoute()
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <router-view />
  </main>
  <SiteFooter v-if="route.name !== 'home'" />
</template>
