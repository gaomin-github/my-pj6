<template>
    <section class="container">
        <!--<section>-->
            <!--挨打奥发多多大奥爱迪生所所所所所所所所啊啊啊-->
        <!--</section>-->
        <section class="block1">
            block1
        </section>
        <section class="block2">
            <!--<section class="block3">-->
                <input type="text" class="block3"/>
            <!--</section>-->
            <section class="block4">
                第四个
            </section>
        </section>
    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class Input extends Vue {
    }
</script>
<style lang="scss" scoped>
input{
    /*min-width: 0px;*/
}
.container{
    border:1px black solid;
    display: flex;
    width:300px;
    height:50px;
}
.block1{
    border:1px black solid;
}
.block2{
    border:1px red solid;
    display: flex;
    flex: 1;
}
.block3{
    flex: 1;
    /*input{*/
        /*width:100%;*/
        min-width:0px;
    /*}*/
}
.block4{
    border:1px black solid;
    display: block;
}

</style>