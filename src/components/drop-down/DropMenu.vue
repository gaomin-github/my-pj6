<template>
    <section class="container">
        <section class="menu_title" @click="switchMenuStatus">
            <slot name="menu_title"></slot>
        </section>
        <transition @beforeEnter="beforeEnter" @enter="enter" @beforeLeave="beforeLeave" mode="out-in">
            <section v-if="ifShowContent" class="menu_content" :class="dir=='horizental'?'menu_content-horizental':''">
                <slot name="menu_content"></slot>
            </section>
        </transition>
    </section>
</template>
<script lang="ts">
    //    问题1：ts变量类型和vue props变量类型冲突？
    import Vue from 'vue';
    import eventBus from './DropMenuBus.js';
    let vm= Vue.extend({
        props:{
            dir:String, //弹出菜单方向
            duration:Number,    //动画时间
            defaultActiveMenu:String,   //默认活跃状态的菜单id，在多个下拉菜单组成列表时使用
        },
        data:function():{
            menuStatus:boolean,     //当前按钮状态
            transitionS:string,     //动画，动态js
            activeMenu:string,      //活跃菜单，用于配置菜单列表
        }{
            return{
                menuStatus:false,
                transitionS:'ms height',
                activeMenu:''
            }
        },
        mounted:function(){
            this.activeMenu=this.defaultActiveMenu  //默认当前菜单活跃
            let obj=this
            eventBus.$on('changeActiveMenu',function(param:string){
              obj.activeMenu=param
            })
        },
        computed:{
            ifShowContent():boolean{
                return this.menuStatus&&this.defaultActiveMenu==this.activeMenu;
            }
        },
        methods:{
            switchMenuStatus:function(){
                this.menuStatus=!this.menuStatus
            },
            beforeEnter:function(el:any){
                el.style.height=0;
                el.style.transition=this.duration+this.transitionS
            },
            enter:function(el:any){
                el.style.height=el.scrollHeight+'px';
            },
            beforeLeave:function(el:any){
                el.style.transition=this.duration+this.transitionS
                el.style.height=0
            }
        }
    })
    export default vm;
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