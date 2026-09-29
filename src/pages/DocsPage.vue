<script setup>
import PillButton from '@/components/PillButton.vue'
import DocsOverview from '@/components/docs/DocsOverview.vue'
import DocsConcepts from '@/components/docs/DocsConcepts.vue'
import DocsReference from '@/components/docs/DocsReference.vue'
import DocsProject from '@/components/docs/DocsProject.vue'
import { GITHUB } from '@/lib/site'
import { useActiveSection } from '@/lib/useActiveSection'

// Sidebar groups. The order here must match the order the sections render in.
const nav = [
  {
    label: 'Getting started',
    items: [
      ['overview', 'Overview'],
      ['quickstart', 'Quickstart'],
      ['features', 'Features'],
    ],
  },
  {
    label: 'Concepts',
    items: [
      ['how-it-works', 'How it works'],
      ['security', 'Security model'],
    ],
  },
  {
    label: 'Reference',
    items: [
      ['commands', 'Commands'],
      ['configuration', 'Configuration'],
    ],
  },
  {
    label: 'Project',
    items: [
      ['contributing', 'Contributing and license'],
      ['full-documentation', 'Full documentation'],
    ],
  },
]
const active = useActiveSection(nav.flatMap((g) => g.items.map(([id]) => id)))
</script>

<template>
  <div class="wrap">
    <header class="docs-head">
      <nav class="crumbs" aria-label="Breadcrumb">
        <router-link to="/">Home</router-link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Docs</span>
      </nav>
      <h1>Documentation</h1>
      <p class="lead">
        An introduction to OpenOffensive: what it does, how to get started, and how it keeps testing
        safe.
      </p>
    </header>

    <div class="docs-layout">
      <aside class="docs-toc" aria-label="Documentation navigation">
        <div v-for="g in nav" :key="g.label" class="toc-group">
          <h4>{{ g.label }}</h4>
          <router-link
            v-for="[id, label] in g.items"
            :key="id"
            :to="{ hash: `#${id}` }"
            :class="{ active: active === id }"
          >
            {{ label }}
          </router-link>
        </div>
        <div class="toc-cta">
          <PillButton :href="GITHUB" variant="white" size="sm" icon="github">Open on GitHub</PillButton>
        </div>
      </aside>

      <div class="docs-main">
        <DocsOverview />
        <DocsConcepts />
        <DocsReference />
        <DocsProject />
      </div>
    </div>
  </div>
</template>
