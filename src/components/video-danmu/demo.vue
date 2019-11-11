<template>
    <section>
        <!-- <h3>this is videoDanmuDemo</h3> -->
        <section class="player">
            <!-- <video class="video" autoplay loop="true">
                <source src="./videos/1.mp4" type="video/mp4" />
            </video>-->
            <video-danmu
                class="danmu"
                ref="danmu"
                :videoMills="videoMills"
                :duration="duration"
                :overlap="overlap"
            ></video-danmu>
        </section>
        <section class="control">
            <button @click="start">播放</button>
            <button @click="pauseDanmu">暂停</button>
            <button @click="continueDanmu">继续</button>
            <button @click="sendData">增加实时弹幕</button>
            <button @click="addDanmu">追加弹幕</button>
            <button @click="changeVideoMills(videoMills+10000)">快进</button>
            <button @click="changeSpeed(3000)">弹幕速度</button>
            <button @click="controlOverlap">重叠控制</button>
            <button @click="changeOpacity">透明度控制</button>
            <button @click="changeArea">显示区控制</button>
        </section>
    </section>
</template>
<script>
import videoDanmu from "./videoDanmu.vue";
export default {
    data: function() {
        return {
            videoMills: 0,
            duration: 8000,
            // 测试用例数据
            danmuNum: 0,
            overlap: false //弹幕重叠控制
        };
    },
    components: {
        videoDanmu
    },
    methods: {
        start() {
            this.$refs.danmu.init();
        },
        pauseDanmu() {
            this.$refs.danmu.pausePlayer();
        },
        continueDanmu() {
            this.$refs.danmu.continuePlayer();
        },
        // 修改视频进度
        changeVideoMills(newVideoMills) {
            this.videoMills = newVideoMills;
            // this.$refs.danmu.printPlayerMills();
            this.$refs.danmu.changePlayer(this.videoMills);
        },
        // 实时弹幕
        sendData() {
            let danmu = this.manualAddDanmu();
            // 弹幕播放时间为当前时间线
            // danmu.startTime = this.videoMills;
            //   http请求
            // danmu.createTime = this.timeline;
            console.log(
                `新增弹幕：${danmu.index},startTime:${danmu.startTime}`
            );
            this.$refs.danmu.sendDanmu(danmu);
        },
        // 历史弹幕展示
        // 定期抓取弹幕数据,每屏幕抓取一次，一次抓取3屏幕
        // 定时生成测试弹幕数据
        addDanmu() {
            let danmuList = [];
            for (let i = 0; i < 10; i++) {
                let danmu = this.manualAddDanmu();
                // console.log(
                //     `自动生成弹幕:${danmu.index},startTime:${danmu.startTime}`
                // );
                danmuList.push(danmu);
            }
            this.$refs.danmu.addDanmu(danmuList);
            this.videoMills += 9000;
            this.danmuCreateTimer = setTimeout(() => {
                this.addDanmu(danmuList);
            }, 8000);
        },
        changeSpeed(newSpeed) {
            this.duration = newSpeed;
            // this.$refs.danmu.changeSpeed(newSpeed);
        },
        controlOverlap() {
            this.overlap = !this.overlap;
        },
        manualAddDanmu() {
            let random = Math.random();
            let danmu = {
                index: this.danmuNum++,
                startTime: this.videoMills + Math.floor(random * 8000),
                fontSize:
                    random * 10 < 3
                        ? 12
                        : random * 10 < 5
                        ? 16
                        : random * 10 < 8
                        ? 24
                        : 36,
                color:
                    Math.floor(random * 10) % 2 === 0
                        ? "red"
                        : Math.floor(random * 10) % 3 === 0
                        ? "blue"
                        : "green",
                text: `测试弹幕信息`,
                type: `top`
                // type:
                //     Math.floor(random * 10) % 4 === 0
                //         ? "bottom"
                //         : Math.floor(random * 10) % 5 === 0
                //         ? "top"
                //         : "scroll"
            };
            return danmu;
        },
        changeOpacity() {
            this.$refs.danmu.changeDanmuOpacity(0.5);
        },
        changeArea() {
            this.$refs.danmu.changeArea(0.5);
        }
    }
};
</script>
<style lang="scss" scoped>
.player {
    display: block;
    width: 100%;
    height: 400px;
    position: relative;
    border: 1px black solid;
    // background: rgb(0, 0, 0);
}
.video {
    position: absolute;
    left: 5%;
    width: 90%;
    top: 20px;
}
.danmu {
    height: 360px;
    position: absolute;
    left: 5%;
    top: 20px;
    border: 1px blue solid;
    // margin: 20px 5%;
}
</style>7