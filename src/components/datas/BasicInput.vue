<template>
    <section class="container" @click="focusInput">
        <section class="left">
            <slot name="left"></slot>
        </section>
        <section class="content">
            <section class="in">
                <!--123-->
                <input type="text" :value="basicValue" @input="updateValue" ref="in"/>
            </section>
            <section class="in_icon" @click="clearValue">
                清空
            </section>
        </section>
        <section class="right">
            <slot name="right"></slot>
        </section>
    </section>
</template>
<script lang="ts">
//    有格式校验的输入框
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class Input extends Vue {
        @Prop({default:null}) checkPattern!:RegExp
        @Prop({default:''}) basicValue!:string
        satus:string=''     //输入框状态码，可设置为枚举状态
        mounted(){

        }
        focusInput(){
            let inputEle:any=this.$refs['in']
            inputEle.focus()
        }
        updateValue(event:any){
            this.$emit('input',event.target.value)
        }
        clearValue(){
            this.$emit('input','')
        }
    }
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    width:300px;
    height:30px;
}
.left{
    height:100%;
    display: flex;
    align-items: center;
    margin-right:5px;
}
.content{
    display: flex;
    flex: 1;
    align-items: center;
    .in{
        flex:1;
        min-height:5px;
        input{
            width:100%;
            height:100%;
            border:none;
            outline:none;
        }
        input:hover,input:active,input:focus{
            border:none;
            outline:none;
        }
    }
    border:1px rgb(180,180,180) solid;

    .in_icon{
        display: flex;
        align-items: center;
        height: 100%;
    }
}
.content:hover,.content:active,.content:focus{
    border:1px rgb(30,150,230) solid;
}
.content-error{
    border:1px red solid;
}
.right{
    height:100%;
    display: flex;
    align-items: center;
    margin-left:5px;
}
</style>