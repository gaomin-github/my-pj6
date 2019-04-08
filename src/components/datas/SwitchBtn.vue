<template>
    <section class="container" :class="btnStatus=='on'?'':'btn-inactive'" @click="switchHandle">
        <transition name="switch" ease="out-in">
            <section class="off_con" v-if="btnStatus=='off'" key="off"></section>
            <section class="on_con" v-else key="on"></section>
        </transition>
    </section>
</template>
<script lang="ts">
    //开关按钮
import {Vue,Component,Prop} from 'vue-property-decorator';
@Component({})
    export default class SwitchBtn extends Vue {
        @Prop({default:false}) ifRun!:boolean;
        btnStatus:string=this.ifRun?'on':'off';
        switchHandle(){
            this.btnStatus=this.btnStatus=='on'?'off':'on';
            this.$emit('switch',this.btnStatus)
        }
    }
</script>
<style lang="scss" scoped>
.container{
    width:60px;
    height:30px;
    display: flex;
    border-radius: 15px;
    margin-left: 20px;
    overflow-x: visible;
    align-items: center;
    justify-content: center;
    background-color: rgb(55,150,215);
    position:relative;
}
.on_con,.off_con{
    width:28px;
    height:28px;
    border-radius: 15px;
    background-color: rgb(255,255,255);
    position: absolute;
}
.on_con{
    right:0px;
}
.off_con{
    left:0px;
}
.btn-inactive{
    background-color: rgb(180,180,180);
}
.switch-enter,.switch-leave-to{
    opacity:0;
}
.switch-enter-active,.switch-leave-active{
    transition:all .1s;
}
.switch-enter-to,.switch-leave{
    opacity:1;
}

</style>