<template>
  <div>
    <ul>
      <li v-for="post in postList" :key="post.id">
        <router-link :to="`/${post.slug}`">
          <img :src="post.jetpack_featured_media_url" />
          <h1>
            {{ post.title.rendered }}
          </h1>
          <span v-html="post.excerpt.rendered"></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "PostList",
  props: {
    postList: Array,
  },
};
</script>
<style lang="scss" scoped>
</style>