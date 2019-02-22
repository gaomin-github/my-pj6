<template>
    <section class="container">
        <transition name="model" mode="in-out">
            <section v-if="isShow" class="model">
            </section>
        </transition>
        <transition name="content" mode="out-in">
            <section v-if="isShow" class="content">
                <section class="close_icon" @click="closeModel">
                    关闭
                </section>
                <slot name="content"></slot>
            </section>
        </transition>

    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
       props:{
           isShow:Boolean,   //是否展示
       },
        methods:{
           closeModel(){
               this.$emit('close-pop-panel')
           }
        }
    })
</script>
<style lang="scss" scoped>
.model{
    position: fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.4);
}
.content{
    position:fixed;
    max-width: 80%;
    max-height: 80%;
    border-radius: 5px;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    overflow: hidden;
    background-color: rgb(255,255,255);
}
.model-enter,.model-leave-to{
    background:rgba(0,0,0,0);
}
.model-enter-to,.model-leave{
    background:rgba(0,0,0,0.4);
}
.model-enter-active,.model-leave-active{
    transition: all 1s;
}
.content-enter,.content-leave-to{
    max-width:0px;
    max-height:0px;
}
.content-enter-to,.content-leave{
    max-width:80%;
    max-height:80%;
}
.content-enter-active,.content-leave-active{
    transition: all .5s;
    transition-timing-function: ease-in-out;
}
</style>