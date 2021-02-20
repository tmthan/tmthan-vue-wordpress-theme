<template>
<div>  
    <Spinner v-if="!postList"/>
  <ul
    class="post-list"
    v-masonry
    transition-duration="0.3s"
    item-selector=".post-item"
  >
    <li
      v-masonry-tile
      v-for="post in postList"
      :key="post.id"
      class="post-item"
      :class="{ bordered: !post.jetpack_featured_media_url }"
    >
      <router-link :to="`/${post.slug}`" class="post-link">
        <div class="post-thumbnail" v-if="post.jetpack_featured_media_url">
          <img :src="post.jetpack_featured_media_url" />
        </div>
        <h1 class="post-title" v-html="post.title.rendered"></h1>
        <div v-html="post.excerpt.rendered" class="post-description"></div>
      </router-link>
    </li>
  </ul>
</div>
</template>
<script>
import Spinner from "./Spinner";
export default {
  name: "PostList",
  components: {
    Spinner,
  },
  props: {
    postList: Array,
  },
};
</script>
<style lang="scss" scoped>
.post-list {
  list-style: none;
  .post-item {
    width: 100%;
    margin-bottom: 60px;
    &.bordered {
      border: 2px solid #727272;
      padding: 20px;
      margin-left: 20px;
      margin-right: 20px;
      width: calc(100% - 85px);
    }
    .post-link {
      text-decoration: none;
      color: #181818;
      .post-thumbnail {
        width: 100%;
        img {
          width: 100%;
          height: auto;
        }
      }
      .post-title {
        font-size: 18px;
        font-weight: 500;
        padding: 15px;
        line-height: 1.8;
      }
      .post-description {
        padding: 0px 15px 15px 15px;
        line-height: 1.8;
      }
    }
  }
}
@media only screen and (min-width: 720px) {
  .post-list {
    .post-item {
      width: calc(100% / 3 - 60px);
      margin-left: 20px;
      margin-right: 20px;
      &.bordered {
        width: calc(100% / 3 - 100px);
      }
      .post-link {
        .post-thumbnail {
          img {
          }
        }
        .post-title {
          padding: 15px 0;
        }
        .post-description {
          padding: 0;
        }
      }
    }
  }
}
</style>