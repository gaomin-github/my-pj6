<template>
    <section>
        <img-picker :value="imgList"></img-picker>
    </section>
</template>
<script>
import imgPicker from "./img-picker.vue";
export default {
    name: "file-demo",
    components: {
        imgPicker
    },
    data() {
        return {
            imgList: [
                {
                    title: "add.jpg",
                    result: require("./imgs/add.jpg")
                },
                {
                    title: "cancel.jpg",
                    result: require("./imgs/cancel.jpg")
                },
                {
                    title: "add.jpg",
                    result: require("./imgs/loading.png")
                }
            ]
        };
    }
};
</script>
<style lang="scss">
</style>