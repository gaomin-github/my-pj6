<template>
    <section class="container">
        <input type="text" class="auto"/>
        <!--<section class="auto">11</section>-->
        <section class="clear">清除</section>
    </section>
</template>
<script lang="ts">
//根据设置的数据源自动录入
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class AutoComplete extends Vue{
        @Prop({default:[]}) dataSource!:Array<string>
        mounted(){
            console.log('dataSource')
            console.log(this.dataSource)
        }
    }
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: row;
    width:260px;
    height:30px;
    border:1px rgb(180,180,180) solid;
    align-items: center;
    padding-left: 5px;
    padding-right:5px;
}
.container:focus{
    border:1px rgb(40,180,220) solid;
}
.auto{
    flex:1;
    height:90%;
    border:none;
    outline:none;
    display: block;
}
.auto:focus{
    border:1px rgb(40,180,220) solid;
}
.clear{
    display: block;
    cursor: pointer;
    height:90%;
    margin-left: 5px;
    border-let:1px rgb(180,180,180) solid;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>