<template>
    <section>
        <!--<test/>-->
        <router-view></router-view>
    </section>
</template>
<script>
    import test from './test.vue';

export default({
    components:{
        test
    }
})
</script>
<style lang="scss">
ul,li,ol{
    list-style: none;
    text-decoration: none;
}
ul,li,ol,section,p,input{
    margin:0px;
    padding:0px;
    font-size: inherit;
}
</style>