<template>
  <div class="canvas">
    <!-- <div class="sakuras" aria-hidden="true"> -->
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
    <!-- </div> -->
  </div>
</template>
<style lang="scss" scoped>
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
  box-shadow: 0 0 5px 0 #ffffffff;
}

.dark .firefly2 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 4px 0 #ffffffff;
}

.dark .firefly3 {
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 2px 0 #ffffffff;
}

.dark .firefly4 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 4px 0 #ffffffff;
}

.dark .firefly5 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 10px 0 #ffffffff;
}

.dark .firefly6 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 3px 0 #ffffffff;
}

.dark .firefly7 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 2px 0 #ffffffff;
}

.dark .firefly8 {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 2px 0 #ffffffff;
}

.dark .firefly9 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 16px 0 #ffffffff;
}

.dark .firefly10 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 3px 0 #ffffffff;
}

.dark .firefly11 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 3px 0 #ffffffff;
}

.dark .firefly12 {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #a8955b;
  box-shadow: 0 0 9px 0 #ffffffff;
}
</style>