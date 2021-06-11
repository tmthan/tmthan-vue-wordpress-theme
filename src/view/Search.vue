<template>
  <div class="search-page">
    <h1 class="label">Tìm kiếm</h1>
    <form class="input-group" @submit="search">
      <input class="input" v-model="keyword" />
      <button class="submit" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="width: 30px; height: 30px; margin: 0 10px"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="search">
              <rect width="24" height="24" opacity="0" />
              <path
                d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
              />
            </g>
          </g>
        </svg>
      </button>
    </form>
    <div class="search-result">
      <li v-for="post in posts" :key="post.id" class="search-result-item">
        <router-link :to="post.url" class="post-link" v-html="post.title">
        </router-link>
      </li>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { config } from '../env/config';

export default {
  name: "Search",
  components: {},
  data() {
    return {
      keyword: "",
      posts: "",
    };
  },
  async created() {
    document.title = "Tìm kiếm - thân";
  },
  watch: {},
  methods: {
    async search(event) {
      event.preventDefault();
      const posts = await axios.get(`${config}/search`, {
        params: {
          search: this.keyword,
        },
      });
      this.posts = posts.data.map((item) => ({
        id: item.id,
        title: item.title,
        url: new URL(item.url).pathname,
      }));
      console.log(this.posts);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-page {
  padding: 10px;
  .label {
    text-align: center;
  }
  .input-group {
    max-width: 720px;
    border-radius: 30px;
    padding: 10px;
    background: #eee;
    position: relative;
    margin: 20px auto;
    .input {
      outline: none;
      width: 100%;
      text-align: center;
      font-size: 20px;
      border: none;
      background: transparent;
    }
    .submit {
      border: none;
      outline: none;
      position: absolute;
      right: -6px;
      top: 6px;
      background: transparent;
      cursor: pointer;
    }
  }
  .search-result {
    max-width: 720px;
    margin: 0 auto;
    list-style: none;
    .search-result-item {
      padding: 10px;
      &:hover {
        background: #f7d9d9;
      }
      .post-link {
        color: #333;
        text-decoration: none;
        padding: 10px 0;
        width: 100%;
      }
    }
  }
}
</style>