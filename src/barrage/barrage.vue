<template>
    <section class="barrage-container">
        <h3>弹幕测试</h3>
        <section class="player-container">
            <ul class="player-info">
                <li
                    v-for="item in barrageList"
                    :ref="`barrage_${item}`"
                    :key="item"
                    :style="{
                         minWidth:`${barrageQueue[item].width}px`,
                         top:`${barrageQueue[item].channelIndex*12}px`,
                         fontSize:`${barrageQueue[item].fontSize}px`,
                         color:`${barrageQueue[item].color}`,
                         backgroundColor:'green',
                         animationDuration:`${barrageQueue[item].getDuration()}s`,
                    }"
                >{{barrageQueue[item].msg}}</li>
            </ul>

            <!-- <section class="test3" ref="test3">动画测试3内容</section> -->
            <!-- <section class="test4" ref="test3">动画测试4内容</section> -->
        </section>
        <button @click="addTestBarrage">新增弹幕</button>
        <button @click="displayBarrage">展示弹幕</button>
        <h3>动画测试1</h3>
        <!-- <h3 @click="moveTest3">动画测试3</h3> -->
        <section
            class="test"
            ref="test"
            v-if="showTest"
            style="
                display:block;
                width:100px;
                height:100px;
                backgroundColor:red;
                transition: all 5s;
                position: absolute;"
        >donghua</section>
        <!-- <h3>动画测试2</h3>
        <section
            class="test2"
            ref="test2"
            style="
                display:block;
                width:100px;
                height:100px;
                backgroundColor:red;
                transition: all 5s;
                position: absolute;"
        >donghua</section> -->

        <!-- <section class="test" ref="test" v-if="showTest" :style="{transition:`all ${10}s`}">donghua</section> -->
    </section>
</template>
<script src='./barrage.js'></script>
<style lang="scss" scoped>
section {
    width: 100%;
    // height: 100%;
    display: block;
}
button {
    height: 32px;
    line-height: 32px;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    border-radius: 10px;
    margin: 20px;
}
@keyframes test3 {
    from {
        left: 0px;
        right: 100%;
        transform: translateX(-100%);
    }
    to {
        left: 100%;
        right: 0px;
        // transform: translateX(100%);
    }
}
@keyframes test4 {
    from {
        right: 0px;
        left: 100%;
    }
    to {
        left: 0px;
        right: 100%;
        transform: translateX(-100%);
    }
}
.barrage-container {
    overflow-x: visible;
}
.player {
    &-container {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 10%;
        background: rgb(0, 0, 0);
    }
    &-info {
        li {
            display: block;
            position: absolute;
            background: blue;
            font-size: 16px;
            word-wrap: none;
            white-space: nowrap;
            border: 1px white solid;
            animation: test4 4s linear;
            padding: 0;
            // animation-name: test4;
            // animation-timing-function: linear;
            // animation-duration: 5s;
        }
        &-item {
            display: block;
            position: absolute;
            background: blue;
            font-size: 16px;
            word-wrap: none;
            white-space: nowrap;
            border: 1px white solid;
            animation: test4 4s linear;
            // animation-name: test4;
            // animation-timing-function: linear;
            // animation-duration: 5s;
        }
    }
}
.test,
.test2,
.test3,
.test4 {
    display: block;
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    word-wrap: none;
}
.test3 {
    animation: test3 8s linear;
}
.test4 {
    animation: test4 4s linear;
}
</style>

