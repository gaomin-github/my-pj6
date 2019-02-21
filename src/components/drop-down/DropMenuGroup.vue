<template>
    <section>
        <transition-group tag="section">
            <section v-for="item in menuNum" :key="item">
                <section @click="changeCurMenu('menu_'+item)">
                    <slot :name="'menu_'+item" class="menu_item" >
                    </slot>
                </section>
            </section>
        </transition-group>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import eventBus from './DropMenuBus.js';
    export default Vue.extend({
        props:{
            menuNum:Number
        },
        data:function():{
            curActiveMenu:string
        }{
            return{
                curActiveMenu:''
            }
        },
        methods:{
            changeCurMenu:function(param:string){
                eventBus.$emit('changeActiveMenu',param)
            },
            beforeEnter:function (el:any) {
                el.style.height=0
            },
            enter:function(el:any){
                el.style.height=el.scrollHeight;
            },
            leave:function(el:any){
                el.style.height=0
            }
        }
    })
</script>
<style lang="scss" scoped>
</style>