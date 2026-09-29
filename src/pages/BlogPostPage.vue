<script setup>
import { computed } from 'vue'
import { bySlug } from '@/lib/posts'
import { postComponents } from '@/lib/postComponents'
import NotFoundView from '@/components/NotFoundView.vue'

const props = defineProps({ slug: { type: String, required: true } })
const post = computed(() => bySlug(props.slug))
const Body = computed(() => postComponents[props.slug])
</script>

<template>
  <div v-if="post" class="wrap">
    <article class="article">
      <router-link class="back" to="/blog">← All posts</router-link>
      <div class="article-head">
        <span class="post-tag">{{ post.tag }}</span>
        <h1>{{ post.title }}</h1>
        <div class="article-meta">
          <time :datetime="post.dateISO">{{ post.date }}</time> · {{ post.readingTime }} · OpenOffensive
          Team
        </div>
      </div>
      <div class="article-body">
        <component :is="Body" />
      </div>
    </article>
  </div>
  <NotFoundView v-else />
</template>
