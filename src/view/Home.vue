<template>
  <div>
    <Snipper v-if="!postList" />
    <Canvas />
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
import Canvas from "../components/Canvas";
import { config } from "../env/config";

export default {
  name: "Home",
  components: {
    PostList,
    Paginate,
    Snipper,
    Canvas,
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
    document.title = "thân - Em ngày nào thật hiền";
    this.postList = await this.getPostList(this.page);
  },
  methods: {
    async getPostList(page) {
      axios
        .get(
          `${config}/posts?page=${page}&per_page=${this.perPage}`
        )
        .then((response) => {
          this.postList = response.data;
          this.totalPage = Number(response.headers["x-wp-totalpages"]);
          this.page = page;
        })
        .catch((e) => {
          throw e;
        });
    },
    async goToPage(pageNum) {
      this.$router.push(`/page/${pageNum}`);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
