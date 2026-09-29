<script setup>
import PillButton from '@/components/PillButton.vue'
import InstallTerminal from '@/components/InstallTerminal.vue'
import { GITHUB, INSTALL_CMD } from '@/lib/site'

const lines = [{ text: INSTALL_CMD }, { text: 'openoffensive serve ./path/to/source', dim: true }]
</script>

<template>
  <div class="wrap">
    <section class="uc" aria-labelledby="uc-title">
      <div class="tape" aria-hidden="true"></div>
      <span class="uc-status" role="status">Under construction</span>
      <h1 id="uc-title">Sign in is <em>coming soon</em></h1>
      <p>
        The OpenOffensive console is an invite-only beta, and sign-in is not open yet. This page will
        host it when it is ready. Nothing here collects or stores anything.
      </p>

      <form class="uc-form" aria-label="Sign-in form preview, disabled" @submit.prevent>
        <fieldset disabled>
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@company.com" autocomplete="off" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" placeholder="Password" autocomplete="off" />
          </label>
          <button type="submit" class="pill pill-white">Sign in</button>
        </fieldset>
      </form>

      <div class="uc-actions">
        <PillButton :href="GITHUB" variant="white" icon="github">Follow progress on GitHub</PillButton>
        <PillButton to="/">Back to home</PillButton>
      </div>

      <div class="uc-divider" aria-hidden="true"></div>
      <p class="uc-fine">In the meantime, everything runs from the open-source repo:</p>
      <InstallTerminal :lines="lines" :copy="INSTALL_CMD" flush />
    </section>
  </div>
</template>
