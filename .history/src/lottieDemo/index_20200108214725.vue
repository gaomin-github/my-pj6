<template>
  <section class="wrap">
    <section v-for="(item, key) in 10" :key="key" class="wrap-item">
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
.wrap {
  width: 100%;
  height: 100%;
  &-item {
    margin-top: 20px;
  }
}
.title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
}
.img {
  width: 100%;
}
</style>
