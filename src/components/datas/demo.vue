<template>
    <section>
        <h1>11111111111</h1>
        <h3>自动完成输入</h3>
        <section  class="auto_con">
            <auto-complete :dataSource="autoDataSource"></auto-complete>
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
        autoDataSource=['123456','abcde','abccc']
        mounted(){
            console.log('进入datain页面')
        }
    }
</script>
<style lang="scss" scoped>
    .auto_con{
        margin-left:10px;
        font-size: 14px;
    }
</style>