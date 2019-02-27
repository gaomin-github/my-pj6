<template>
    <section class="container">
        <section class="tab_title" :class="activeIndex==tabIndex?'tab_title-active':'tab_title-inactive'" @click="activeCurMenu">
            <slot name="tab_title"></slot>
        </section>
        <section class="tab_content" v-if="activeIndex==tabIndex">
            <slot name="tab_content"></slot>
        </section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class CardItem extends Vue{
        @Prop() tabIndex!:string
        get activeIndex(){
            let obj:any=this.$parent
            return obj.activeIndex
        }
        activeCurMenu(){
            let obj:any=this.$parent
            obj.handleClickItem(this.tabIndex)
        }
    }
</script>
<style lang="scss" scoped>
.container{
    position: static;
    display: inline-block;
    padding:0;
    border:none;
}
.tab_title{
    display: inline-block;
    min-width:80px;
    cursor: pointer;
}
.tab_title-inactive{
    background-color: rgb(220,220,220);
}
.tab_title-active{
    background-color: rgb(255,255,255);
}
.tab_content{
    left:0px;
    margin:0px;
    right:10px;
    width:100%;
    position: absolute;
}
</style>