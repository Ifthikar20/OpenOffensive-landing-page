<script setup>
import { useId } from 'vue'

// Two thin overlapping rings ("OO"); the overlap carries a soft gradient taken
// from the hero image. Ids are per instance so the header and footer can both render it.
const uid = useId()
</script>

<template>
  <router-link class="brand" to="/" aria-label="OpenOffensive home">
    <svg class="mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          :id="`${uid}-lens`"
          x1="8"
          y1="10"
          x2="32"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#c7bbef" />
          <stop offset="1" stop-color="#d6c39a" />
        </linearGradient>
        <clipPath :id="`${uid}-clip`"><circle cx="24.5" cy="20" r="10" /></clipPath>
      </defs>
      <circle
        cx="15.5"
        cy="20"
        r="10"
        :fill="`url(#${uid}-lens)`"
        :clip-path="`url(#${uid}-clip)`"
        fill-opacity="0.9"
      />
      <circle cx="15.5" cy="20" r="10" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.5" />
      <circle cx="24.5" cy="20" r="10" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.5" />
    </svg>
    <span class="brand-text"><span>Open</span><b>Offensive</b></span>
  </router-link>
</template>
