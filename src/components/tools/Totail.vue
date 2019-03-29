<template>
    <section class="totail">
        <section class="t_title" @click="handleClose">
            close
        </section>
        <section class="t_content"><p>{{message}}</p></section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator';
    @Component({
        components:{
        }
    })
    export default class Totail extends Vue{
        message:string='totail';
        handleClose(){
            console.log('vue');
            let curEl=this.$el;
            let parentEl=curEl.parentNode;
            if(parentEl){
                parentEl.removeChild(this.$el);
            }else{
                document.body.removeChild(this.$el);
            }
        }
    }
</script>
<style lang="scss">
    .totail{
        display: block;
        position: absolute;
        z-index: 999;
        border:1px rgb(200,200,200) solid;
        border-radius: 5px;
        left:50%;
        top:60%;
        transform: translateX(-50%);
        max-width:300px;
    }
    .t_title{
        display:block;
        height:24px;
        background-color: rgb(200,200,200);
        text-align: right;
        padding-right: 10px;
        cursor: pointer;
    }
    .t_content{
        font-size: 14px;
        padding:5px;
        p{
            word-wrap: break-word;
            word-break: break-all;
            color:rgb(50,50,50);
            line-height: 20px;
        }
    }

</style>