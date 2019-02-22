<template>
    <section>
        <h1>main block test</h1>
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
ul,li,ol,section,p{
    margin:0px;
    padding:0px;
}
</style>