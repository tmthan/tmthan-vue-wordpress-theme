<template>
  <div class="canvas">
    <div class="player">
      <div class="control">
        <span class="play" @click="play()" v-if="!isPlaying"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="svg"
          >
            <g data-name="Layer 2">
              <g data-name="play-circle">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                />
                <path
                  d="M12.34 7.45a1.7 1.7 0 0 0-1.85-.3 1.6 1.6 0 0 0-1 1.48v6.74a1.6 1.6 0 0 0 1 1.48 1.68 1.68 0 0 0 .69.15 1.74 1.74 0 0 0 1.16-.45L16 13.18a1.6 1.6 0 0 0 0-2.36zm-.84 7.15V9.4l2.81 2.6z"
                />
              </g>
            </g></svg
        ></span>
        <span class="pause" @click="pause()" v-if="isPlaying">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="svg"
          >
            <g data-name="Layer 2">
              <g data-name="pause-circle">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                />
                <path
                  d="M15 8a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"
                />
                <path d="M9 8a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z" />
              </g>
            </g>
          </svg>
        </span>
        <span class="next" @click="next()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="svg"
          >
            <g data-name="Layer 2">
              <g data-name="rewind-right">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M20.86 10.67l-5.1-4.21a2.1 2.1 0 0 0-2.21-.26 1.76 1.76 0 0 0-1.05 1.59v2.59L7.76 6.46a2.1 2.1 0 0 0-2.21-.26 1.76 1.76 0 0 0-1 1.59v8.42a1.76 1.76 0 0 0 1 1.59 2.23 2.23 0 0 0 .91.2 2.06 2.06 0 0 0 1.3-.46l4.74-3.92v2.59a1.76 1.76 0 0 0 1.05 1.59 2.23 2.23 0 0 0 .91.2 2.06 2.06 0 0 0 1.3-.46l5.1-4.21a1.7 1.7 0 0 0 0-2.66zM6.5 15.91V8l4.82 4zm8 0V8l4.82 4z"
                />
              </g>
            </g>
          </svg>
        </span>
      </div>
      <div class="media-player">
        <audio
          id="audio-player"
          crossOrigin="anonymous"
          :src="playingSong ? playingSong.url : ''"
          controls
        ></audio>
      </div>
    </div>
    <div class="lyric-block">
      {{ currentLyric }}
    </div>
    <div class="sakura">
      <div class="firefly1"></div>
    </div>
    <div class="sakura">
      <div class="firefly2"></div>
    </div>
    <div class="sakura">
      <div class="firefly3"></div>
    </div>
    <div class="sakura">
      <div class="firefly4"></div>
    </div>
    <div class="sakura">
      <div class="firefly5"></div>
    </div>
    <div class="sakura">
      <div class="firefly6"></div>
    </div>
    <div class="sakura">
      <div class="firefly7"></div>
    </div>
    <div class="sakura">
      <div class="firefly8"></div>
    </div>
    <div class="sakura">
      <div class="firefly9"></div>
    </div>
    <div class="sakura">
      <div class="firefly10"></div>
    </div>
    <div class="sakura">
      <div class="firefly11"></div>
    </div>
    <div class="sakura">
      <div class="firefly12"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { handleLyric, getCurrentLyric } from "../assets/HandleLyric";
import { LYRIC_PLAYLIST } from "../env/assets";

