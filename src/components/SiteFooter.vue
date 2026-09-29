<script setup>
import BrandMark from './BrandMark.vue'
import Icon from './Icon.vue'
import { GITHUB, DOCS, ISSUES, doc } from '@/lib/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="dash-x" aria-hidden="true"></div>
    <div class="wrap">
      <div class="foot-top">
        <div class="foot-brand">
          <BrandMark />
          <p class="foot-tag">
            The open-source AI pentester. Autonomous agents that find, validate, and help you fix
            real vulnerabilities.
          </p>
          <div class="foot-social">
            <a :href="GITHUB" aria-label="OpenOffensive on GitHub" target="_blank" rel="noopener">
              <Icon name="github" :size="19" />
            </a>
          </div>
        </div>

        <div class="foot-cols">
          <div class="foot-col">
            <h4>Product</h4>
            <router-link :to="{ path: '/docs', hash: '#quickstart' }">Quickstart</router-link>
            <router-link :to="{ path: '/docs', hash: '#how-it-works' }">How it works</router-link>
            <router-link to="/docs">Documentation</router-link>
            <router-link to="/login">Sign in</router-link>
          </div>
          <div class="foot-col">
            <h4>Resources</h4>
            <router-link to="/blog">Blog</router-link>
            <a :href="DOCS" target="_blank" rel="noopener">Full documentation</a>
            <a :href="doc('USAGE.md')" target="_blank" rel="noopener">Usage guide</a>
          </div>
          <div class="foot-col">
            <h4>Project</h4>
            <a :href="GITHUB" target="_blank" rel="noopener">GitHub</a>
            <a :href="ISSUES" target="_blank" rel="noopener">Issues</a>
            <a :href="doc('SECURITY.md')" target="_blank" rel="noopener">Security</a>
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a>
          </div>
        </div>
      </div>

      <div class="foot-bottom">
        <span>© {{ year }} OpenOffensive · MIT licensed</span>
        <span>Authorized targets only.</span>
      </div>
    </div>
  </footer>
</template>
