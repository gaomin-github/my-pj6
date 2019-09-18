<template>
    <section class="barrage-container">
        <h3>弹幕测试</h3>
        <section class="player-container">
            <ul class="player-info">
                <li
                    v-for="item in barrageList"
                    :ref="item"
                    :key="item"
                    :style="{
                         fontSize:`${barrageQueue[item].fontSize}px;`;
                         color:`${barrageQueue[item].color}`;
                    }"
                >{{barrageQueue[item.msg]}}</li>
            </ul>
        </section>
    </section>
</template>
<script src="./barrage.js"></script>
<style lang="scss" scoped>
section {
    width: 100%;
    height: 100%;
    display: block;
}
.player {
    &-container {
        width: 90%;
        height: 300px;
        margin: 0 5%;
        background: #fff;
    }
    &-info {
    }
}
</style>

