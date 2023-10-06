<template>
  <div class="entry">
    <Snipper v-if="!post.content.rendered.length" />
    <div class="entry-cover">
      <img
        :src="post.jetpack_featured_media_url"
        v-if="post && post.jetpack_featured_media_url"
      />
    </div>
    <header>
      <h1
        class="entry-title"
        v-if="post && post.content.rendered.length"
        v-html="post.title.rendered"
      ></h1>
      <div class="entry-date" v-if="post && post.content.rendered.length">
        {{ postDate }}
      </div>
    </header>
    <article v-html="post.content.rendered" class="entry-content"></article>
    <div class="ads">
      <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-4476478086515168"
        data-ad-slot="3808813531"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    <RelatedPost :posts="post['jetpack-related-posts']" />
    <Comment
      v-if="post && post.content.rendered.length"
      :comments="comment"
      :postId="post.id"
    />
  </div>
</template>
<script>
import axios from "axios";
import Comment from "../components/Comment";
import RelatedPost from "../components/RelatedPost";
import Snipper from "../components/Spinner";
import { config, EXCLUDE_ADS } from "../env/config";

export default {
  name: "Post",
  components: {
    Comment,
    RelatedPost,
    Snipper,
  },
  data() {
    return {
      post: {
        title: {
          rendered: "",
        },
        content: {
          rendered: "",
        },
      },
      comment: [],
      googleInit: null,
      googleAdId: "ca-pub-4476478086515168",
    };
  },
  computed: {
    postDate() {
      const date = new Date(this.post.date);
      return `${date.getDate()} tháng ${
        date.getMonth() + 1
      } năm ${date.getFullYear()}`;
    },
  },
  async created() {
    await this.init();
  },
  mounted() {
    let timeout = 500;
    if (this.timeout) timeout = this.timeout;
    if (!EXCLUDE_ADS.includes(location.pathname)) {
      this.googleInit = setTimeout(() => {
      if (typeof window !== "undefined")
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, timeout);
    }
  },
  destroyed() {
    if (this.googleInit) clearTimeout(this.googleInit);
  },
  watch: {
    async $route() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(async () => {
        this.post.content.rendered = "";
        await this.init();
      }, 500);
    },
  },
  methods: {
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    async init() {
      this.post = await this.getPost();
      document.title = this.decodeHtml(this.post.title.rendered) + " thân";
      if (this.post) {
        this.comment = await this.getComment(this.post.id);
      }
    },
    async getPost() {
      const posts = await axios.get(`${config}/posts`, {
        params: {
          slug: this.$route.params.postSlug,
        },
      });
      return posts.data[0];
    },
    async getComment(postId) {
      const comments = await axios.get(`${config}/comments`, {
        params: {
          post: postId,
        },
      });
      return comments.data;
    },
  },
};
</script>
<style lang="css" scoped>
.entry .entry-cover {
  text-align: center;
}
.entry .entry-cover img {
  height: auto;
  max-width: 100%;
  margin: 0 auto;
}
.entry .entry-date {
  font-size: 13px;
  text-align: center;
}
.entry .entry-title {
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  margin-top: 60px;
  margin-bottom: 30px;
}
.entry .entry-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 30px 15px;
  font-size: 20px;
  line-height: 1.8;
}
</style>
<style lang="css">
.entry .entry-content p,
.entry .entry-content div,
.entry .entry-content figure {
  padding: 15px 0;
  width: 100%;
}
.entry .entry-content p img,
.entry .entry-content div img,
.entry .entry-content figure img {
  max-width: calc(100vw - 30px);
  height: auto;
}
.entry .entry-content p iframe,
.entry .entry-content div iframe,
.entry .entry-content figure iframe {
  max-width: calc(100vw - 30px);
}
.entry .entry-content .wp-block-image figcaption,
.entry .entry-content .wp-block-gallery figcaption {
  font-size: 14px;
  text-align: center;
}
.entry .entry-content .wp-caption {
  max-width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.entry .entry-content .wp-caption p {
  width: 100%;
  max-width: calc(100vw - 30px);
  font-size: 14px;
}
.entry .entry-content .wp-caption.aligncenter p {
  text-align: center;
}
.entry .entry-content .wp-caption.alignleft p {
  text-align: left;
}
.entry .entry-content .wp-caption.alignright p {
  text-align: right;
}
@media only screen and (min-width: 768px) {
  .entry .entry-content p,
  .entry .entry-content div,
  .entry .entry-content figure {
    padding: 15px 0;
    width: 100%;
  }
  .entry .entry-content p img,
  .entry .entry-content div img,
  .entry .entry-content figure img {
    max-width: 80vw;
    height: auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .entry .entry-content p iframe,
  .entry .entry-content div iframe,
  .entry .entry-content figure iframe {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}

.entry .wp-block-quote {
  padding: 25px  40px;
  margin: 20px auto;
  color: #ffffff;
  border-radius: 24px;
  background: linear-gradient(to right bottom, #edb9c9, #c5a5ec);
}

.entry .wp-block-quote p {
  padding: 0;
}


.ads {
  max-width: 720px;
  margin: 20px auto;
  text-align: center;
}
</style>
