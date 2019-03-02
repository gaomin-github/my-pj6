<template>
    <section>
        <h3>自动完成输入</h3>
        <button @click="crudDataSource">修改自动完成数据源</button>
        <button @click="getComValue">获取组件值</button>
        <button @click="updateComValue">修改组件值</button>
        <section class="auto_con">
            <auto-complete :dataSource="autoDataSource" v-model="autoValue" placeHolder="请输入用户名" leftLabel="用户名" rightLabel="ok"></auto-complete>
        </section>
        <section class="input_con">
            <Input/>
        </section>
        <input type="text" v-model="param3"/>
        <section class="area_con">
            <area-cascade></area-cascade>
        </section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import AutoComplete from './AutoComplete.vue';
    import Input from './Input.vue';
    import AreaCascade from './AreaCascader.vue';

    @Component({
        components:{
            AutoComplete,
            Input,
            AreaCascade
        }
    })
    export default class DataIn extends Vue{
        autoDataSource:Array<string>=['12357','12378','12345611111111111','abcde','abccc']
        autoValue:string='123'
        param3:string='11111'
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
        updateComValue(){
            this.autoValue='233'
            console.log(this.autoValue)
            this.param3='22222'
        }
    }
</script>
<style lang="scss" scoped>
    .auto_con{
        margin:10px;
        font-size: 14px;
        width:360px;
        height:20px;
    }
    .input_con{
        margin-top:20px;
        margin-left:10px;
    }
    .area_con{
        margin-top:10px;
    }
</style>