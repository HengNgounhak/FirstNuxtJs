<template>
  <div class="flex xs:flex-col lg:flex-row xs:m-auto">
    <div class="nuxt-content lg:w-2/4 lg:h-screen xs:h-96 text-white lg:sticky top-0 xs:static xs:w-full bg-center bg-cover bg-no-repeat p-5" :style="{ 'background-image': 'url('+ articles[0].author.img+')'}">
        <h2>Author: {{ articles[0].author.name }}</h2>
        <p>Bio: {{ articles[0].author.bio }}</p>
    </div>
    <div class="lg:w-2/4 xs:w-full p-8">
        <p class="font-bold mb-3">Here are a list of articles by {{ articles[0].author.name }}:</p>
        <ul >
            <li v-for="article in articles" :key="article.slug">
                <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
                <div class="bg-white shadow-md border border-gray-200 hover:shadow-xl rounded-lg mb-7">
                    <div class="rounded-t-lg w-full bg-center bg-cover bg-no-repeat" :style="{ 'background-image': 'url('+article.img+'); height: 300px'}"></div>
                    <div class="p-5">
                        <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{{ article.title }}</h5>
                        <p class="font-normal text-gray-700 mb-3">by {{ article.description }}</p>
                        <p class="font-normal text-gray-700 mb-3">{{ formatDate(article.updatedAt) }}</p>
                    </div>
                </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
  export default {
    // async asyncData({ $content, params }) {
    //   const articles = await $content('articles', params.slug)
    //     .where({
    //       'author.name': {
    //         $regex: [params.author, 'i']
    //       }
    //     })
    //     .without('body')
    //     .sortBy('createdAt', 'asc')
    //     .fetch()

    //   return {
    //     articles
    //   }
    // },
    async asyncData({ store, params }) {
        await store.dispatch('anAuthor', {paramSlug: params.slug, paramsAuthor: params.author})
    },
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
        }
    },
    computed: {
        ...mapState(['articles'])
    }
  }
</script>