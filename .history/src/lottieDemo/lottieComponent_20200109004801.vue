<template>
  <section class="lottie-wrapper" v-lottie:loadImg="loadImg">
    lottie wrapper
  </section>
</template>
<script>
import "../v-lottie.js";

export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      hasImg: false
    };
  },
  methods: {
    loadImg() {
      if (!this.hasImg) {
        this.hasImg = true;
        console.log(`hasImg:${this.hasImg}`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  display: block;
  box-sizing: border-box;
}
.lottie-wrapper {
  width: 100%;
  height: 100%;
  background: #3e3e3e;
}
</style>