export default {
  data() {
    return {
      isPlaying: false,
      playingSong: {},
      playingSongName: "",
      currentTime: 0,
      audioElement: {},
      playlist: [],
      songIndex: 0,
      currentLyric: "",
    };
  },
  async created() {
    this.playlist = await axios.get(LYRIC_PLAYLIST).then((rs) => rs.data);
    this.playlist = this.playlist.map((item) => ({
      ...item,
      lyric: handleLyric(item.lyric),
    }));
    this.playingSong = this.playlist[this.songIndex];
  },
  mounted() {
    this.audioElement = document.getElementById("audio-player");
    this.audioElement.ontimeupdate = () => {
      this.currentTime = this.audioElement.currentTime;
      this.currentLyric = getCurrentLyric(
        this.currentTime,
        this.playingSong.lyric
      );
    };
    this.audioElement.onplaying = () => {
      this.isPlaying = true;
    };
    this.audioElement.onpause = () => {
      this.isPlaying = false;
    };
    this.audioElement.pause();
  },
  methods: {
    play() {
      this.audioElement.play();
    },
    pause() {
      this.audioElement.pause();
    },
    next() {
      if (this.songIndex < this.playlist.length - 1) {
        this.songIndex++;
        this.playingSong = this.playlist[this.songIndex];
        setTimeout(() => this.play(), 100);
      }
    },
  },
};
</script>
<style lang="css" scoped>
.canvas {
  background: #08080a
    url(https://tmthan.com/wp-content/uploads/2020/09/5-centimet-per-second.jpg)
    no-repeat;
  background-size: cover;
  background-position: bottom center;
  height: 40vh;
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
}
.canvas .player {
  position: absolute;
  left: 20px;
  top: 20px;
  color: #fff;
  width: 60px;
  height: 20px;
}
.canvas .player .control .play .svg,
.canvas .player .control .pause .svg,
.canvas .player .control .next .svg {
  fill: #fff;
  width: 20px;
  height: 20px;
}
.canvas .player .media-player {
  display: none;
}
.canvas .lyric-block {
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #fff;
}
@media only screen and (min-width: 992px) {
  .canvas {
    height: 466px;
  }
}
@-webkit-keyframes sakuras-fall {
  0% {
    top: -10%;
    transform: rotate(20deg);
  }
  100% {
    top: 100%;
    transform: rotate(-20deg);
  }
}
@-webkit-keyframes sakuras-shake {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0) rotate(30deg);
  }
  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px) rotate(200deg);
  }
}
@keyframes sakuras-fall {
  0% {
    top: -10%;
    transform: rotate(0deg);
  }
  100% {
    top: 100%;
    transform: rotate(360deg);
  }
}
@keyframes sakuras-shake {
  0%,
  100% {
    transform: translateX(0) rotate(90deg);
  }
  50% {
    transform: translateX(80px) rotate(-90deg);
  }
}
.sakura {
  position: absolute;
  top: 0;
  z-index: -999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: sakuras-fall, sakuras-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: sakuras-fall, sakuras-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}
