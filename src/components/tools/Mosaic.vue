<template>
    <section>
        <section class="css_mosaic">
            <h4>马赛克组件</h4>
        </section>
        <section class="canvas_mosaic">
            <img src="/static/1.jpg"/>
        </section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator';
    @Component({
        components:{
        }
    })
    export default class Mosaic extends Vue{

    }
</script>
<style lang="scss" scoped>
.css_mosaic{
    color:transparent;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
}
</style>