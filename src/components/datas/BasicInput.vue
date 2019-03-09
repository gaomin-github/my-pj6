<template>
    <section class="container" @blur="blur" contenteditable="true" tabindex="0">
        <section class="left">
            <slot name="left"></slot>
        </section>
        <section class="content">
            <section class="in" :class="statusCode=='error'?'in_error':''">
                <!--123-->
                <input type="text" v-if="allowEdit" :value="value" ref="in"  @click="focusInput" @input="updateValue"/>
                <input type="text" v-else :value="value" @click="focusInput"  @input="updateValue" ref="in" readonly/>
            </section>
            <section class="in_icon" @click="clearInput">
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
    enum InputStatus{
        success='success',   //成功
        error='error',    //校验失败
        init='init'
    }
    let e='error'
    @Component
    export default class Input extends Vue {
        @Prop({default:''}) value!:string      //输入值
        @Prop({default:InputStatus.init}) statusCode!:InputStatus      //组件状态
        @Prop({default:true}) allowEdit!:boolean    //是否允许编辑
//        获得焦点
        focusInput(){
            this.$emit('click')
        }
//        清空输入值
        clearInput(){
            this.$emit('input','')
            this.$emit('clear')
        }
//        输入
        updateValue(event:any){
            this.$emit('input',event.target.value)
        }
//        失焦
        blur(){
            this.$emit('blur',this.value)
        }
    }
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    width:200px;
    height:30px;
}
.left{
    height:100%;
    display: flex;
    align-items: center;
}
.content{
    display: flex;
    flex: 1;
    align-items: center;
    border:1px rgb(180,180,180) solid;
    position: relative;
    .in{
        flex:1;
        min-height:5px;
        height:100%;
        input{
            width:100%;
            height:100%;
            outline:none;
            border:none;
            background: none;
            padding:0px 5px;
        }
        input:hover,input:active,input:focus{
            border:none;
            outline:none;
        }
    }
    .in_error{
        border-bottom:1px red solid;
    }
    .in_icon{
        display: flex;
        align-items: center;
        height: 100%;
        border-left:1px rgb(180,180,180) solid;
    }
    .pull_down{
        background-color: rgb(255,255,255);
        position: absolute;
        top:100%;
        width:100%;
        margin-top:5px;
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
}
</style>