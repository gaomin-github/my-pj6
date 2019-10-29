<template>
    <section>
        <section class="player-container">
            <!-- <section class="animation"> -->
            <section
                class="animation-item"
                ref="animationItem"
                v-if="animationTestShow"
            >{{ animationTestText }}</section>

            <!-- </section> -->
            <section class="animation" v-show="pools&&pools.length>0">
                <section class="animation-layer" v-for="(pool,poolIndex) in pools" :key="poolIndex">
                    <section
                        v-show="pool&&pool.danmus&&pool.danmus.length>0&&poolIndex===0"
                        class="danmu-content"
                    >
                        <section class="danmu-item" v-for="danmu in pool.danmus" :key="danmu.index">
                            <section
                                v-if="danmu.startTime>displayMills+8000*2"
                                :ref="`${danmu.index}`"
                            >{{ danmu.text}},{{poolIndex}}</section>
                        </section>
                    </section>
                </section>

                <!-- <section
                    v-if="pools[0]&&pools[0].danmus&&pools[0].danmus.length>0"
                    class="danmu-content"
                >
                    <section
                        class="danmu-item"
                        v-for="danmu in pools[0].danmus"
                        :key="danmu.index"
                        :ref="`${danmu.index}`"
                    >{{ danmu.text }}</section>
                </section>-->
            </section>
        </section>
        poolNum:{{pools&&pools.length}}
        <section class="control-bar">
            <section class="time-container">{{ displayTimeMsg }}</section>
            <button @click="init">播放器开始</button>
            <button @click="pausePlayer">播放器暂停</button>
            <button @click="continuePlayer">播放器继续</button>
            <button @click="changePlayer(displayMills+20000)">快进</button>
            <button @click="changePlayer(displayMills-20000)">回退</button>
        </section>
        <section class="manual-bar">
            <button @click="sendDanmu">增加弹幕</button>
            <button @click="autoAddDanmu">自动添加弹幕</button>
        </section>
        <section class="test">
            <button @click="displayAnimation">展示动画</button>
            <button @click="pauseAnimation">暂停动画</button>
            <button @click="continueAnimation">继续动画</button>
        </section>
    </section>
</template>
<script src="./danmuDemo.js"></script>
<style lang="scss" scoped>
* {
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-transform: translateZ(0) scale(1, 1);
}
section {
    display: block;
    // width: 100%;
    // height: 100%;
}
.player-container {
    width: 60%;
    height: 260px;
    background: rgb(194, 176, 176);
    margin: 10px 20%;
    position: relative;
    border: 1px black solid;
}
.animation {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    &-item {
        display: inline;
        color: rgb(255, 0, 255);
        font-size: 16px;
        position: absolute;
        border: 1px rgb(255, 255, 255) solid;
        left: 100%;
        word-wrap: none;
        white-space: nowrap;
    }
    &-layer {
        position: absolute;
        border: 1px red solid;
        width: 100%;
        height: 100%;
        display: block;
    }
}
.danmu-content {
    width: 100%;
    height: 100%;
    display: block;
}
.danmu-item {
    position: absolute;
    display: inline;
    word-wrap: none;
    white-space: nowrap;
    font-weight: 400;
    // border: 1px pink solid;
    position: absolute;
    // left: 100%;
}
.control-bar,
.manual-bar {
    height: 60px;
    span {
        font-size: 16px;
        line-height: 30px;
    }
    button {
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        //   margin: 5px;
        outline: none;
    }
}
.time-container {
    display: inline-block;
    width: 100px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    white-space: nowrap;
    // border: 1px black solid;
}
</style>
