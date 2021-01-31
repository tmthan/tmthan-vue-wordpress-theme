<template>
    <div class="related-post">
        <div v-for="(post, index) in posts" :key="post.id" class="post-item">
            <router-link :to="postLink(post.url)" v-if="index < 3">
                <img :src="post.img.src">
                <h3>{{ post.title }}</h3>
                <div>{{ post.date }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "RelatedPost",
    props: {
        posts: Array,
    },
    methods: {
        postLink(url) {
            const urlArray = url.split('/');
            return urlArray[urlArray.length - 2];
        }
    }
}
</script>
<style lang="scss" scoped>
.related-post {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: hidden;
    .post-item {
        width: 30%;
        a {
            text-decoration: none;
            color: #181818;
            font-size: 14px;
            img {
                max-width: 100%;
                height: auto;
            }
            h3 {
                font-size: 16px;
                padding: 10px 0;
            }
        }
    }
}
@media only screen and(min-width: 720px) {
    .related-post {
    .post-item {
        width: calc(30% - 20px);        
    }
}
}
</style>