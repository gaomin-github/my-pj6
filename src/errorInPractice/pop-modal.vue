<template>
    <section class="con">
    </section>
</template>
<script>
    import {eventBus} from './pop-eventbus';
    export default{
        created(){
            console.log('pop-modal created');
        },
        mounted(){
            console.log('pop-modal mounted');
            eventBus.$on('error:pop',function(){
                console.log('pop modal execute');
            })
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