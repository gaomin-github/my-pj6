<template>
  <section class="directory-wrapper">
    <section class="demo_title" @click="enterCon('drop-down-demo')">
      下拉组件
    </section>
    <section class="demo_title" @click="enterCon('panelDemo')">
      面板组件
    </section>
    <section class="demo_title" @click="enterCon('dataDemo')">输入组件</section>
    <!-- <section class="demo_title" @click="enterCon('httpDemo')">请求组件</section> -->
    <section class="demo_title" @click="enterCon('toolDemo')">工具组件</section>
    <!-- <section class="demo_title" @click="enterCon('navDemo')">导航组件</section> -->
    <!-- <section class="demo_title" @click="enterCon('directDemo')">
      指令测试
    </section> -->
    <!--<section class="demo_title" @click="enterCon('directDemo2')">指令测试2</section>-->
    <!-- <section class="demo_title" @click="enterCon('vuePluginDemo')">vue插件测试</section>
        <section class="demo_title" @click="aesTest">aes测试</section>
        <section class="demo_title" @click="enterCon('elevatorDemo')">elevator测试</section>
        <h3>错误集合</h3>
        <section class="demo_title" @click="enterCon('errorPopDemo')">v-if和v-show测试</section>
        <section class="demo_title" @click="enterCon('vueFor')">vue for 错误测试</section>
        <section class="demo_title" @click="enterCon('fileDemo')">文件上传测试</section>
        <section class="demo_title" @click="enterCon('imgPickDemo')">文件上传测试</section>-->
    <!-- <section class="demo_title" @click="enterCon('fixedStyleDemo')">
      fixedStyle测试
    </section> -->
    <!-- <section class="demo_title" @click="enterCon('cssStyleDemo')">css测试</section> -->
    <!-- <section class="demo_title">
      <router-link :to="{ path: '/drop-down-demo' }">下拉组件</router-link>
    </section> -->
    <!-- <section class="demo_title">
      <router-link class="demo_title" :to="{ path: '/barrageDemo' }"
        >弹幕测试</router-link
      >
    </section> -->
    <section class="demo_title">
      <router-link class="demo_title" :to="{ path: '/danmuDemo' }"
        >弹幕测试第二版</router-link
      >
    </section>
    <!-- <section class="demo_title">
      <router-link class="demo_title" :to="{ path: '/asyncDemo' }"
        >async测试</router-link
      >
    </section>
    <section class="demo_title">
      <router-link class="demo_title" :to="{ path: '/elevatorDemo' }"
        >elevator测试</router-link
      >
    </section>
    <section class="demo_title">
      <router-link class="demo_title" :to="{ path: '/lottieDemo' }"
        >lottie测试</router-link
      >
    </section> -->
  </section>
</template>
<script lang="ts">
import Vue from "vue";
//    import
export default Vue.extend({
<<<<<<< HEAD
    methods: {
        enterCon: function(param: string) {
            this.$router.push(param);
        },
        aesTest: function() {}
    }
=======
  methods: {
    enterCon: function(param: string) {
      console.log(`param:${param}`);
      this.$router.push(param);
    },
    aesTest: function() {}
  }
>>>>>>> 3f327b9fed00b6a98a368da9bae7486ebf136364
});
</script>
<style lang="scss" scoped>
.directory-wrapper {
  /* width: 100%; */
  height: 100%;
  /* display: flex;
  flex-direction: column; */
  /* border: 6px red solid; */
}
.demo_title {
<<<<<<< HEAD
  /* flex-shrink: 1; */
  display: block;
  cursor: pointer;
  line-height: 30px;
  font-size: 18px;
  color: rgb(233, 233, 233);
  margin: 5px 10px;
  padding: 5px 10px;
  background: rgb(62, 116, 200);
  a {
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    color: rgb(233, 233, 233);
  }
  a:hover,
  a:visited {
    text-decoration: none;
    color: rgb(233, 233, 233);
  }
=======
<<<<<<< HEAD
    cursor: pointer;
=======
  cursor: pointer;
>>>>>>> 3f327b9fed00b6a98a368da9bae7486ebf136364
>>>>>>> c0bc8562d6f85fcf46f500e72e31de68a84d7a3d
}
</style>
