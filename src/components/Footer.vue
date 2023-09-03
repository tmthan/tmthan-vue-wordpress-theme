<template>
  <footer class="footer">
    Made with
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="width: 24px; height: 24px; margin: 0 10px"
      viewBox="0 0 24 24"
      class="heart"
    >
      <g data-name="Layer 2">
        <g data-name="heart">
          <rect width="24" height="24" opacity="0" />
          <path
            fill="currentColor"
            d="M12 21a1 1 0 0 1-.71-.29l-7.77-7.78a5.26 5.26 0 0 1 0-7.4 5.24 5.24 0 0 1 7.4 0L12 6.61l1.08-1.08a5.24 5.24 0 0 1 7.4 0 5.26 5.26 0 0 1 0 7.4l-7.77 7.78A1 1 0 0 1 12 21zM7.22 6a3.2 3.2 0 0 0-2.28.94 3.24 3.24 0 0 0 0 4.57L12 18.58l7.06-7.07a3.24 3.24 0 0 0 0-4.57 3.32 3.32 0 0 0-4.56 0l-1.79 1.8a1 1 0 0 1-1.42 0L9.5 6.94A3.2 3.2 0 0 0 7.22 6z"
          />
        </g>
      </g>
    </svg>
    since 2015
    <div class="scroll-top" :class="{ hide: hideButton }" @click="scrollToTop">
      Lên đầu trang
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style="height: 20px; width: 20px; margin-left: 10px"
      >
        <g data-name="Layer 2">
          <g data-name="arrow-forward">
            <rect
              width="24"
              height="24"
              transform="rotate(-90 12 12)"
              opacity="0"
            />
            <path
              d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"
            />
          </g>
        </g>
      </svg>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      hideButton: true,
    };
  },
  mounted() {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      if (lastScroll - scroll > 0 && scroll > window.innerWidth) {
        this.hideButton = false;
        lastScroll = scroll;
      } else {
        this.hideButton = true;
        lastScroll = scroll;
      }
    });
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
<style lang="css" scoped>
.scroll-top {
  position: fixed;
  cursor: pointer;
  right: -54px;
  bottom: 15vh;
  transform: rotate(-90deg);
  background: #fff 3;
  transition: all 0.2s linear;
  padding: 10px;
  display: flex;
  backdrop-filter: blur(3px);
}
.scroll-top.hide {
  right: -95px;
}
.footer {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

@keyframes scale-infinity {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.footer .heart {
  color: #c0748b;
  animation: scale-infinity 1s ease infinite;
}
</style>
