<template>
    <section>
        <h5>工具demo</h5>
        <h5>文字马赛克</h5>
        <mosaic/>
    </section>
</template>
<script lang="ts">
    import Totail from '../tools/Totail.ts';
    import Mosaic from '../tools/Mosaic.vue';
    import {Vue,Component} from 'vue-property-decorator';
    @Component({
        components:{
            Mosaic
        }
    })
    export default class ToolDemo extends Vue{
        mounted(){
//            let myTotail=new Totail("弹出框anny tony 12345中文表演节目传统相声");
        }
    }
</script>
<style lang="scss" scoped>

</style>