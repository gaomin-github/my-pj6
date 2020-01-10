<template>
    <section>
        <section @click="aesGetTest">aes测试get</section>
        <section @click="aesPostTest">aes测试post</section>
        <test />
        <router-view></router-view>
    </section>
</template>
<script>
// import test from './test.vue';
// import {aesRequestPost,aesRequestGet} from './test/aesRequest.js';
export default {
    components: {
        // test
    },
    methods: {
        aesGetTest() {
            // console.log('aes get test');
            // aesRequestGet().then((result)=>{
            //     console.log(result);
            //     console.log('aes gettest end');
            // });
        },
        aesPostTest() {
            // console.log('aes post test');
            // aesRequestPost().then(result=>{
            //     console.log(result);
            //     console.log('aes posttest end');
            // });
        }
    }
};
</script>
<style>
ul,
li,
ol {
    list-style: none;
    text-decoration: none;
}
ul,
li,
ol,
section,
p,
input {
    margin: 0px;
    padding: 0px;
    font-size: inherit;
    box-sizing: border-box;
}
</style>