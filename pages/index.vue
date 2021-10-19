<template>
  <div class="p-10 m-auto max-w-5xl">
    <div class="flex justify-between mb-8">
      <h1 class="text-4xl font-bold">Blog Posts</h1>
      <app-search-input/>
    </div>
    <ul>
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <div class="bg-white shadow-md border border-gray-200 hover:shadow-xl rounded-lg mb-7">
              <div class="rounded-t-lg w-full bg-center bg-cover bg-no-repeat" :style="{ 'background-image': 'url('+article.img+'); height: 300px'}"></div>
              <div class="p-5">
                <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{{ article.title }}</h5>
                <p class="font-normal text-gray-700 mb-3">by {{ article.author.name }}</p>
                <p class="font-normal text-gray-700 mb-3">{{ article.description }}</p>
              </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
import AppSearchInput from '../components/AppSearchInput.vue'
  export default {
    components: { AppSearchInput },
    async asyncData({ $content, params }) {
      const articles = await $content('articles')
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
<style>
    ul{
      list-style: none;
    }
    a {
        text-decoration: none;
        color: black;
    }
    img{
      max-width: 50%;
    }
</style>