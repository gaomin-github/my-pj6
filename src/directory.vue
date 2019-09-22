<template>
    <section>
        <!-- <section class="demo_title" @click="enterCon('drop-down-demo')">下拉组件</section>
        <section class="demo_title" @click="enterCon('panelDemo')">面板组件</section>
        <section class="demo_title" @click="enterCon('dataDemo')">输入组件</section>
        <section class="demo_title" @click="enterCon('httpDemo')">请求组件</section>
        <section class="demo_title" @click="enterCon('toolDemo')">工具组件</section>
        <section class="demo_title" @click="enterCon('navDemo')">导航组件</section>
        <section class="demo_title" @click="enterCon('directDemo')">指令测试</section>-->
        <!--<section class="demo_title" @click="enterCon('directDemo2')">指令测试2</section>-->
        <!-- <section class="demo_title" @click="enterCon('vuePluginDemo')">vue插件测试</section>
        <section class="demo_title" @click="aesTest">aes测试</section>
        <h3>错误集合</h3>
        <section class="demo_title" @click="enterCon('errorPopDemo')">v-if和v-show测试</section>
        <section class="demo_title" @click="enterCon('vueFor')">vue for 错误测试</section>
        <section class="demo_title" @click="enterCon('fileDemo')">文件上传测试</section>
        <section class="demo_title" @click="enterCon('imgPickDemo')">文件上传测试</section>-->
        <section class="demo_title" @click="enterCon('fixedStyleDemo')">fixedStyle测试</section>
        <!-- <section class="demo_title" @click="enterCon('cssStyleDemo')">css测试</section> -->
        <router-link class="demo_title" :to="{path:'/drop-down-demo'}">下拉组件</router-link>
        <router-link class="demo_title" :to="{path:'/barrageDemo'}">弹幕组件</router-link>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
//    import
export default Vue.extend({
    methods: {
        enterCon: function(param: string) {
            this.$router.push(param);
        },
        aesTest: function() {}
    }
});
</script>
<style lang="scss" scoped>
.demo_title {
    cursor: pointer;
}
</style>