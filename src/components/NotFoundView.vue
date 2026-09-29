<script setup>
import PillButton from './PillButton.vue'
</script>

<template>
  <div class="wrap">
    <section class="uc" aria-labelledby="nf-title">
      <div class="tape" aria-hidden="true"></div>
      <span class="uc-status">Error 404</span>
      <h1 id="nf-title">That page <em>doesn't exist</em></h1>
      <p>The link may be old, or the address may have a typo. The pages below are a good place to restart.</p>
      <div class="uc-actions">
        <PillButton to="/" variant="white">Back to home</PillButton>
        <PillButton to="/docs">Explore the docs</PillButton>
      </div>
    </section>
  </div>
</template>
