<template>
    <section>
        <button @click="switchPopPanel">弹出遮罩面板</button>
        <pop-panel :isShow="showPopPanel" v-on:close-pop-panel="closePopPanel">
            <section slot="content" class="pop_content">
                <p>1111111</p>
                <p>2222222</p>
                <p>3333333</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>
                <p>4444444</p>

            </section>
        </pop-panel>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import popPanel from './PopPanel.vue';
    export default Vue.extend({
        data:function():{
            showPopPanel:boolean,    //是否展示弹出面板
        }{
            return{
                showPopPanel:false
            }
        },
        components:{
            popPanel
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
</style>