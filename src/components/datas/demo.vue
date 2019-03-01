<template>
    <section>
        <h1>11111111111</h1>
        <h3>自动完成输入</h3>
        <button @click="crudDataSource">修改自动完成数据源</button>
        <button @click="getComValue">获取组件值</button>
        <section  class="auto_con">
            <auto-complete :dataSource="autoDataSource" v-model="autoValue"></auto-complete>
        </section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import AutoComplete from './AutoComplete.vue'
    @Component({
        components:{
            AutoComplete
        }
    })
    export default class DataIn extends Vue{
        autoDataSource:Array<string>=['123456','abcde','abccc']
        autoValue:string=''
        mounted(){
            console.log('进入datain页面')
        }
        crudDataSource(){
            this.autoDataSource.push('12390')
        }
        getComValue(){
            console.log('输出自动输入组件值')
            console.log('this.autoValue：'+this.autoValue)
        }
    }
</script>
<style lang="scss" scoped>
    .auto_con{
        margin:10px;
        font-size: 14px;
    }
</style>