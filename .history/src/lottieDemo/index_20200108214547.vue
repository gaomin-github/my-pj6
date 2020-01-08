<template>
  <section class="wrap">
    <section v-for="(item, key) in 10" :key="key">
      <section class="title">标题：{{ key }}</section>
      <lottie-component class="img"></lottie-component>
    </section>
  </section>
</template>
<script>
import lottieComponent from "./lottieComponent.vue";
export default {
  components: {
    lottieComponent
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
}
</style>
