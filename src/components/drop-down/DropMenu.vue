<template>
    <section class="container">
        <section class="menu_title" @click="switchMenuStatus">
            <slot name="menu_title"></slot>
        </section>
        <transition @beforeEnter="beforeEnter" @enter="enter" @beforeLeave="beforeLeave">
            <section v-if="menuStatus" class="menu_content" :class="dir=='horizental'?'menu_content-horizental':''">
                <slot name="menu_content"></slot>
            </section>
        </transition>
    </section>
</template>
<script lang="ts">
    //    问题1：ts变量类型和vue props变量类型冲突？
    import Vue from 'vue';
    export default Vue.extend({
        props:{
            dir:String, //弹出菜单方向
            duration:Number,    //动画时间
        },
        data:function():{
            menuStatus:boolean,
            transitionS:string,
        }{
            return{
                menuStatus:false,
                transitionS:'ms height',
            }
        },
        methods:{
            switchMenuStatus:function(){
                this.menuStatus=!this.menuStatus
//            console.log('switchMenuStatus')
            },
            beforeEnter:function(el:any){
                el.style.height=0;
                el.style.transition=this.duration+this.transitionS
            },
            enter:function(el:any){
//            console.log('el.scrollHeight：'+el.scrollHeight)
                el.style.height=el.scrollHeight+'px';
            },
            beforeLeave:function(el:any){
                el.style.transition=this.duration+this.transitionS
                el.style.height=0
            }
        }
    })
</script>
<style scoped lang="scss">
    .container{
        position: relative;
    }
    .menu_title{
        cursor: pointer;
    }
    .menu_content{
        overflow-y: hidden;
    }
    .menu_content-horizental{
        position: absolute;
        left:100%;
        top:0px;
        white-space: nowrap;
    }
</style>