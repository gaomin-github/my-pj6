<template>
    <section class="con">
        <button @click="switchModal">prevent scroll plugin test</button>
        <button @click="showTip">show tip</button>
        <ul class="data">
            <li v-for="item in 50">
                plugins page additions {{item}}
            </li>
        </ul>
        <!--<div class="layer" ref="layer" v-show="showModal" v-vue-plugin-tip="showModal">-->
            <!--<div class="modal">-->
                <!--<ul @keydown="scrollHandler"  @wheel="scrollHandler">-->
                    <!--<li v-for="item in 15">-->
                        <!--{{item}}prevent scroll test item!!-->
                    <!--</li>-->
                <!--</ul>-->
                <!--<div class="modal_close" @click="switchModal">CLOSE</div>-->
            <!--</div>-->
        <!--</div>-->
        <tip></tip>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import preventScroll from './preventScroll.js';
    Vue.use(preventScroll);
    import tip from './tip.js';
    Vue.use(tip);
    // import tip from './tip.vue';
export default Vue.extend({
    data:function(){
        return{
            showModal:false,
            pageScrollNum:0,
        }
    },
    mounted:function(){
        this.$on('test',function(){
            console.log('hello---------');
        })
    },
    updated:function(){

    },
    methods:{
        switchModal(){
            this.showModal=!this.showModal;
            // 模态窗显示时控制body:overflow属性
            // if(this.showModal){
            //     this.pageScrollNum=document.documentElement?document.documentElement.scrollTop:document.body.scrollTop;
            //     document.documentElement.style.overflow='hidden';
            // }else{
            //     document.documentElement.style.overflowY='scroll'
            //     document.documentElement.scrollTop=this.pageScrollNum;
            // }
        },
        scrollHandler(e:any){
            // 根据滑动边界判断
            // switch (e.type){
            //     case 'wheel':{
            //         console.log('e.wheelDelta：'+e.wheelDelta);
            //         if(e.wheelDelta>0&&e.currentTarget.scrollTop==0){
            //             e.preventDefault();
            //             return;
            //         }
            //         if(e.wheelDelta<0&&e.currentTarget.scrollTop+e.currentTarget.clientHeight==e.currentTarget.scrollHeight){
            //             e.preventDefault();
            //             return;
            //         }
            //     }
            //     case 'keydown':{
            //         if(e.keyCode==38&&e.currentTarget.scrollTop==0){
            //             e.preventDefault();
            //             return;
            //         }
            //         if(e.keyCode==40&&e.currentTarget.scrollTop+e.currentTarget.clientHeight==e.currentTarget.scrollHeight){
            //             e.preventDefault();
            //             return;
            //         }
            //     }
            // }
        },
        showTip(){
            console.log('touch tip btn');
            this.$children[0].$emit('vuetip',`tip show ${(new Date()).getSeconds()}`);
            // this.$emit('test');
            // this.$children[0].$emit('dd');
        }
    },
    components:{
        // tip
    }
})
</script>
<style lang="scss" scoped>
    .con{
        height:3000px;
        padding-top:300px;
    }
    .data{
        li{
            font-size:16px;
            line-height:50px;
        }
    }
    .layer{
        position:fixed;
        width:100%;
        height:100%;
        top:0px;
        left:0px;
        background:rgba(0,0,0,.5);
        z-index:20;
    }
    .modal{
        width:200px;
        position: absolute;
        top:50%;
        left: 50%;
        transform:translate(-50%,-50%);
        background:rgb(255,255,255);
        height:300px;
        overflow-y:hidden;
        z-index:22;
        ul{
            max-height:100%;
            overflow-y: auto;
            /*height:200px;*/
            li{

                line-height: 30px;
                font-size:16px;
            }
        }

        .modal_close{
            width:60px;
            height:30px;
            border-radius:5px;
            background:rgb(100,100,100);
            position:absolute;
            right:10px;
            top:10px;
            z-index:26;
        }
    }
</style>