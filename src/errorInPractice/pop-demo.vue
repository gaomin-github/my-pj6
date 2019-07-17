<template>
    <section class="con">
        <button @click="showPop">pop test</button>
        <pop-modal v-if="false"></pop-modal>
        <h4>{{componentName}}</h4>
    </section>
</template>
<script>
    import {eventBus} from './pop-eventbus';
    export default{
        data:function(){
            return{
                componentName:'弹出窗'
            }
        },
        mounted(){
            console.log('current component');
            console.log(this.$el);
            let html=this.$el;
            let last,lastTag;
            while(html){
                last=html;
                if(lastTag){

                }
            }
        },
        methods:{
            showPop(){
                eventBus.$emit('error:pop');
            }
        },
        components:{
            'pop-modal':_=>import('./pop-modal.vue')
        }
    }
</script>
<style lang="scss" scoped>
    .con{
        width:100%;
        display: flex;
        li{
            line-height: 30px;
        }
    }

</style>