<template>
  <div class="comment">
    <div v-for="comment in comments" :key="comment.id">
      <template v-if="0 == comment.parent">
        <div class="comment-item" :id="`comment_${comment.id}`">
          <div class="comment-author">
            <img :src="comment.author_avatar_urls['96']" class="avatar" />
            <div class="author-info">
              <div class="author-name">
                <a v-if="comment.author_url" :href="comment.author_url">
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
          :id="`comment_${childComment.id}`"
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
        v-model="postComment.website"
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
      <div class="remember-info">
        <input type="checkbox" id="switch" v-model="rememberInfo" /><label
          for="switch"
          >Toggle</label
        >
        Ghi nhớ thông tin cho lần bình luận kế tiếp
      </div>
      <br />
      <button class="comment-button" @click="postCommentSubmit()">
        Gửi bình luận
      </button>
      <div class="comment-wait" v-show="disableComment">
        <Snipper />
        Đang gửi bình luận. Vui lòng chờ xíu nhé
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Snipper from "./Spinner";
import { config } from "../env/config";

export default {
  name: "Comment",
  components: {
    Snipper,
  },
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
        website: "",
        content: "",
      },
      disableComment: false,
      rememberInfo: false,
    };
  },
  created() {
    const commentInfoStorage = localStorage.getItem("commentInfo")
      ? JSON.parse(localStorage.getItem("commentInfo"))
      : false;
    if (commentInfoStorage) {
      this.rememberInfo = commentInfoStorage.rememberInfo;
      this.postComment.name = commentInfoStorage.name;
      this.postComment.email = commentInfoStorage.email;
      this.postComment.website = commentInfoStorage.website;
    }
  },
  watch: {
    ["postComment.name"]() {
      this.rememberInfoComment();
    },
    ["postComment.email"]() {
      this.rememberInfoComment();
    },
    ["postComment.website"]() {
      this.rememberInfoComment();
    },
    rememberInfo() {
      this.rememberInfoComment();
    },
  },
  methods: {
    replyComment(parentId, parentContent) {
      this.postComment.parentId = parentId;
      this.postComment.parentContent = parentContent;
    },
    async postCommentSubmit() {
      if (this.postComment.name && this.postComment.email) {
        this.disableComment = true;
        const rs = await axios.post(
          `${config}/comments?author_name=${
            this.postComment.name
          }&author_email=${this.postComment.email}&content=${
            this.postComment.content
          }&post=${
            this.postId
          }${this.getAuthorUrl()}${this.getParentCommentId()}`
        );
        if (rs) {
          this.disableComment = false;
          this.comments.push(rs.data);
          setTimeout(() => {
            const thisCommentElement = document.getElementById(
              `comment_${rs.data.id}`
            );
            // thisCommentElement.scrollIntoView();
            window.scrollTo(0, thisCommentElement.offsetTop + 100);
            setTimeout(() => {
              thisCommentElement.classList.add("rubberBand");
            }, 1000);
          }, 1000);
          // reset form
          this.postComment = {
            ...this.postComment,
            parentId: 0,
            parentContent: {},
            content: "",
          };
        }
      } else {
        alert("Vui lòng điền đầy đủ tên và email!");
      }
    },
    getAuthorUrl() {
      if ("" !== this.postComment.website) {
        return `&author_url=${this.postComment.website}`;
      } else return "";
    },
    getParentCommentId() {
      if (0 !== this.postComment.parentId) {
        return `&parent=${this.postComment.parentId}`;
      } else return "";
    },
    formatTime(time) {
      const timeObj = new Date(time);
      return `${timeObj.getDate()}-${
        timeObj.getMonth() + 1
      }-${timeObj.getFullYear()} ${timeObj.getHours()}:${timeObj.getMinutes()}`;
    },
    rememberInfoComment() {
      if (this.rememberInfo) {
        const commentInfo = {
          rememberInfo: this.rememberInfo,
          name: this.postComment.name || "",
          email: this.postComment.email || "",
          website: this.postComment.website || "",
        };
        localStorage.setItem("commentInfo", JSON.stringify(commentInfo));
      } else {
        if (localStorage.getItem("commentInfo")) {
          localStorage.removeItem("commentInfo");
        }
      }
    },
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
      width: calc(100% - 20px);
      padding: 10px;
      margin: 10px 0;
      background: #eee;
      border: none;
      border-radius: 10px;
      outline: none;
    }
    .remember-info {
      display: flex;
      align-items: center;
      input[type="checkbox"] {
        height: 0;
        width: 0;
        visibility: hidden;
      }

      label {
        cursor: pointer;
        text-indent: -9999px;
        width: 40px;
        height: 20px;
        background: grey;
        display: block;
        border-radius: 100px;
        position: relative;
        margin-right: 10px;
      }

      label:after {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        width: 18px;
        height: 18px;
        background: #fff;
        border-radius: 90px;
        transition: 0.3s;
      }

      input:checked + label {
        background: #bada55;
      }

      input:checked + label:after {
        left: calc(100% - 1px);
        transform: translateX(-100%);
      }

      label:active:after {
        width: 40px;
      }
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
@keyframes rubberBand {
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

.rubberBand {
  animation-name: rubberBand;
  animation-duration: 1s;
}
</style>