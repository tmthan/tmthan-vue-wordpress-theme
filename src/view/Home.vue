<template>
  <div>
    <Snipper v-if="!postList"/>
    <PostList :postList="postList" />
    <Paginate
      :page-count="totalPage"
      :page-range="4"
      :force-page="page"
      :click-handler="goToPage"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      v-if="postList"
    />
  </div>
</template>
<script>
import PostList from "../components/PostList";
import axios from "axios";
import Paginate from "vuejs-paginate";
import Snipper from "../components/Spinner";

export default {
  name: "Home",
  components: {
    PostList,
    Paginate,
    Snipper,
  },
  data() {
    return {
      postList: [],
      page: 1,
      perPage: 6,
      totalPage: 1,
    };
  },
  async created() {
    document.title = 'thân - Em ngày nào thật hiền';
    this.postList = await this.getPostList(this.page);
  },
  methods: {
    async getPostList(page) {
      axios
        .get(
          `https://tmthan.com/wp-json/wp/v2/posts?page=${page}&per_page=${this.perPage}`
        )
        .then((response) => {
          this.postList = response.data;
          this.totalPage = this.roundTotalPage(response.headers["x-wp-total"]);
          this.page = page;
        })
        .catch((e) => {
          throw e;
        });
    },
    async goToPage(pageNum) {
      this.$router.push(`/page/${pageNum}`);
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