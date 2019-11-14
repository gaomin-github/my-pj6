<template>
    <section>
        <section class="player-container">
            <section class="animation">
                <section class="animation-item" ref="animationItem">{{animationTestText}}</section>
            </section>
        </section>
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
        <section class="test">
            <button @click="displayAnimation">展示动画</button>
        </section>
    </section>
</template>
<script>
const SW = document.body.clientWidth || document.documentElement.clientWidth;
const SH = document.body.clientHeight || document.documentElement.clientHeight;
const Duration = 4000; //弹幕生命周期
export default {
    data: function() {
        return {
            // 播放器相关
            startMills: 0,
            startTimer: null,
            displayTimeMsg: "00:00:00",
            // 动画测试相关
            animationTestShow: false,
            animationTestText: "这里是弹幕动画测试",
            // 弹幕存储相关
            danmuQueue: [], //待展示弹幕
            visiableDanmus: [] //正在展示弹幕
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
        initDanmuList() {
            for (let i = 0; i < 10; i++) {
                this.manualAddDanmu();
            }
        },
        manualAddDanmu() {
            let random = Math.random();
            let danmu = {
                index: new Date().getTime(),
                startTime: new Date().getTime() + Math.floor(random * 1000),
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
            danmu = this.refactorDanmu(danmu);
            this.danmuQueue.push(danmu);
        },
        refactorDanmu(danmu) {
            return Object.assign(
                {
                    width: danmu.text.length() * danmu.fontSize,
                    height: danmu.fontSize,
                    duration: Duration,
                    remainTime: Duration
                },
                danmu
            );
        },
        autoAddDanmu() {
            setInterval(this.manualAddDanmu, 2000);
        },
        // 动画效果测试
        displayAnimation() {
            this.animationTestShow = true;
            this.$nextTick(() => {
                setTimeout(() => {
                    let animationDom = this.$refs.animationItem;
                    animationDom.style.left = `${SW * 0.9}px`;
                    animationDom.style.transition = `transform ${Duration}ms linear 0s`;
                    animationDom.style.transform = `translateX(-${SW * 0.9 +
                        this.animationTestText.length * 16}px)`;

                    // console.table(animationDom.style);
                }, 20);
            });
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
.animation {
    position: relative;
    &-item {
        display: inline;
        color: rgb(255, 0, 255);
        font-size: 16px;
        position: absolute;
        border: 1px rgb(255, 255, 255) solid;

        word-wrap: none;
        white-space: nowrap;
    }
}
</style>