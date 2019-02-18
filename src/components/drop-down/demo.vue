<template>
    <section>
        <section class="menu">
            <!--可配置项：dir方向 -->
                    <!--duration动画时间（毫秒）-->
            <drop-down duration="1000">
                <section class="menu_title" slot="menu_title">
                    <p>drop down menu</p>
                </section>
                <section class="menu_content" slot="menu_content">
                    <p>1111111</p>
                    <p>2222222</p>
                    <p>3333333</p>
                </section>
            </drop-down>
        </section>
        <p>--drop down menu test--</p>
        <section class="menu_group">
            <drop-down-group>
                <section slot="menu1">

                </section>
            </drop-down-group>
        </section>
        <p>--drop down menu group test--</p>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import dropDown from './DropMenu.vue';
    import dropDownGroup from './DropMenuGroup.vue';
    export default Vue.extend({
        components:{
            dropDown,
            dropDownGroup,
        }
    })
</script>
<style lang="scss" scoped>
    .menu{
        width:200px;
    }
</style>