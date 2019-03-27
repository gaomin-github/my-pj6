<template>
    <section class="totail">
        <section class="t_title">
            close
        </section>
        <h4>1{{message}}</h4>
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
        ifShow:boolean=false;
//        init(){
//            console.log('message：'+this.message)
//        }
    }
</script>
<style lang="scss">
    .totail{
        display: block;
        height:100px;
        width:200px;
        position: relative;
        z-index: 999;
        border:1px black solid;
    }
    .t_title{
        height:20px;
        background-color: rgb(180,180,180);
        text-align: right;
        padding-right: 10px;
        cursor: pointer;
    }
</style>