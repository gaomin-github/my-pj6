<template>
    <section class="wrap">
        <section v-for="(item, key) in 10" :key="key" class="wrap-item">
            <section class="title">标题：{{ key }}</section>
            <lottie-component class="img" :id="key"></lottie-component>
        </section>
    </section>
</template>
<script>
import "../v-lottie.js";

import lottieComponent from "./lottieComponent.vue";
export default {
    components: {
        lottieComponent
    },
    mounted() {
        // window.addEventListener("scroll", this.lazyLoad, true);
    },
    methods: {
        lazyLoad() {
            console.log("lazyload");
            let els = document.querySelectorAll(".lottie-wrapper");
            //   console.log(els);
            els.forEach(el => {
                console.log(el.dataset);
            });
        }
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
    border: 3px red solid;
    overflow: scroll;
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
    height: 200px;
}
</style>
