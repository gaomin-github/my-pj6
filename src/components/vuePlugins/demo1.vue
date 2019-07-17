<template>
    <section class="con">
        <ul>
            <li v-for="item in  50">
                this is {{item}} index data
            </li>
        </ul>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mounted(){
            document.addEventListener('scroll',function(){
                console.log('scroll-----------page');
            })
        }
    })
</script>
<style lang="scss" scoped>
    .con{
        li{
            line-height: 40px;
        }
    }
</style>