<template>
    <NuxtLink :to="`/blog/author/${author.name}`">
        <img :src="require(`~/assets/images/${author.image}`)" />
        <div>
            <h4>Author</h4>
            <p>{{ author.name }}</p>
            <p>{{ author.bio }}</p>
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