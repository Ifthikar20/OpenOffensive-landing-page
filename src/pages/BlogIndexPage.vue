<script setup>
import { posts } from '@/lib/posts'
</script>

<template>
  <div class="wrap">
    <section class="page-head">
      <div class="eyebrow">Blog</div>
      <h1 class="page-title">Notes from the <em>agents</em></h1>
      <p class="page-lead">
        Announcements, engineering deep-dives, and practical guides on autonomous AI penetration
        testing.
      </p>
    </section>

    <section class="posts">
      <router-link v-for="p in posts" :key="p.slug" class="post-card" :to="`/blog/${p.slug}`">
        <span class="post-tag">{{ p.tag }}</span>
        <h3>{{ p.title }}</h3>
        <p>{{ p.excerpt }}</p>
        <div class="post-meta">
          <time :datetime="p.dateISO">{{ p.date }}</time> · {{ p.readingTime }}
        </div>
        <div class="post-more">Read more →</div>
      </router-link>
    </section>
  </div>
</template>
