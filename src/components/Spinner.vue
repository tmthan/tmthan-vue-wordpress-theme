<template>
  <div class="loading">
    <img :src="waitingIcon" alt="Lâu quá..." />
  </div>
</template>
<script>
import { WAITING_ICON_URL } from "../env/assets";
export default {
  data() {
    return {
      waitingIcon: WAITING_ICON_URL,
    };
  },
};
</script>

<style lang="css" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 1;
}
</style>