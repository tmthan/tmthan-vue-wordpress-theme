<template>
    <div class="blog">
        <Header />
        <div class="container">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: 'App',
    components: {
        Header,
        Footer,
    },
};
</script>

<style lang="scss" scoped>
.blog {
    background: #fff;
    overflow: hidden;
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: 100px;
    }
}
</style>
