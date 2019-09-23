<template>
    <section class="barrage-container">
        <h3>弹幕测试</h3>
        <section class="player-container">
            <ul class="player-info">
                <!--    <li
                    v-for="item in barrageList"
                    :ref="`barrage_${item}`"
                    :key="item"
                    :style="{
                         fontSize:`${barrageQueue[item].fontSize}px`,
                         color:`${barrageQueue[item].color}`,
                         transition:`all ${barrageQueue[item].duration}s linear`
                    }">
                    item:{{item}},{{barrageQueue[item].msg}}
                </li>   -->

                <li
                    v-for="item in barrageList"
                    :ref="`barrage_${item}`"
                    :key="item"
                    :style="{
                        display:'block',
                         fontSize:`${barrageQueue[item].fontSize}px`,
                         color:`${barrageQueue[item].color}`,
                         animationDuration:'${barrageQueue[item].duration}}s',
                    }">
                    item:{{item}},{{barrageQueue[item].msg}}
                </li>

                <!--    <li v-for="item in barrageList">
                <p>item:{{item}}</p>
                <p>queue:{{barrageQueue[item].index}}</p>
                <p></p>
                </li>   -->
            </ul>

            <section class="test3" ref="test3">动画测试3内容</section>
        </section>
        <button @click="addTestBarrage">新增弹幕</button>
        <button @click="displayBarrage">展示弹幕</button>
        <h3>动画测试1</h3>
        <h3 @click="moveTest3">动画测试3</h3>
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
        <h3>动画测试2</h3>
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
        >donghua</section>

        <!-- <section class="test" ref="test" v-if="showTest" :style="{transition:`all ${10}s`}">donghua</section> -->
    </section>
</template>
<script src='./barrage.js'></script>
<style lang="scss" scoped>
section {
    width: 100%;
    height: 100%;
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
    &-info{
        li{
            display:block;
            position:absolute;
            background:blue;
            font-size:16px;
            animation:test3 10s linear;
        }
    }
}
.test,
.test2,
.test3 {
    display: block;
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
}
.test3 {
    animation: test3 8s linear;
}
</style>

