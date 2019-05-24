<template>
    <section>
        <p v-install-tip="`hello1`">局部指令</p>
        <p v-direct-tip="`hello2`">全局指令传参1</p>
        <p v-direct-tip:msg="`hello3`">全局指令传参2</p>
    </section>
</template>
<script lang="ts">
    import "./Tip.js";
    export default{
        name:'directDemo',
        directives:{
            installTip:{
                bind:function(){
                    console.log('area directive tip');
                }
            }
        }
    }
</script>
