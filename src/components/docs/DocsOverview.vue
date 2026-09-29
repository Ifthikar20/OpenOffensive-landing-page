<script setup>
import PillButton from '@/components/PillButton.vue'
import InstallTerminal from '@/components/InstallTerminal.vue'
import Icon from '@/components/Icon.vue'
import DocsSection from './DocsSection.vue'
import { GITHUB, GITHUB_REPO, DOCS, ISSUES, INSTALL_CMD } from '@/lib/site'
import { VERSION, features } from '@/content/docs'

const installLines = [{ text: INSTALL_CMD }]
const runLines = [
  { text: 'export ANTHROPIC_API_KEY="your-api-key"' },
  { text: 'openoffensive scan https://github.com/org/repo' },
]
</script>

<template>
  <DocsSection id="overview" title="Overview">
    <div class="docs-card">
      <div class="docs-card-head">
        <span class="card-path"><Icon name="github" :size="16" /> github.com/<b>{{ GITHUB_REPO }}</b></span>
        <span class="badge accent">v{{ VERSION }} · beta</span>
      </div>
      <p class="card-desc">
        OpenOffensive is an open-source, multi-agent AI pentester. Each scan runs in an isolated
        container, and every finding is validated from real output and delivered with a severity, a
        CVSS score, evidence, a proof-of-concept, and a fix.
      </p>
      <div class="badges">
        <span class="badge">MIT license</span>
        <span class="badge">Python 3.9+</span>
        <span class="badge">SARIF output</span>
      </div>
      <div class="card-actions">
        <PillButton :href="GITHUB" variant="white" size="sm" icon="github">View on GitHub</PillButton>
        <PillButton :href="DOCS" size="sm" icon="book">Full documentation</PillButton>
        <PillButton :href="ISSUES" size="sm" icon="issue">Issues</PillButton>
      </div>
    </div>
  </DocsSection>

  <DocsSection
    id="quickstart"
    title="Quickstart"
    lead="You need Python 3.9 or newer and an Anthropic API key. Docker is optional and adds container isolation."
  >
    <h3>1. Install the CLI</h3>
    <InstallTerminal :lines="installLines" flush />
    <p class="small">
      The installer prefers <code>pipx</code> and falls back to <code>pip --user</code>. To read it
      before running it, open
      <a :href="`${GITHUB}/blob/HEAD/install.sh`" target="_blank" rel="noopener">install.sh</a>.
    </p>

    <h3>2. Run your first scan</h3>
    <InstallTerminal :lines="runLines" flush />

    <div class="callout">
      <p>
        <b>A model key is required.</b> A real model drives every agent. Without a reachable model a
        scan stops at preflight. It never falls back to canned or demo output.
      </p>
    </div>
  </DocsSection>

  <DocsSection id="features" title="Features" lead="What a single scan gives you.">
    <div class="hl-grid">
      <article v-for="f in features" :key="f.title" class="hl">
        <div class="ico"><Icon :name="f.icon" :size="18" /></div>
        <div>
          <h4>{{ f.title }}</h4>
          <p>{{ f.body }}</p>
        </div>
      </article>
    </div>
  </DocsSection>
</template>
