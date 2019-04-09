<template>
    <section class="container">
        <!--<section class="step_item" v-for="(item,key) in dataSource" :key="key">-->
           <!--<section class="step_key">{{key}}</section>-->
            <!--<section class="step_label">-->
                <!--{{item.label}}-->
            <!--</section>-->
        <!--</section>-->
        <section class="step_key"><span>1</span>1</section>
    </section>
</template>
<script lang="ts">
    //开关按钮
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component({})
    export default class Step extends Vue {
        dataSource:Array<Object>=[
            {
                id:1,
                label:'步骤1',
                value:'01'
            },{
                id:1,
                label:'步骤2',
                value:'02'
            },{
                id:1,
                label:'步骤3',
                value:'03'
            }]
    }
</script>
<style lang="scss" scoped>
    .container{
        /*width:60px;*/
        /*height:30px;*/
        margin-left: 20px;
    }
    .step_key{
        width:30px;
        height:30px;
        float:left;
        /*border-radius: 15px;*/
        border:1px rgb(50,50,50) solid;
        text-align: center;
        vertical-align: bottom;
        /*line-height: 30px;*/
        /*position: absolute;*/
    }
</style>