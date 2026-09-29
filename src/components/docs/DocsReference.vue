<script setup>
import DocsSection from './DocsSection.vue'
import { doc } from '@/lib/site'
import { commands, exitCodes } from '@/content/docs'
</script>

<template>
  <DocsSection
    id="commands"
    title="Commands"
    lead="One command with a handful of subcommands. Every scan needs an explicit target."
  >
    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr><th>Command</th><th>What it does</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in commands" :key="c.cmd">
            <td><code>{{ c.cmd }}</code></td>
            <td>{{ c.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Exit codes</h3>
    <div class="tbl-wrap">
      <table class="tbl">
        <tbody>
          <tr v-for="e in exitCodes" :key="e.code">
            <td class="num">{{ e.code }}</td>
            <td>{{ e.meaning }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DocsSection>

  <DocsSection
    id="configuration"
    title="Configuration"
    lead="OpenOffensive reads its settings from environment variables."
  >
    <p>
      The only one you must set is <code>ANTHROPIC_API_KEY</code>. Everything else, such as the model,
      the sandbox mode, and where results are saved, is optional. The
      <a :href="doc('USAGE.md')" target="_blank" rel="noopener">usage guide</a> lists every option.
    </p>
  </DocsSection>
</template>
