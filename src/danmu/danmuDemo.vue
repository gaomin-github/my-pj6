<template>
    <section>
        <section class="player-container">
            <!-- <section class="animation"> -->
            <!-- <section
          class="animation-item"
          ref="animationItem"
          v-if="animationTestShow"
        >
          {{ animationTestText }}
            </section>-->

            <!-- </section> -->
            <section class="animation" v-if="pools&&pools.length>0">
                <section
                    class="animation-layer"
                    v-for="(pool,poolIndex) in pools"
                    :key="poolIndex"
                    :style="`{zIndex:${pool.index+10}}`"
                >
                    <section v-if="pool&&pool.danmus&&pool.danmus.length>0" class="danmu-content">
                        <section
                            class="danmu-item"
                            v-for="danmu in pool.danmus"
                            :key="danmu.index"
                            :ref="`${danmu.index}`"
                        >{{ danmu.text }}</section>
                    </section>
                </section>
            </section>
        </section>
        poolNum:{{pools&&pools.length}}
        <section class="control-bar">
            <section class="time-container">{{ displayTimeMsg }}</section>
            <button @click="startPlayer(0)">播放器开始</button>
            <button @click="pausePlayer">播放器暂停</button>
            <button @click="continuePlayer">播放器继续</button>
        </section>
        <section class="manual-bar">
            <button @click="sendDanmuTest">增加弹幕</button>
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
section {
    display: block;
    // width: 100%;
    // height: 100%;
}
.player-container {
    width: 80%;
    height: 260px;
    background: rgb(0, 0, 0);
    margin: 10%;
    position: relative;
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
.animation {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    /* &-item {
      display: inline;
      color: rgb(255, 0, 255);
      font-size: 16px;
      position: absolute;
      border: 1px rgb(255, 255, 255) solid;

      word-wrap: none;
      white-space: nowrap;
    } */
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
    border: 1px rgb(255, 255, 255) solid;
}
</style>