.sakura:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s, 0s;
  animation-delay: 0s, 0s;
}
.sakura:nth-of-type(1) {
  left: 10%;
  -webkit-animation-delay: 1s, 1s;
  animation-delay: 1s, 1s;
}
.sakura:nth-of-type(2) {
  left: 20%;
  -webkit-animation-delay: 6s, 0.5s;
  animation-delay: 6s, 0.5s;
}
.sakura:nth-of-type(3) {
  left: 30%;
  -webkit-animation-delay: 4s, 2s;
  animation-delay: 4s, 2s;
}
.sakura:nth-of-type(4) {
  left: 40%;
  -webkit-animation-delay: 2s, 2s;
  animation-delay: 2s, 2s;
}
.sakura:nth-of-type(5) {
  left: 50%;
  -webkit-animation-delay: 8s, 3s;
  animation-delay: 8s, 3s;
}
.sakura:nth-of-type(6) {
  left: 60%;
  -webkit-animation-delay: 6s, 2s;
  animation-delay: 6s, 2s;
}
.sakura:nth-of-type(7) {
  left: 70%;
  -webkit-animation-delay: 2.5s, 1s;
  animation-delay: 2.5s, 1s;
}
.sakura:nth-of-type(8) {
  left: 80%;
  -webkit-animation-delay: 1s, 0s;
  animation-delay: 1s, 0s;
}
.sakura:nth-of-type(9) {
  left: 90%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
.sakura:nth-of-type(10) {
  left: 25%;
  -webkit-animation-delay: 2s, 0s;
  animation-delay: 2s, 0s;
}
.sakura:nth-of-type(11) {
  left: 65%;
  -webkit-animation-delay: 4s, 2.5s;
  animation-delay: 4s, 2.5s;
}
.firefly1 {
  width: 12px;
  height: 12px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-1.png)
    no-repeat;
  background-size: contain;
}
.firefly2 {
  width: 5px;
  height: 5px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-2.png)
    no-repeat;
  background-size: contain;
}
.firefly3 {
  width: 10px;
  height: 10px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-3.png)
    no-repeat;
  background-size: contain;
}
.firefly4 {
  width: 10px;
  height: 10px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-4.png)
    no-repeat;
  background-size: contain;
}
.firefly5 {
  width: 8px;
  height: 8px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-2.png)
    no-repeat;
  background-size: contain;
}
.firefly6 {
  width: 4px;
  height: 4px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-1.png)
    no-repeat;
  background-size: contain;
}
.firefly7 {
  width: 5px;
  height: 5px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-3.png)
    no-repeat;
  background-size: contain;
}
.firefly8 {
  width: 20px;
  height: 20px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-1.png)
    no-repeat;
  background-size: contain;
}
.firefly9 {
  width: 16px;
  height: 16px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-4.png)
    no-repeat;
  background-size: contain;
}
.firefly10 {
  width: 6px;
  height: 6px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-1.png)
    no-repeat;
  background-size: contain;
}
.firefly11 {
  width: 9px;
  height: 9px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-4.png)
    no-repeat;
  background-size: contain;
}
.firefly12 {
  width: 7px;
  height: 7px;
  background: url(https://tmthan.com/wp-content/uploads/2020/09/canh-hoa-anh-dao-4.png)
    no-repeat;
  background-size: contain;
}
/* night */
.dark .canvas {
  background: #08080a
    url(https://tmthan.com/wp-content/uploads/2020/08/mo-dom-dom.png) no-repeat;
  background-size: contain;
  background-position: center center;
  height: 466px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
@-webkit-keyframes domdom-fall {
  0% {
    top: 100%;
  }
  100% {
    top: -10%;
  }
}
@-webkit-keyframes domdom-shake {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px);
  }
}
@keyframes domdom-fall {
  0% {
    top: 100%;
  }
  100% {
    top: -10%;
  }
}
@keyframes domdom-shake {
  0%,
  100% {
    transform: translateX(80px);
  }
  50% {
    transform: translateX(0px);
  }
}
.dark .sakura {
  position: absolute;
  top: 0;
  z-index: -999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: domdom-fall, domdom-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: domdom-fall, domdom-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}
.dark .sakura:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s, 0s;
  animation-delay: 0s, 0s;
}
.dark .sakura:nth-of-type(1) {
  left: 10%;
  -webkit-animation-delay: 1s, 1s;
  animation-delay: 1s, 1s;
}
.dark .sakura:nth-of-type(2) {
  left: 20%;
  -webkit-animation-delay: 6s, 0.5s;
  animation-delay: 6s, 0.5s;
}
.dark .sakura:nth-of-type(3) {
  left: 30%;
  -webkit-animation-delay: 4s, 2s;
  animation-delay: 4s, 2s;
}
.dark .sakura:nth-of-type(4) {
  left: 40%;
  -webkit-animation-delay: 2s, 2s;
  animation-delay: 2s, 2s;
}
.dark .sakura:nth-of-type(5) {
  left: 50%;
  -webkit-animation-delay: 8s, 3s;
  animation-delay: 8s, 3s;
}
.dark .sakura:nth-of-type(6) {
  left: 60%;
  -webkit-animation-delay: 6s, 2s;
  animation-delay: 6s, 2s;
}
.dark .sakura:nth-of-type(7) {
  left: 70%;
  -webkit-animation-delay: 2.5s, 1s;
  animation-delay: 2.5s, 1s;
}
.dark .sakura:nth-of-type(8) {
  left: 80%;
  -webkit-animation-delay: 1s, 0s;
  animation-delay: 1s, 0s;
}
.dark .sakura:nth-of-type(9) {
  left: 90%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
.dark .sakura:nth-of-type(10) {
  left: 25%;
  -webkit-animation-delay: 2s, 0s;
  animation-delay: 2s, 0s;
}
.dark .sakura:nth-of-type(11) {
  left: 65%;
  -webkit-animation-delay: 4s, 2.5s;
  animation-delay: 4s, 2.5s;
}
.dark .firefly1 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 5px 0 #fff ff;
}
.dark .firefly2 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 4px 0 #fff ff;
}
.dark .firefly3 {
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 2px 0 #fff ff;
}
.dark .firefly4 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 4px 0 #fff ff;
}
.dark .firefly5 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 10px 0 #fff ff;
}
.dark .firefly6 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 3px 0 #fff ff;
}
.dark .firefly7 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 2px 0 #fff ff;
}
.dark .firefly8 {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 2px 0 #fff ff;
}
.dark .firefly9 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 16px 0 #fff ff;
}
.dark .firefly10 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 3px 0 #fff ff;
}
.dark .firefly11 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 3px 0 #fff ff;
}
.dark .firefly12 {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 9px 0 #fff ff;
}
</style>