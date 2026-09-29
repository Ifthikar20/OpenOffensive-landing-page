<script setup>
import DocsSection from './DocsSection.vue'
import InstallTerminal from '@/components/InstallTerminal.vue'
import PillButton from '@/components/PillButton.vue'
import { GITHUB, DOCS, ISSUES, LICENSE_URL, CLONE_CMD, doc } from '@/lib/site'

const devLines = [
  { text: CLONE_CMD },
  { text: "cd open-offensive && pip install -e '.[llm,dev]'" },
  { text: 'make test' },
]
</script>

<template>
  <DocsSection
    id="contributing"
    title="Contributing and license"
    lead="The test suite runs offline, so you can contribute without Docker or a model key."
  >
    <InstallTerminal :lines="devLines" flush />
    <ul>
      <li>
        To add a capability, start with
        <a :href="doc('EXTENDING.md')" target="_blank" rel="noopener">the extending guide</a>.
      </li>
      <li>Open an <a :href="ISSUES" target="_blank" rel="noopener">issue</a> for bugs and feature ideas.</li>
      <li>
        Released under the <a :href="LICENSE_URL" target="_blank" rel="noopener">MIT License</a>. The
        security tools bundled in the sandbox image keep their own upstream licenses.
      </li>
    </ul>
  </DocsSection>

  <DocsSection
    id="full-documentation"
    title="Full documentation"
    lead="Deeper documentation lives with the code."
  >
    <div class="doclist">
      <a class="doc" :href="doc('USAGE.md')" target="_blank" rel="noopener">
        <b>Usage guide</b>
        <span>Requirements, installation, every command option, and all settings.</span>
      </a>
      <a class="doc" :href="doc('SECURITY.md')" target="_blank" rel="noopener">
        <b>Security</b>
        <span>The isolation model, authorized use, and how to handle findings.</span>
      </a>
    </div>
    <div class="card-actions">
      <PillButton :href="DOCS" variant="white" size="sm" icon="book">Browse all docs on GitHub</PillButton>
      <PillButton :href="GITHUB" size="sm" icon="github">View on GitHub</PillButton>
    </div>
  </DocsSection>
</template>
