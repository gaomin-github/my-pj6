<template>
    <section class="container">
        <section class="on_con"></section>
        <section class="off_con"></section>
    </section>
</template>
<script lang="ts">
    //开关按钮
import {Vue,Component,Prop} from 'vue-property-decorator';
@Component({})
    export default class Switch extends Vue {
        @Prop({default:false})ifRun!:boolean;

    }
</script>
<style lang="scss" scoped>
.contaienr{
    width:100px;
    height:30px;
    border:1px black solid;
}
    .on_con,.off_con{

    }
</style>