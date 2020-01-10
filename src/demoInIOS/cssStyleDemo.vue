<template>
    <section class="css-style-demo">
        <h3>css-2：0.5px问题-1px</h3>
        <section class="full-decimal-block"></section>
        <h3>css-2：0.5px问题-0.5px</h3>
        <section class="decimal-block"></section>
        <h3>css-3：background-attachment问题</h3>
        <h3>css-4：光标高度</h3>
        <section class="cursor-block">
            <input type="text" />
        </section>
        <h3>css-6：search自带close按钮</h3>
        <input type="search" />
        <input type="button" value="input button" />
        <button>button component</button>
    </section>
</template>
<script>
export default {
    name: "css-stylel-demo",
    data() {
        return {};
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
input {
    border-radius: 0px;
    // -webkit-appearance: none;
}
button {
    -webkit-appearance: none;
}
.full-decimal-block {
    height: 1px;
    background-color: rgb(0, 0, 0);
}
.decimal-block {
    height: 0.5px;
    background-color: rgb(0, 0, 0);
}
// .css-style-demo{

// }
.cursor-block {
    height: 60px;
    input {
        height: 46px;
        line-height: 46px;
        padding: 10px 0px;
        border: 1px #e3e3e3 solid;
    }
}
input[type="search"] {
    height: 40px;
    width: 120px;
    -webkit-appearance: none;
}
</style>