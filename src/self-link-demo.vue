<template>
    <section class="container">
        <!-- <self-router-link :to="{path:'/paneldemo'}">self router link test</self-router-link> -->
        <button @click="urlStep">router step</button>
    </section>
</template>
<script>
export default {
    name: "self-link-demo",
    methods: {
        urlStep() {
            // console.table(this.$selfrouter);
            this.$selfrouter.push("/paneldemo");
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    height: 200px;
    width: 100%;
    border: 3px #c3c3c3 solid;
}
</style>