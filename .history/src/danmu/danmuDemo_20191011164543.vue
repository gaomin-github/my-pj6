<template>
    <section>
        <section class="player-container"></section>
        <section class="control-bar">
            <section class="time-container">{{displayTimeMsg}}</section>
            <button @click="startPlayer">播放器开始</button>
            <button @click="stopPlayer">播放器结束</button>
            <button @click="continuePlayer">播放器继续</button>
        </section>
        <section class="manual-bar">
            <button @click="manualAddDanmu">增加弹幕</button>
            <button @click="autoAddDanmu">自动添加弹幕</button>
        </section>
    </section>
</template>
<script>
export default {
    data: function() {
        return {
            // 播放器相关
            startMills: 0,
            startTimer: null,
            displayTimeMsg: "00:00:00",
            // 弹幕存储相关
            danmuList: []
        };
    },
    mounted() {
        // this.init();
    },
    methods: {
        // 播放器相关
        startPlayer() {
            this.startMills = new Date().getTime();
            this.startTimer = setInterval(() => {
                let currentMills = new Date().getTime();
                let displayMills = currentMills - this.startMills;
                let displayHour = Math.floor(displayMills / (1000 * 60 * 60));
                let displayMinute = Math.floor(
                    (displayMills - 1000 * 60 * 60 * displayHour) / (1000 * 60)
                );
                let displaySecond = Math.ceil(
                    (displayMills -
                        1000 * 60 * 60 * displayHour -
                        1000 * 60 * displayMinute) /
                        1000
                );
                this.displayTimeMsg = `${displayHour} h::${displayMinute} m::${displaySecond} s`;
            }, 200);
        },
        stopPlayer() {
            clearInterval(this.startTimer);
        },
        continuePlayer() {
            this.startTimer();
        },
        // 弹幕数据抓取
        initDanmuList() {},
        manualAddDanmu() {
            let random = Math.random();
            let danmu = {
                index: new Date().getTime(),
                startTime: Math.floor(random * 1000),
                fontSize:
                    random * 10 < 3
                        ? 12
                        : random * 10 < 5
                        ? 16
                        : random * 10 < 8
                        ? 24
                        : 36,
                color:
                    (random * 10) % 2 === 0
                        ? "red"
                        : (random * 10) % 3 === 0
                        ? "white"
                        : "green",
                text: `danmu${random}`
            };
        },
        autoAddDanmu() {
            setInterval(this.manualAddDanmu, 2000);
        }
    }
};
</script>
<style lang="scss" scoped>
section {
    display: block;
}
.player-container {
    width: 90%;
    height: 260px;
    background: rgb(0, 0, 0);
    margin: 5%;
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
        margin: 5px;
        outline: none;
    }
}
.time-container {
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    // border: 1px black solid;
}
</style>