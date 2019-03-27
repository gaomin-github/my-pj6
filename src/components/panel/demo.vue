<template>
    <section>
        <h3>遮罩面板</h3>
        <button @click="switchPopPanel">弹出遮罩面板</button>
        <pop-panel :isShow="showPopPanel" v-on:close-pop-panel="closePopPanel">
            <section slot="content" class="pop_content">
                <p>1111111</p>
                <p>2222222</p>
                <p>3333333</p>
            </section>
        </pop-panel>
        <h3>选项卡面板</h3>
        <tab-panel :tabNum="5" class="card_panel">
            <tab-item slot="tab1" tabIndex="tab1">
                <section slot="tab_title" class="tab_title">
                    card111111
                </section>
                <section slot="tab_content" class="tab_content">
                    tab1
                    card1 contentcard1 contentcard1 contentcard1 contentcard1 contentcard1 contentcard1 contentcard1 contentcard1 content
                    <p>11111</p>
                    <p>11111</p>
                    <p>11111</p>
                </section>
            </tab-item>
            <tab-item slot="tab2" tabIndex="tab2">
                <section slot="tab_title" class="tab_title">
                    card2
                </section>
                <section slot="tab_content" class="tab_content">
                    card2 content
                    <p>22222</p>
                    <p>22222</p>
                    <p>22222</p>
                </section>
            </tab-item>
            <tab-item slot="tab3" tabIndex="tab3">
                <section slot="tab_title" class="tab_title">
                    card3
                </section>
                <section slot="tab_content" class="tab_content">
                    card3 content
                    <p>33333</p>
                    <p>33333</p>
                    <p>33333</p>
                </section>
            </tab-item>
            <tab-item slot="tab4" tabIndex="tab4">
                <section slot="tab_title" class="tab_title">
                    card4
                </section>
                <section slot="tab_content" class="tab_content">
                    card3 content
                    <p>33333</p>
                    <p>33333</p>
                    <p>33333</p>
                </section>
            </tab-item>
            <tab-item slot="tab5" tabIndex="tab5">
                <section slot="tab_title" class="tab_title">
                    card5
                </section>
                <section slot="tab_content" class="tab_content">
                    card3 content
                    <p>33333</p>
                    <p>33333</p>
                </section>
            </tab-item>
        </tab-panel>
        <p>0</p>
        <p>0</p>
        <p>0</p>
        <p>0</p>
        <p>0</p>
        <h3>totail组件</h3>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import popPanel from './PopPanel.vue';
    import tabPanel from './TabPanel.vue';
    import tabItem from './TabItem.vue';
    import Totail from './Totail.ts';
    export default Vue.extend({
        data:function():{
            showPopPanel:boolean,    //是否展示弹出面板
        }{
            return{
                showPopPanel:false
            }
        },
        components:{
            popPanel,
            tabPanel,
            tabItem,
        },
        mounted(){
            let myTotail=new Totail("弹出框1");
            let myTotail2=new Totail('弹出框2');
        },
        methods:{
            switchPopPanel:function(){
                this.showPopPanel=!this.showPopPanel
            },
            closePopPanel:function(){
                console.log('demo close pop panel')
                this.showPopPanel=false
            }
        }
    })
</script>
<style lang="scss" scoped>
    .pop_content{
        width:500px;
        height:200px;
        overflow-y: scroll;
    }
    .card_panel{
        margin-left: 10px;
        width:300px;
        height:120px;
        .tab_title{
            border-right:1px rgb(180,180,180) solid;
        }
        .tab_content{
            border-top:1px rgb(180,180,180) solid;

        }
    }
</style>