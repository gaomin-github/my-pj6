<template>
    <section @click="conClick">
        <h4>自动完成输入</h4>
        <!--<button @click="crudDataSource">修改自动完成数据源</button>-->
        <!--<button @click="getComValue">获取组件值</button>-->
        <!--<button @click="updateComValue">修改组件值</button>-->
        <!--<h4>自动填充组件</h4>-->
        <!--<section class="auto_con">-->
            <!--<auto-complete :dataSource="autoDataSource" v-model="autoValue" placeHolder="请输入用户名" leftLabel="用户名" rightLabel="ok" :allowEdit="false"></auto-complete>-->
            <!--<auto-complete :dataSource="autoDataSource" v-model="basicValue" placeHolder="请输入邮箱" leftLabel="用户名" rightLabel="ok"></auto-complete>-->
        <!--</section>-->
        <!--<h4>基本输入组件</h4>-->
        <!--<section class="input_con">-->
            <!--<basic-input v-model="basicValue" statusCode="error">-->
                <!--<section slot="left">-->
                    <!--电话号码-->
                <!--</section>-->
                <!--<section slot="right">-->
                    <!--右标签-->
                <!--</section>-->
                <!--<section slot="top">-->

                <!--</section>-->
                <!--<section slot="down">-->
                    <!--下方弹出内容-->
                <!--</section>-->
            <!--</basic-input>-->
        <!--</section>-->
        <h4>省市联动组件</h4>
        <section class="area_con">
            <area-cascade class="area" :value="areaValue"></area-cascade>
        </section>
        <!--<h4>日期选择</h4>-->
        <!--<date-picker class="date_con" v-model="datePickerValue" ></date-picker>-->
        <!--<h4>双日期选择</h4>-->
    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import AutoComplete from './AutoComplete.vue';
    import BasicInput from './BasicInput.vue';
    import AreaCascade from './AreaCascader.vue';
    import datePicker from './DatePicker.vue';
    @Component({
        components:{
            AutoComplete,
            BasicInput,
            AreaCascade,
            datePicker,
        }
    })
    export default class DataIn extends Vue{
        autoDataSource:Array<string>=['12357','12378','12345611111111111','abcde','abccc','张三','张三树','知否']
        autoValue:string='123'
        basicValue:string='111'
        param3:string='11111'
        areaValue='陕西省-西安市'
        datePickerValue='2019-03-15'
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
        conClick(){
            console.log('container click')
        }
        basicClick(){
            console.log('basic click')
        }
    }
</script>
<style lang="scss" scoped>
    .auto_con{
        margin:10px;
        font-size: 14px;
        width:360px;
        height:40px;
    }
    .input_con{
        margin-top:20px;
        margin-left:10px;
        font-size: 14px;
    }
    .area_con{
        margin-top:10px;
        .area{
            width:280px;
        }
    }
    .date_con{
        margin-left: 10px;
    }
</style>