<template>
  <div class="category-page">
    <header class="category-info">
      <h1 class="category-name">
        {{ category.name }}
      </h1>
      <p class="category-description">
        {{ category.description }}
      </p>
    </header>
    <Spinner v-if="!posts.length" />
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
      v-if="posts.length"
    />
  </div>
</template>
<script>
import axios from "axios";
import PostList from "../components/PostList";
import Paginate from "vuejs-paginate";
import Spinner from "../components/Spinner";
import { config } from "../env/config";

export default {
  name: "Category",
  data() {
    return {
      category: {},
      posts: [],
      page: 1,
      perPage: 6,
      totalPage: 1,
    };
  },
  components: {
    PostList,
    Paginate,
    Spinner,
  },
  watch: {
    async $route() {
      await this.init();
    },
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      this.category = await this.getCategory();
      document.title = `${this.category.name} - thân`;
      if (this.category) {
        this.posts = await this.getPost(this.page);
      }
    },
    async getCategory() {
      const category = await axios.get(
        `${config}/categories`,
        {
          params: {
            slug: this.$route.params.categorySlug,
          },
        }
      );
      return category.data[0];
    },
    async getPost(page) {
      const posts = await axios.get(`${config}/posts`, {
        params: {
          categories: this.category.id,
          page: this.page,
          per_page: this.perPage,
        },
      });
      this.totalPage = this.roundTotalPage(posts.headers["x-wp-total"]);
      this.page = page;
      return posts.data;
    },
    async goToPage(pageNum) {
      this.$router.push(
        `/category/${this.$route.params.categorySlug}/page/${pageNum}`
      );
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
.category-page {
  .category-info {
    background: #eee;
    border-radius: 20px;
    padding: 30px;
    margin: 20px;
    .category-name {
      font-size: 28px;
      font-weight: 500;
    }
    .category-description {
      line-height: 1.8;
      padding-top: 20px;
    }
  }
}
@media only screen and (min-width: 720px) {
  .category-page {
    .category-info {
      width: fit-content;
      min-width: 300px;
      .category-name {
      }
      .category-description {
      }
    }
  }
}
</style>