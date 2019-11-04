<template>
    <section>
        <section class="player-container" ref="playerContainer">
            <section class="animation" v-show="pools&&pools.length>0" ref="danmuContainer">
                <section
                    class="animation-layer"
                    v-for="(pool,poolIndex) in pools"
                    :key="poolIndex"
                    :style="{
                    zIndex:`${poolIndex+20}`}"
                >
                    <section
                        v-show="pool&&pool.danmus&&pool.danmus.length>0&&(overlap||(!overlap&&poolIndex===0))"
                        class="danmu-content"
                    >
                        <section
                            class="danmu-item"
                            v-for="danmu in pool.danmus"
                            :key="danmu.index"
                            :ref="`${danmu.index}`"
                        >
                            <section
                                v-if="isHorizontal||danmu.channelId+danmu.channelNum<=MinChannelNum"
                            >{{ danmu.text}},{{poolIndex}}</section>
                            <!-- <section>{{ danmu.text}},{{poolIndex}}</section> -->
                        </section>
                    </section>
                </section>
            </section>
        </section>
        poolNum:{{pools&&pools.length}}
        <section class="control-bar">
            <section class="time-container">{{ displayTimeMsg }}</section>
            <button @click="init">播放器开始</button>
            <button @click="pausePlayer">播放器暂停</button>
            <button @click="continuePlayer">播放器继续</button>
            <!-- <br /> -->
            <button @click="changePlayer(displayMills+20000)">快进</button>
            <button @click="changePlayer(displayMills-20000)">回退</button>
        </section>
        <section class="danmu-bar">
            <span>不透明度</span>
            <button @click="changeDanmuOpacity(0.8)">+</button>
            <button @click="changeDanmuOpacity(0.3)">-</button>
        </section>
        <section class="danmu-bar">
            <span>显示区域</span>
            <button @click="changeArea(1/4)">1/4</button>
            <button @click="changeArea(1/2)">1/2</button>
            <button @click="changeArea(3/4)">3/4</button>
            <button @click="changeArea(1)">不重复</button>
            <button @click="changeArea(2)">无限</button>
        </section>
        <section class="danmu-bar">
            <span>字体</span>
            <button @click="changeFontSize(0.5)">50%</button>
            <button @click="changeFontSize(2)">200%</button>
        </section>
        <section class="manual-bar">
            <button @click="sendDanmu">增加弹幕</button>
            <button @click="autoAddDanmu">自动添加弹幕</button>
            <button @click="recycleDanmu">回收弹幕</button>
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
    width: 100%;
    height: 200px;
    // background: rgba(0, 0, 0, 1);
    // margin: 0 5%;
    position: relative;
    // overflow-y: hidden;
}
.animation {
    position: relative;
    width: 90%;
    height: 100%;
    // display: block;
    margin: 0 5%;
    border: 1px blue solid;
    &-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
    }
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
    // height: 60px;
    margin: 10px;
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
