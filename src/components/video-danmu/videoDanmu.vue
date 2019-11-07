<template>
    <section>
        <section class="player-container" ref="playerContainer">
            <!-- 滚动弹幕 -->
            <section v-if="pools&&pools.length>0" ref="danmuContainer">
                <section v-for="(pool,poolIndex) in pools" :key="poolIndex">
                    <section
                        v-show="pool&&pool.danmus&&pool.danmus.length>0&&(overlap||(!overlap&&poolIndex===0))"
                    >
                        <p v-for="danmu in pool.danmus" :key="danmu.index">
                            <span
                                class="danmu-item"
                                :ref="`${danmu.index}`"
                            >{{ danmu.text}},{{poolIndex}}</span>
                        </p>
                    </section>
                </section>
            </section>
            <!-- 顶部弹幕 -->
            <section v-if="topPools&&topPools.length>0" ref="danmuContainer">
                <section v-for="(pool,poolIndex) in topPools" :key="poolIndex">
                    <section v-show="pool&&pool.danmus&&pool.danmus.length>0">
                        <p
                            v-for="danmu in pool.danmus"
                            :key="danmu.index"
                            class="top-danmu-item"
                            :ref="`top-${danmu.index}`"
                        >
                            <!-- <span
                                class="top-danmu-item"
                                :ref="`top-${danmu.index}`"
                            >-->
                            {{ danmu.text}},{{poolIndex}}
                            <!-- </span> -->
                        </p>
                    </section>
                </section>
            </section>
        </section>
        <section class="control-bar">
            <section class="time-container">{{ displayTimeMsg }},{{pools.length}}</section>
        </section>
    </section>
</template>
<script src="./videoDanmu.js"></script>
<style lang="scss" scoped>
section {
    display: block;
    height: 100%;
    overflow: hidden;
}
.player-container {
    border: 1px red solid;
    position: relative;
}
.control-bar {
    height: 26px;
    position: absolute;
    z-index: 1000;
    bottom: 0px;
    left: 0;
}
.danmu-content {
    border: 1px red solid;
}
.danmu-item {
    position: absolute;
    display: inline;
    word-wrap: none;
    white-space: nowrap;
    font-weight: 400;
    // position: absolute;
}
.top-danmu-item {
    position: absolute;
    display: block;
}
</style>
