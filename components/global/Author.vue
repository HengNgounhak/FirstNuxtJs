<template>
    <NuxtLink :to="`/blog/author/${author.name}`">
        <div class="bg-white shadow-md border border-gray-200 hover:shadow-xl rounded-lg mb-7">
            <div class="rounded-t-lg w-full bg-center bg-cover bg-no-repeat" :style="{ 'background-image': 'url('+author.img+'); height: 200px'}"></div>
            <div class="p-5">
                <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">Author</h5>
                <p class="font-normal text-gray-700 mb-3">by {{ author.name }}</p>
                <p class="font-normal text-gray-700 mb-3">{{ author.bio }}</p>
            </div>
        </div>
    </NuxtLink>
</template>
<script>
  export default {
    props: {
      author: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
img{
    max-width: 200px;
}
</style>