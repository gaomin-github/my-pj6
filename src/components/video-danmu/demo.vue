<template>
    <section>
        <!-- <h3>this is videoDanmuDemo</h3> -->
        <video-danmu ref="danmu" :videoMills="videoMills"></video-danmu>
        <section class="control">
            <button @click="start">播放</button>
            <button @click="pauseDanmu">暂停</button>
            <button @click="continueDanmu">继续</button>
            <button @click="sendData">增加实时弹幕</button>
            <button @click="addDanmu">追加弹幕</button>
            <button @click="addVideoMills(videoMills+10000)">快进</button>
        </section>
    </section>
</template>
<script>
import videoDanmu from "./videoDanmu.vue";
export default {
    data: function() {
        return {
            videoMills: 10000,
            // 测试用例数据
            danmuNum: 0
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
            danmu.startTime = this.timeline;
            //   http请求
            danmu.createTime = this.timeline;
            console.log(`新增弹幕：${danmu.index}`);
            this.$refs.danmu.sendDanmu(danmu);
        },
        // 历史弹幕展示
        // 定期抓取弹幕数据,每屏幕抓取一次，一次抓取3屏幕
        // 定时生成测试弹幕数据
        addDanmu() {
            let danmuList = [];
            for (let i; i < 10; i++) {
                let danmu = this.manualAddDanmu();
                console.log(`自动生成弹幕:${danmu.index}`);
                danmuList.push(danmu);
            }
            this.danmuCreateTimer = setTimeout(() => {
                this.$refs.danmu.addDanmu(danmuList);
            }, Math.floor(Math.random() * 5000));
        },
        manualAddDanmu() {
            let random = Math.random();
            let danmu = {
                index: this.danmuNum++,
                startTime: this.videoMills + Math.floor(random * 10000),
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
                text: `测试弹幕信息`
            };
            return danmu;
        }
    }
};
</script>
<style lang="scss" scoped>
.demo_title {
    cursor: pointer;
}
</style>7