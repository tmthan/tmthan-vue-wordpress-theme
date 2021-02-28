<template>
    <div class="entry">
        <Snipper v-if="!post.content.rendered.length" />
        <div class="entry-cover">
            <img :src="post.jetpack_featured_media_url" v-if="post && post.jetpack_featured_media_url" />
        </div>
        <h1 class="entry-title" v-if="post && post.content.rendered.length" v-html="post.title.rendered"></h1>
        <div class="entry-date" v-if="post && post.content.rendered.length">
            {{ postDate }}
        </div>
        <div v-html="post.content.rendered" class="entry-content"></div>
        <RelatedPost :posts="post['jetpack-related-posts']" />
        <Comment v-if="post && post.content.rendered.length" :comments="comment" :postId="post.id" />
    </div>
</template>
<script>
import axios from 'axios';
import Comment from '../components/Comment';
import RelatedPost from '../components/RelatedPost';
import Snipper from '../components/Spinner';

export default {
    name: 'Post',
    components: {
        Comment,
        RelatedPost,
        Snipper,
    },
    data() {
        return {
            post: {
                title: {
                    rendered: '',
                },
                content: {
                    rendered: '',
                },
            },
            comment: [],
        };
    },
    computed: {
        postDate() {
            const date = new Date(this.post.date);
            return `${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
        },
    },
    async created() {
        await this.init();
    },
    watch: {
        async $route() {
            if (!this.$route.hash) {
                await this.init();
                // scroll to top
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0;
            }
        },
    },
    methods: {
        async init() {
            this.post = await this.getPost();
            document.title =
                this.post.title.rendered
                    .replace('&#8220;', '"')
                    .replace('&#8221;', '"')
                    .replace('&#38;', '&') + ' thân';
            if (this.post) {
                this.comment = await this.getComment(this.post.id);
            }
        },
        async getPost() {
            const posts = await axios.get('https://tmthan.com/wp-json/wp/v2/posts', {
                params: {
                    slug: this.$route.params.postSlug,
                },
            });
            return posts.data[0];
        },
        async getComment(postId) {
            const comments = await axios.get('https://tmthan.com/wp-json/wp/v2/comments', {
                params: {
                    post: postId,
                },
            });
            return comments.data;
        },
    },
};
</script>
<style lang="scss" scoped>
.entry {
    .entry-cover {
        text-align: center;
        img {
            height: auto;
            max-width: 100%;
            margin: 0 auto;
        }
    }
    .entry-date {
        font-size: 13px;
        text-align: center;
    }
    .entry-title {
        text-align: center;
        font-size: 36px;
        font-weight: 500;
        margin-top: 60px;
        margin-bottom: 30px;
    }
    .entry-content {
        max-width: 720px;
        margin: 0 auto;
        padding: 30px 15px;
        font-size: 20px;
        line-height: 1.8;
    }
}
</style>
<style lang="scss">
.entry {
    .entry-content {
        p,
        div,
        figure {
            padding: 15px 0;
            width: 100%;
            img {
                max-width: calc(100vw - 30px);
                height: auto;
            }
            iframe {
                max-width: calc(100vw - 30px);
            }
        }
    }
}
@media only screen and (min-width: 768px) {
    .entry {
        .entry-content {
            p,
            div,
            figure {
                padding: 15px 0;
                width: 100%;
                img {
                    max-width: 80vw;
                    height: auto;
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                }
                iframe {
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
}
</style>
