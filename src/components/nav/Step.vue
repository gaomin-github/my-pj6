<template>
    <section class="container">
        <section v-for="(item,key) in dataSource" :key="key">
            {{item.label}}
        </section>
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
        width:60px;
        height:30px;
    }
</style>