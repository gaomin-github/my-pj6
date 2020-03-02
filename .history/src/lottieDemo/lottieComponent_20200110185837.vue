<template>
    <section
        class="lottie-wrapper"
        ref="lottie"
        :class="hasImg?'':'lottie-nonimg'"
        v-lottie:loadLottieData="loadLottieData"
    >
        <!-- {{this.lottieUrl}} -->
        <lottie class="pic-img" :options="lottieOption" v-if="lottieOption" />
    </section>
</template>
<script>
import "../v-lottie.js";

export default {
  props: {
    lottieUrl: {
            required: true
        },
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
                // console.log(`id:${this.id},hasImg:${this.hasImg}`);
                import(/* webpackChunkName:"[request]"*/ '' + this.lottieUrl).then(
                    module => {
                        this.hasImg = true
                        console.log(`id:${this.id},has loaded`)
                        console.log(module)
                        this.show = true
                        this.lottieOption = {
                            animationData: module
                        }
                    },
                    fail => {
                        console.log(`id:${this.id},failed`)

                        this.loadLottieData()
                    }
                )
            }
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
