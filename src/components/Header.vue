<template>
  <header class="nav-bar" id="nav_bar" :class="{ hide: hideMenu }">
    <div class="container">
      <div class="site-brand">
        <h1 class="site-name">
          <router-link :to="'/'">thân</router-link>
        </h1>
        <p class="site-description">Em ngày nào thật hiền</p>
      </div>
      <div class="search-icon">
        <router-link to="/search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="width: 30px; height: 30px; margin: 0 10px"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="search">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                />
              </g>
            </g>
          </svg>
        </router-link>
      </div>
      <div class="site-navigation">
        <div id="toggle-menu" :class="{ open: openMenu }" @click="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav class="nav" :class="{ show: openMenu }">
          <ul class="menu">
            <li class="menu-item">
              <router-link :to="'/category/cuoc-song'">Cuộc sống</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="'/category/tan-van'">Tản văn</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="'/category/linh-tinh'">Linh tinh</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="'/category/sach'">Sách</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="'/category/truyen-ngan'"
                >Truyện ngắn</router-link
              >
            </li>
            <li class="menu-item">
              <router-link :to="'/category/suu-tam'">Sưu tầm</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="'/category/goc-nhin'">Góc nhìn</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      openMenu: false,
      searchKeyword: "",
      hideMenu: false,
    };
  },
  watch: {
    $route() {
      this.openMenu = false;
    },
  },
  mounted() {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      if (lastScroll - scroll > 0) {
        this.hideMenu = false;
        lastScroll = scroll;
      } else {
        this.hideMenu = true;
        lastScroll = scroll;
      }
    });
  },
  methods: {
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
    search(event) {
      event.preventDefault();
      this.$router.push(`/search?q=${this.searchKeyword}`);
    },
  },
};
</script>
<style lang="css" scoped>
.nav-bar {
  width: calc(100vw + 1px);
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  z-index: 100;
  transition: all 0.3s linear;
  top: 0px;
}
.nav-bar.hide {
  top: -90px;
}
.nav-bar .container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  position: relative;
}
.nav-bar .container .site-brand .site-name a {
  text-decoration: none;
  font-size: 26px;
  color: #42414e;
  background: -webkit-linear-gradient(
    right,
    #96b6cc,
    #89c9ce,
    #e3e0e2,
    #d297d9,
    #b1a2ce
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nav-bar .container .site-brand .site-description {
  margin-top: 10px;
  color: #828089;
  font-size: 14px;
}
.nav-bar .container .search-icon {
  position: absolute;
  right: 50px;
}
.nav-bar .container .site-navigation #toggle-menu {
  width: 24px;
  height: 24px;
  position: relative;
  margin: 10px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}
.nav-bar .container .site-navigation #toggle-menu span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #181818;
  border-radius: 0px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}
.nav-bar .container .site-navigation #toggle-menu span:nth-child(1) {
  top: 0px;
}
.nav-bar .container .site-navigation #toggle-menu span:nth-child(2),
.nav-bar .container .site-navigation #toggle-menu span:nth-child(3) {
  top: 11px;
}
.nav-bar .container .site-navigation #toggle-menu span:nth-child(4) {
  top: 22px;
}
.nav-bar .container .site-navigation #toggle-menu.open span:nth-child(1) {
  top: 11px;
  width: 0%;
  left: 50%;
}
.nav-bar .container .site-navigation #toggle-menu.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.nav-bar .container .site-navigation #toggle-menu.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.nav-bar .container .site-navigation #toggle-menu.open span:nth-child(4) {
  top: 11px;
  width: 0%;
  left: 50%;
}
.nav-bar .container .site-navigation .nav {
  display: none;
  animation-duration: 0.3s;
  animation-name: fadeOutUp;
}
.nav-bar .container .site-navigation .nav.show {
  display: block;
  position: absolute;
  width: calc(100% + 2px);
  height: calc(100vh - 78px);
  right: -1px;
  top: 79px;
  z-index: 1;
  background: #fff;
  animation-name: fadeInDown;
  animation-duration: 0.3s;
}
.nav-bar .container .site-navigation .nav.show .menu {
  list-style: none;
}
.nav-bar .container .site-navigation .nav.show .menu .menu-item {
  padding: 10px;
  border-top: 1px solid #efeff0;
}
.nav-bar .container .site-navigation .nav.show .menu .menu-item a {
  color: #181818;
  text-decoration: none;
}
.nav-bar .container .site-navigation .nav.show .menu .menu-item:hover > a {
  color: #a8a8ad;
}
@media only screen and (min-width: 768px) {
  .nav-bar .container .site-navigation {
    display: flex;
  }
  .nav-bar .container .site-navigation #toggle-menu {
    order: 2;
  }
  .nav-bar .container .site-navigation .nav {
    order: 1;
  }
  .nav-bar .container .site-navigation .nav.show {
    position: relative;
    width: auto;
    height: auto;
    right: auto;
    top: auto;
    animation-name: fadeInRight;
    background: transparent;
    margin-right: 40px;
  }
  .nav-bar .container .site-navigation .nav.show .menu {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .nav-bar .container .site-navigation .nav.show .menu .menu-item {
    border: none;
    font-size: 15px;
  }
  .nav-bar .container .site-navigation .nav.show .menu .menu-item a {
    color: #181818;
  }
  .nav-bar .container .site-navigation .nav.show .menu .menu-item a:hover {
    color: #a8a8ad;
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>