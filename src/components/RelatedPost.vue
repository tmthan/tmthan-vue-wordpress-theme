<template>
    <div class="related-post">
        <div v-for="post in posts" :key="post.id" class="post-item">
            <router-link :to="postLink(post.url)">
                <img :src="post.img.src">
                <h3>{{ post.title }}</h3>
                <p v-if="'' === post.img.src" class="post-description">
                    {{ post.excerpt }}
                </p>
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
        width: calc(50% - 20px);
        margin-top: 20px;
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
                font-weight: 500;
            }
            .post-description {
                line-height: 1.8;
                margin-bottom: 10px;
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