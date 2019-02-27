<template>
    <section class="container">
        <section class="pre_bar" @click="moveBar('right')" v-if="showLeftBar">
        </section>
        <section class="tab_container" ref="tabs">
            <section class="tab_item" v-for="key in tabNum">
                <slot :name="'tab'+key"></slot>
            </section>
        </section>
        <section class="next_bar" @click="moveBar('left')" v-if="showRightBar">
        </section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class TabPanel extends Vue{
        activeIndex='tab1'
        leftNum=0
        showLeftBar=false
        showRightBar=false
        @Prop() tabNum!:number
//        激活选中菜单
        handleClickItem(param:string){
            this.activeIndex=param
        }
        mounted(){
            this.handleBarShow()

        }
//        控制滑动块显示
        handleBarShow(){
            let tabs:any=this.$refs['tabs']
            let tabScrollLeft=tabs.scrollLeft
            let tabClientWidth=tabs.clientWidth
            let tabScrollWidth=tabs.scrollWidth
            this.showLeftBar=tabScrollLeft>0?true:false
            this.showRightBar=(tabScrollLeft+tabClientWidth<tabScrollWidth)?true:false
        }
//        滑动标题滚动条 true内容向右移动 false向左移动
        moveBar(param:string){
            let tabs:any=this.$refs['tabs']
            let tabScrollLeft=tabs.scrollLeft
            let tabClientWidth=tabs.clientWidth
            let tabScrollWidth=tabs.scrollWidth
            if(param=='right'){
                if(tabScrollLeft>0){
                    this.leftNum=this.leftNum-20
                }
                if(tabScrollLeft+tabClientWidth<tabScrollWidth){
                    this.leftNum=this.leftNum-20
                }
            }else{
                if(tabScrollLeft+tabClientWidth<tabScrollWidth){
                    this.leftNum=this.leftNum+20
                }
            }
            tabs.scrollLeft=this.leftNum
            this.handleBarShow()
        }

    }
</script>
<style lang="scss" scoped>
.container{
    display: block;
    padding:0px;
    position: relative;
    border:1px rgb(180,180,180) solid;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 3;
    background-color: rgb(255,255,255);
}
.tab_container{
    display: flex;
    flex-direction: row;
    flex:1;
    overflow-x: scroll;
    overflow-y: hidden;
    height:100%;
    z-index: 1;
    margin-left: 10px;
    margin-right:10px;
}
.tab_container::-webkit-scrollbar{
    height:0;
    box-shadow: none;
}
.pre_bar,.next_bar{
    width:0px;
    height:0;
    position: absolute;
    top:0px;
    cursor: pointer;
    background-color: rgb(255,255,255);
}
.pre_bar{
    left:0px;
    border-right:6px rgb(150,150,150) solid;
    border-top:10px transparent solid;
    border-bottom:10px transparent solid;
}
.next_bar{
    right:0px;
    border-left:6px rgb(150,150,150) solid;
    border-top:10px transparent solid;
    border-bottom:10px transparent solid;
}
</style>