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
        <p>下拉菜单--drop down menu test--</p>
        <section class="menu_group">
            <drop-down-group :menuNum="5">
                <section slot="menu_1">
                    <drop-down duration="1000" defaultActiveMenu="menu_1">
                        <section class="menu_title" slot="menu_title">
                            <p>菜单1</p>
                        </section>
                        <section class="menu_content" slot="menu_content">
                            <p>1111111</p>
                            <p>2222222</p>
                            <p>3333333</p>
                        </section>
                    </drop-down>
                </section>
                <section slot="menu_2">
                    <drop-down duration="1000" defaultActiveMenu="menu_2">
                        <section class="menu_title" slot="menu_title">
                            <p>菜单2</p>
                        </section>
                        <section class="menu_content" slot="menu_content">
                            <p>1111111</p>
                            <p>2222222</p>
                            <p>3333333</p>
                        </section>
                    </drop-down>
                </section>
                <section slot="menu_3">
                    <drop-down duration="1000" defaultActiveMenu="menu_3">
                        <section class="menu_title" slot="menu_title">
                            <p>菜单3</p>
                        </section>
                        <section class="menu_content" slot="menu_content">
                            <p>1111111</p>
                            <p>2222222</p>
                            <p>3333333</p>
                        </section>
                    </drop-down>
                </section>
                <section slot="menu_4">
                    <drop-down duration="1000" defaultActiveMenu="menu_4">
                        <section class="menu_title" slot="menu_title">
                            <p>菜单4</p>
                        </section>
                        <section class="menu_content" slot="menu_content">
                            <p>1111111</p>
                            <p>2222222</p>
                            <p>3333333</p>
                        </section>
                    </drop-down>
                </section>
                <section slot="menu_5">
                    <drop-down duration="1000" defaultActiveMenu="menu_5">
                        <section class="menu_title" slot="menu_title">
                            <p>菜单5</p>
                        </section>
                        <section class="menu_content" slot="menu_content">
                            <p>1111111</p>
                            <p>2222222</p>
                            <p>3333333</p>
                        </section>
                    </drop-down>
                </section>
            </drop-down-group>
        </section>
        <p>--下拉菜单列表drop down menu group test--</p>
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
    .menu_title{
        font-weight: 600;
    }
</style>