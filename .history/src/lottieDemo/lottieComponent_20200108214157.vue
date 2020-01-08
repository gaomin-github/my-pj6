<template>
  <section :hasImg="hasImg" class="lottie-wrapper"></section>
</template>
<script>
export default {
  data() {
    return {
      hasImg: false
    };
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
