<script setup>
import PillButton from '@/components/PillButton.vue'
import Icon from '@/components/Icon.vue'
import { GITHUB } from '@/lib/site'
</script>

<template>
  <section class="hero-band">
    <div class="wrap">
      <div class="hero">
        <div class="hero-inner">
          <router-link class="announce" :to="{ path: '/docs', hash: '#quickstart' }">
            <span>Open source · MIT licensed · Get started in one line</span>
            <span class="dot"><Icon name="arrow" :size="20" /></span>
          </router-link>

          <h1>The AI pentester that works with your team, not just for you</h1>
          <p class="sub">
            Multi-agent AI penetration testing that runs live inside an isolated container. Every
            finding is validated from real output and delivered with a CVSS score, a proof-of-concept,
            and a fix.
          </p>

          <div class="hero-cta">
            <PillButton :href="GITHUB" variant="white" size="lg" icon="github">View on GitHub</PillButton>
            <PillButton to="/docs" variant="outline" size="lg">Explore the docs</PillButton>
          </div>
        </div>
      </div>
    </div>
    <div class="dash-x hero-rule" aria-hidden="true"></div>
    <div class="wrap"><div class="hero-corners" aria-hidden="true"></div></div>
  </section>
</template>
