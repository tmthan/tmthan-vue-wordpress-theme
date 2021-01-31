<template>
  <div class="comment">
    <div v-for="comment in comments" :key="comment.id">
      <template v-if="0 == comment.parent">
        <div class="comment-item">
          <div class="comment-author">
            <img :src="comment.author_avatar_urls['96']" class="avatar" />
            <div class="author-info">
              <div class="author-name">
                <a
                  v-if="comment.author_url"
                  :href="comment.author_url"
                >
                  {{ comment.author_name }}
                </a>
                <template v-else> {{ comment.author_name }}</template>
              </div>
              <div class="comment-date">
                {{ formatTime(comment.date) }}
              </div>
            </div>
          </div>
          <div v-html="comment.content.rendered" class="comment-content"></div>

          <a
            href="#comment-form"
            @click="replyComment(comment.id, comment)"
            class="comment-reply"
          >
            Trả lời
          </a>
        </div>
        <div
          v-for="childComment in comments"
          :key="childComment.id"
          class="comment-child"
        >
          <template v-if="childComment.parent === comment.id">
            <div class="comment-author">
              <img
                :src="childComment.author_avatar_urls['96']"
                class="avatar"
              />
              <div class="author-info">
                <div class="author-name">
                  <a
                    v-if="childComment.author_url"
                    :href="childComment.author_url"
                  >
                    {{ childComment.author_name }}
                  </a>
                  <template v-else> {{ childComment.author_name }}</template>
                </div>
                <div class="comment-date">
                  {{ formatTime(childComment.date) }}
                </div>
              </div>
            </div>
            <div
              v-html="childComment.content.rendered"
              class="comment-content"
            ></div>
          </template>
        </div>
      </template>
    </div>
    <div id="comment-form">
      <div v-if="0 !== postComment.parentId">
        Đang trả lời:
        <span>{{ postComment.parentContent.author_name }}</span>
      </div>
      <br />
      <input
        v-model="postComment.name"
        placeholder="Tên"
        class="comment-input"
      />
      <br />
      <input
        type="email"
        v-model="postComment.email"
        placeholder="Email"
        class="comment-input"
      />
      <br />
      <input
        v-model="postComment.url"
        placeholder="Trang web"
        class="comment-input"
      />
      <br />
      <textarea
        v-model="postComment.content"
        placeholder="Nội dung bình luận"
        class="comment-input"
      ></textarea>
      <br />
      <button class="comment-button" @click="postCommentSubmit()">
        Gửi bình luận
      </button>
      <div class="comment-wait" v-show="disableComment">
        Đang gửi bình luận. Vui lòng chờ xíu nhé
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Comment",
  props: {
    comments: Array,
    postId: Number,
  },
  data() {
    return {
      postComment: {
        parentId: 0,
        parentContent: {},
        name: "",
        email: "",
        url: "",
        content: "",
      },
      disableComment: false,
    };
  },
  methods: {
    replyComment(parentId, parentContent) {
      this.postComment.parentId = parentId;
      this.postComment.parentContent = parentContent;
    },
    async postCommentSubmit() {
      this.disableComment = true;
      const rs = await axios.post(
        `https://tmthan.com/wp-json/wp/v2/comments?author_name=${
          this.postComment.name
        }&author_email=${this.postComment.email}&content=${
          this.postComment.content
        }&post=${this.postId}${this.getAuthorUrl()}${this.getParentCommentId()}`
      );
      if (rs) {
        this.disableComment = false;
        this.comments.push(rs.data);
        // reset form
        this.postComment = {
          parentId: 0,
          parentContent: {},
          name: "",
          email: "",
          url: "",
          content: "",
        };
      }
    },
    getAuthorUrl() {
      if ("" !== this.postComment.url) {
        return `&author_url=${this.postComment.url}`;
      } else return "";
    },
    getParentCommentId() {
      if (0 !== this.postComment.parentId) {
        return `&parent=${this.postComment.parentId}`;
      } else return "";
    },
    formatTime(time) {
      const timeObj = new Date(time);
      return `${timeObj.getDate()}-${timeObj.getMonth() + 1}-${timeObj.getFullYear()} ${timeObj.getHours()}:${timeObj.getMinutes()}`;
    }
  },
};
</script>
<style lang="scss" scoped>
.comment {
  max-width: 720px;
  margin: 50px auto;
  padding: 0 30px;
  .comment-item {
    margin-bottom: 30px;
    .comment-author {
      display: flex;
      flex-wrap: wrap;
      .avatar {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
      .author-info {
        padding: 10px 20px 15px 15px;
        .author-name {
          font-weight: bold;
          font-size: 20px;
          a {
            text-decoration: none;
            color: #181818;
          }
        }
        .comment-date {
          font-size: 14px;
          margin-top: 5px;
          color: #aaa;
        }
      }
    }
  }
  .comment-content {
    font-size: 16px;
    margin-left: 70px;
    color: #727272;
    line-height: 1.8;
    margin-bottom: 20px;
  }
  .comment-reply {
    text-decoration: none;
    font-size: 16px;
    color: #181818;
    margin-left: 70px;
  }
  .comment-child {
    margin-left: 70px;
    .comment-author {
      display: flex;
      flex-wrap: wrap;
      .avatar {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
      .author-info {
        padding: 10px 20px 15px 15px;
        .author-name {
          font-weight: bold;
          font-size: 20px;
          a {
            text-decoration: none;
            color: #181818;
          }
        }
        .comment-date {
          font-size: 14px;
          margin-top: 5px;
          color: #aaa;
        }
      }
    }
    .comment-content {
      font-size: 16px;
      margin-left: 70px;
      color: #727272;
      line-height: 1.8;
      margin-bottom: 20px;
    }
  }
  #comment-form {
    position: relative;
    .comment-input {
      width: 95%;
      padding: 10px;
      margin: 10px 0;
      background: #eee;
      border: none;
      border-radius: 10px;
      outline: none;
    }
    .comment-button {
      border: none;
      border-radius: 8px;
      outline: none;
      background-color: #c0748b;
      color: #fff;
      padding: 10px;
      cursor: pointer;
    }
    .comment-wait {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: #000000cc;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
    }
  }
}
</style>