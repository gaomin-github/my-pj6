<template>
    <section class="container">
        <h5>进度条组件</h5>
        <step/>
    </section>
</template>
<script lang="ts">
    //开关按钮
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import Step from './Step.vue';
    @Component({
        components:{
            Step
        }
    })
    export default class NavDemo extends Vue {

    }
</script>
<style lang="scss" scoped>

</style>