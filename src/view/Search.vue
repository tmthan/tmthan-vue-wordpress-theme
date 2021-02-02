<template>
  <div class="search-page">
    <div class="search-info">
      <h1 class="search-name">
        Kết quả tìm kiếm:
        <PuSkeleton>{{ keyword }}</PuSkeleton>
      </h1>
      {{ posts }}
    </div>
    <PuSkeleton height="1000px" v-if="!posts.length" />
    <PostList :postList="posts" />
    <Paginate
      :page-count="totalPage"
      :page-range="4"
      :force-page="page"
      :click-handler="goToPage"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    />
  </div>
</template>
<script>
import axios from "axios";
import PostList from "../components/PostList";
import Paginate from "vuejs-paginate";

export default {
  name: "Search",
  components: {
    PostList,
    Paginate,
  },
  data() {
    return {
      keyword: "",
      posts: "",
      page: 1,
      perPage: 6,
      totalPage: 1,
    };
  },
  async created() {
    await this.init();
  },
  watch: {
    async $route() {
      await this.init();
    },
  },
  methods: {
    async init() {
      if (this.$route.query && this.$route.query.page)
        this.page = this.$route.query.page;
      if (this.$route.query && this.$route.query.q) {
          this.keyword = this.$route.query.q;
        this.posts = await this.searchPost();
      }
    },
    async searchPost() {
      const posts = await axios.get("https://tmthan.com/wp-json/wp/v2/search", {
        params: {
          search: this.keyword,
          page: this.page,
          per_page: this.perPage,
        },
      });
      this.totalPage = this.roundTotalPage(posts.headers["x-wp-total"]);
      return posts.data;
    },
    async goToPage(pageNum) {
      this.$router.push(`/search/q=${this.keyword}/page/${pageNum}`);
    },
    roundTotalPage(total) {
      if (0 == total % this.perPage) {
        return total / this.perPage;
      } else {
        return Math.round(total / this.perPage) + 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>