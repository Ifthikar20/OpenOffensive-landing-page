<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './BrandMark.vue'
import NavDropdown from './NavDropdown.vue'
import PillButton from './PillButton.vue'
import Icon from './Icon.vue'
import { GITHUB, DOCS, ISSUES, LICENSE_URL, doc } from '@/lib/site'

const mobileOpen = ref(false)
const route = useRoute()
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false)
)
</script>

<template>
  <header class="site-header">
    <div class="wrap">
      <nav class="site-nav" aria-label="Primary">
        <BrandMark />

        <ul class="menu">
          <NavDropdown label="Product">
            <router-link to="/"><b>Overview</b><span>What OpenOffensive is</span></router-link>
            <router-link :to="{ path: '/docs', hash: '#how-it-works' }">
              <b>How it works</b><span>From target to validated finding</span>
            </router-link>
            <router-link :to="{ path: '/docs', hash: '#quickstart' }">
              <b>Quickstart</b><span>One line to get the CLI</span>
            </router-link>
            <router-link to="/login">
              <b>Console</b><span>The web dashboard. Sign-in is coming soon</span>
            </router-link>
          </NavDropdown>

          <NavDropdown label="Docs">
            <router-link to="/docs">
              <b>Documentation</b><span>Introduction, quickstart, and reference</span>
            </router-link>
            <router-link :to="{ path: '/docs', hash: '#security' }">
              <b>Security model</b><span>Isolation and authorized use</span>
            </router-link>
            <a :href="DOCS" target="_blank" rel="noopener">
              <b>Full documentation</b><span>Browse every guide on GitHub</span>
            </a>
          </NavDropdown>

          <NavDropdown label="Resources">
            <a :href="GITHUB" target="_blank" rel="noopener"><b>GitHub</b><span>Source code and discussion</span></a>
            <a :href="ISSUES" target="_blank" rel="noopener"><b>Issues</b><span>Report a bug or request a feature</span></a>
            <a :href="doc('USAGE.md')" target="_blank" rel="noopener"><b>Usage guide</b><span>Every command and setting</span></a>
            <a :href="LICENSE_URL" target="_blank" rel="noopener"><b>MIT License</b><span>Free to use, change, and share</span></a>
          </NavDropdown>

          <li><router-link class="menu-link" to="/blog">Blog</router-link></li>
        </ul>

        <div class="nav-right">
          <a class="star-link" :href="GITHUB" target="_blank" rel="noopener">
            <Icon name="star" :size="17" /> Star on GitHub
          </a>
          <PillButton class="hide-md" to="/login" size="sm">Sign in</PillButton>
          <PillButton class="hide-md" :to="{ path: '/docs', hash: '#quickstart' }" size="sm">Get started</PillButton>
          <button
            class="nav-burger"
            type="button"
            aria-label="Menu"
            aria-controls="mobile-menu"
            :aria-expanded="mobileOpen"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon :name="mobileOpen ? 'x' : 'menu'" :size="20" />
          </button>
        </div>
      </nav>
    </div>

    <div id="mobile-menu" class="mobile-menu" :class="{ open: mobileOpen }">
      <router-link to="/">Home</router-link>
      <router-link to="/docs">Docs</router-link>
      <router-link to="/blog">Blog</router-link>
      <a :href="GITHUB" target="_blank" rel="noopener">GitHub</a>
      <router-link to="/login">Sign in</router-link>
      <router-link :to="{ path: '/docs', hash: '#quickstart' }" class="mobile-cta">Get started</router-link>
    </div>

    <div class="dash-x" aria-hidden="true"></div>
  </header>
</template>
