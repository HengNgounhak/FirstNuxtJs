<template>
  <!-- <article>
    <nuxt-content :document="article" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
  </article> -->
  <article class="nuxt-content">
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img :alt="article.alt" :src="require(`~/assets/images/${article.img}`)"/>
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />
    <!-- <nav>
      <ul>
        <li v-for="link of article.toc" :key="link.id" >
          <NuxtLink :to="`#${link.id}`" :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </nav> -->

    <Author :author="article.author" />

    <prev-next :prev="prev" :next="next" />

    <app-search-input/>

  </article>
  <!-- <article>
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <img :src="require(`~/assets/images/${article.img}`)" :alt="article.alt" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

    <nuxt-content :document="article" />

    <Author :author="article.author" />
  </article> -->
</template>
<script>
import AppSearchInput from '../../components/AppSearchInput.vue'
import Author from '../../components/global/Author.vue'
import PrevNext from '../../components/PrevNext.vue'
  export default {
  components: { Author, PrevNext, AppSearchInput },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
    .only(['title', 'slug'])
    .sortBy('createdAt', 'asc')
    .surround(params.slug)
    .fetch()

    return {
      article,
      prev,
      next
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
<style>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
  }
    .nuxt-content p {
    margin-bottom: 20px;
  }
</style>