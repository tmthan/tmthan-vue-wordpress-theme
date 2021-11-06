<template>
  <div>
    <Spinner v-if="!postList" />
    <main
      class="post-list"
      v-masonry
      transition-duration="0.3s"
      item-selector=".post-item"
    >
      <article
        v-masonry-tile
        v-for="(post, index) in postList"
        :key="post.id"
        class="post-item"
        :class="{
          bordered: !post.jetpack_featured_media_url,
          'post-item-special': index === 1,
        }"
      >
        <router-link :to="`/${post.slug}`" class="post-link">
          <div class="post-thumbnail" v-if="post.jetpack_featured_media_url">
            <img :src="post.jetpack_featured_media_url" />
          </div>
          <h2 class="post-title" v-html="post.title.rendered"></h2>
          <div v-html="post.excerpt.rendered" class="post-description"></div>
        </router-link>
      </article>
    </main>
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
<style lang="css" scoped>
.post-list {
  list-style: none;
  padding-top: 30px;
}
.post-list .post-item {
  width: 100%;
  margin-bottom: 60px;
  transition: 0.3s;
}

.post-list .post-item:hover {
  transform: scale(1.1);
}

.post-list .post-item:hover img {
  filter: blur(2px);
}

@media only screen and (min-width: 720px) {
  .post-list .post-item-special {
    margin-top: 70px;
  }
}

.post-list .post-item.bordered {
  border: 2px solid #727272;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 85px);
}
.post-list .post-item .post-link {
  text-decoration: none;
  color: #181818;
}
.post-list .post-item .post-link .post-thumbnail {
  width: 100%;
  position: relative;
}
.post-list .post-item .post-link .post-thumbnail::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 2px);
  transition: 0.5s;
  background: linear-gradient(to bottom right, #89c9ce, #d297d9);
  opacity: 0;
}
.post-list .post-item:hover .post-link .post-thumbnail::after {
  opacity: 0.5;
}
.post-list .post-item .post-link .post-thumbnail img {
  width: 100%;
  height: auto;
}
.post-list .post-item .post-link .post-title {
  font-size: 18px;
  font-weight: 500;
  padding: 15px;
  line-height: 1.8;
}
.post-list .post-item .post-link .post-description {
  padding: 0px 15px;
  line-height: 1.8;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
@media only screen and (min-width: 720px) {
  .post-list .post-item {
    width: calc(100% / 3 - 80px);
    margin-left: 40px;
    margin-right: 40px;
  }

  .post-list .post-item.bordered {
    width: calc(100% / 3 - 130px);
    margin-left: 40px;
    margin-right: 40px;
    transition: 0.3s;
    position: relative;
  }
  .post-list .post-item.bordered:hover {
    border: none;
    border-radius: 10px;
    overflow: hidden;
  }
  .post-list .post-item.bordered:hover a {
    color: #fff;
  }
  .post-list .post-item.bordered::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to right, #be93c5, #7bc6cc);
    opacity: 0;
  }

  .post-list .post-item.bordered:hover::after {
    opacity: 1;
    z-index: -1;
  }
  .post-list .post-item .post-link .post-title {
    padding: 15px 0;
  }
  .post-list .post-item .post-link .post-description {
    padding: 0;
  }
}
</style>