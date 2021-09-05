<template>
  <div>
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
    />
  </div>
</template>
<script>
import PostList from "../components/PostList";
import axios from "axios";
import Paginate from "vuejs-paginate";
import { config } from '../env/config';

export default {
  name: "PostPage",
  components: {
    PostList,
    Paginate,
  },
  data() {
    return {
      postList: [],
      page: 1,
      perPage: 6,
      totalPage: 1,
    };
  },
  watch: {
    async $route() {
      this.page = Number(this.$route.params.postPage);
      this.postList = await this.getPostList(this.page);
    },
  },
  async created() {
    this.page = Number(this.$route.params.postPage);
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
<style lang="scss">
.pagination {
  list-style: none;
  display: flex;  
  justify-content: center;
  li {
    display: none;
    outline: none;
    a:focus {
      outline: none;
    }
  }
  li.page-item {
    padding: 10px 20px;
    display: block;
  }
  li.page-item.active {
    background: #c0748b;
    border-radius: 6px;
    color: #fff;
  }
}
</style>
