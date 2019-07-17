<template>
    <section class="con">
        <li @click="displayItem">
            {{itemParam.dir}} list item {{itemParam.index}}
        </li>
    </section>
</template>
<script>
    export default{
        props:['itemParam'],
        mounted(){
            // console.log('this.itemParam');
            // console.log(this.itemParam);
        },
        methods:{
            displayItem(){
                console.log(this.itemParam);
                // console.log(this.itemParam.dir+','+this.itemParam.id);
            }
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