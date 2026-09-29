<script setup>
import DocsSection from './DocsSection.vue'
import Icon from '@/components/Icon.vue'
import { doc } from '@/lib/site'
import { steps } from '@/content/docs'
</script>

<template>
  <DocsSection
    id="how-it-works"
    title="How it works"
    lead="From a named target to a validated report, in five steps."
  >
    <ol class="steps">
      <li v-for="s in steps" :key="s.title">
        <h4>{{ s.title }}</h4>
        <p>{{ s.body }}</p>
      </li>
    </ol>
  </DocsSection>

  <DocsSection
    id="security"
    title="Security model"
    lead="OpenOffensive runs real security tools, so its safety model is part of the product."
  >
    <div class="callout warn">
      <p>
        <b>Authorized testing only.</b> Use it only against systems you own or have explicit, written
        permission to test. Unauthorized scanning is illegal in most jurisdictions.
      </p>
    </div>

    <div class="hl-grid">
      <article class="hl">
        <div class="ico"><Icon name="box" :size="18" /></div>
        <div>
          <h4>Throwaway containers</h4>
          <p>
            In the default Docker mode, every command runs in a single-use container that is removed
            when the run ends.
          </p>
        </div>
      </article>
      <article class="hl">
        <div class="ico"><Icon name="shield" :size="18" /></div>
        <div>
          <h4>One named target</h4>
          <p>
            Each scan has one target, and the agents are instructed to stay within it. Treat that as
            guidance, and choose the network the container runs on with care.
          </p>
        </div>
      </article>
      <article class="hl">
        <div class="ico"><Icon name="lock" :size="18" /></div>
        <div>
          <h4>Explicit authorization</h4>
          <p>
            A live URL that is not local is refused unless you confirm authorization. Repositories are
            cloned and reviewed, not tested over the network.
          </p>
        </div>
      </article>
      <article class="hl">
        <div class="ico"><Icon name="file" :size="18" /></div>
        <div>
          <h4>Findings are sensitive</h4>
          <p>
            Evidence can include credentials or personal data. Keep run output out of version control.
          </p>
        </div>
      </article>
    </div>

    <p class="small">
      Read the full
      <a :href="doc('SECURITY.md')" target="_blank" rel="noopener">security document</a>. Report a
      vulnerability in OpenOffensive itself privately to the maintainers, not in a public issue.
    </p>
  </DocsSection>
</template>
