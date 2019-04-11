<template>
    <section>
        <section class="demo_title" @click="enterCon('drop-down-demo')">下拉组件</section>
        <section class="demo_title" @click="enterCon('panelDemo')">面板组件</section>
        <section class="demo_title" @click="enterCon('dataDemo')">输入组件</section>
        <section class="demo_title" @click="enterCon('httpDemo')">请求组件</section>
        <section class="demo_title" @click="enterCon('toolDemo')">工具组件</section>
        <section class="demo_title" @click="enterCon('navDemo')">导航组件</section>
        <section class="demo_title" @click="aesTest">aes测试</section>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
//    import
    export default Vue.extend({
        methods:{
            enterCon:function(param:string){
                this.$router.push(param)
            },
            aesTest:function(){

            }
        }
    })
</script>
<style lang="scss" scoped>
.demo_title{
    cursor: pointer;
}
</style>