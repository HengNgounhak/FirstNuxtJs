<template>
  <article class="nuxt-content flex xs:flex-col lg:flex-row xs:m-auto">
    <div class="lg:w-2/4 lg:h-screen xs:max-h-100 text-white lg:sticky top-0 xs:static xs:w-full bg-center bg-cover bg-no-repeat p-5" :style="{ 'background-image': 'url('+article.img+')'}">
      <div class="flex justify-between mb-8">
        <nuxt-link to="/"><h1 class="text-white text-4xl font-bold">Blog Posts</h1></nuxt-link>
        <app-search-input/>
      </div>
      <p style="margin-top: 80px">{{ formatDate(article.updatedAt) }} . {{ article.author.name }}</p>
      <h1 class="text-8xl font-bold" >{{ article.title }}</h1>
    </div>
    <div class="lg:w-2/4 xs:w-full p-8">
      <h1 class="text-3xl font-bold mb-2">{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
      <nuxt-content class="mt-3 mb-8" :document="article" />
      <Author :author="article.author" />
      <prev-next :prev="prev" :next="next" />
    </div>

  </article>
</template>
<script>
import AppSearchInput from '../../components/AppSearchInput.vue'
import Author from '../../components/global/Author.vue'
import PrevNext from '../../components/PrevNext.vue'
import { mapState } from 'vuex'

  export default {
  components: { Author, PrevNext, AppSearchInput },
  // async asyncData({ $content, params }) {
  //   const article = await $content('articles', params.slug).fetch()

  //   const [prev, next] = await $content('articles')
  //   .only(['title', 'slug'])
  //   .sortBy('createdAt', 'asc')
  //   .surround(params.slug)
  //   .fetch()

  //   return {
  //     article,
  //     prev,
  //     next
  //   }
  // },
  async fetch({ store, params }) {
    await store.dispatch('anArticle', {paramSlug: params.slug});
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },
  computed:{
    ...mapState(['article', 'prev', 'next'])
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
   
</style>