<template>
    <section>
        <section @click="aesGetTest">aes测试get</section>
        <section @click="aesPostTest">aes测试post</section>
        <test/>
        <router-view></router-view>
    </section>
</template>
<script src="./test.js"></script>

<style lang="scss">
ul,li,ol{
    list-style: none;
    text-decoration: none;
}
ul,li,ol,section,p,input{
    margin:0px;
    padding:0px;
    font-size: inherit;
    box-sizing: border-box;
}
</style>