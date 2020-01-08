<template>
  <section class="wrap">
    <section v-for="(item, key) in 10" :key="key">
      <lottie-component></lottie-component>
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
<style lang="scss" scoped></style>
