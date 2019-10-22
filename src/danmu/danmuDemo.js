const SW = document.body.clientWidth || document.documentElement.clientWidth;
const SH = 260;
const playerWidth = SW * 0.6; //playerWidth
// const PH=SH*0.9*
const Duration = 8000; //弹幕生命周期
const channelNum = Math.floor(SH / 12);
const ChannelHeight = 12;
const HorizenMargin = 10;
const VerticalMargin = 5;
export default {
    data: function () {
        return {
            // 播放器相关
            // startMills: 0,
            displayMills: 0,
            lastDisplayTime: null,
            startTimer: null, //定时更新控制条时间信息
            displayTimeMsg: "00:00:00",
            // 动画测试相关
            animationTestShow: false,
            animationTestText: "这里是弹幕动画测试",
            animationTestStartTime: 0,
            animationTestRemainTime: 0,
            // 弹幕存储相关
            danmuQueue: [], //待展示弹幕
            visiableDanmus: [], //正在展示弹幕
            danmuCollectTimer: null, //定时收集弹幕信息
            danmuDisplayTimer: null, //定时更新弹幕屏信息
            danmuFilterTimer: null, //定时销毁弹幕dom节点

            pools: [], //弹幕池
            danmuNum: 0,     //弹幕测试
        };
    },
    mounted() {
        // this.init();
    },
    methods: {
        // 播放器相关
        // startPlayer(lastTime) {
        //     //   初始化计数器
        //     lastTime = lastTime ? lastTime : 0;
        //     // console.log("lastTime:" + lastTime);

        //     let startMills = new Date().getTime();
        //     this.startTimer = setInterval(() => {
        //         let currentMills = new Date().getTime();
        //         this.displayMills = lastTime + currentMills - startMills;
        //         //   console.log("displaymills/" + this.displayMills);
        //         let displayHour = Math.floor(
        //             this.displayMills / (1000 * 60 * 60)
        //         );
        //         let displayMinute = Math.floor(
        //             (this.displayMills - 1000 * 60 * 60 * displayHour) /
        //             (1000 * 60)
        //         );
        //         let displaySecond = Math.ceil(
        //             (this.displayMills -
        //                 1000 * 60 * 60 * displayHour -
        //                 1000 * 60 * displayMinute) /
        //             1000
        //         );
        //         this.displayTimeMsg = `${displayHour} h::${displayMinute} m::${displaySecond} s`;
        //     }, 50);
        //     // 数据和动画初始化
        //     this.filterDanmu();
        // },
        init() {
            this.startPlayer();
            this.filterDanmu();
        },
        startPlayer(lastTime) {
            // console.log(`lastTime：${lastTime}`);
            lastTime = lastTime || new Date().getTime();
            let currentTime = new Date();
            this.displayMills += currentTime.getTime() - lastTime;
            this.updatePlayerInfo(this.displayMills);
            // 开始弹幕展示
            this.lastDisplayTime = currentTime;
            // this.filterDanmu();
            this.startTimer = setTimeout(() => {
                this.startPlayer(currentTime.getTime());
            }, 1000 - currentTime.getMilliseconds());
        },
        updatePlayerInfo(displayMills) {
            let displayHour = Math.floor(displayMills / (1000 * 60 * 60));
            let displayMinute = Math.floor(displayMills / (1000 * 60) % 60);
            let displaySecond = Math.floor(displayMills / 1000 % 60);
            this.displayTimeMsg = `${displayHour}:${displayMinute}:${displaySecond}s`;
        },
        // pausePlayer() {
        //     clearInterval(this.startTimer);
        //     clearInterval(this.danmuDisplayTimer);
        // },
        pausePlayer() {
            console.log('暂停播放器')
            clearTimeout(this.startTimer);
            this.startTimer = null;
            clearTimeout(this.danmuDisplayTimer);
            this.danmuDisplayTimer = null;
        },
        // continuePlayer() {
        //     this.startPlayer(this.displayMills);
        //     // this.continueAnimation();
        //     this.continueDanmu();
        // },
        continuePlayer() {
            this.startPlayer(new Date().getTime());
            // this.continueAnimation();
            // this.continueDanmu();
            // this.init()
        },
        // 弹幕数据抓取
        sendDanmuTest() {
            for (let i = 0; i < 5; i++) {
                this.manualAddDanmu();
                // this.filterDanmu();
            }
            // console.table(this.danmuQueue);
        },
        manualAddDanmu() {
            let random = Math.random();
            let danmu = {
                index: this.danmuNum++,
                // index: random,
                startTime: this.displayMills + Math.floor(random * 1000),
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
                            ? "white"
                            : "green",
                // text: `danmu${random}`
                text: `测试弹幕信息${random}`
            };
            danmu = this.refactorDanmu(danmu);
            // console.log(`danmu.index:${danmu.index}`);
            this.danmuQueue.push(danmu);
        },
        refactorDanmu(danmu) {
            let text = '';
            let random = Math.random();
            for (let i = 0; i < Math.floor(random * 10); i++) {
                text += '测试';
            }
            danmu.text = `${text},${danmu.index}`;
            return Object.assign(
                {
                    width: danmu.text.length * danmu.fontSize + HorizenMargin * 2,
                    height: danmu.fontSize + VerticalMargin * 2,
                    duration: Duration,
                    remainTime: Duration
                },
                danmu
            );
        },
        autoAddDanmu() {
            // setInterval(this.manualAddDanmu, 2000);
        },
        // 动画效果测试
        displayAnimation() {
            this.animationTestStartTime = this.displayMills;
            this.animationTestRemainTime = Duration;
            this.animationTestShow = true;
            setTimeout(() => {
                let animationDom = this.$refs.animationItem;
                animationDom.style.left = `${playerWidth}px`;
                animationDom.style.margin = `${VerticalMargin}px ${HorizenMargin}px`;
                animationDom.style.transition = `transform ${Duration}ms linear 0s`;
                animationDom.style.transform = `translateX(-${playerWidth +
                    this.animationTestText.length * 16}px)`;
            }, 0);
        },
        pauseAnimation() {
            // this.animationTestRemainTime -=
            //   new Date().getTime() - this.animationTestStartTime;
            this.animationTestRemainTime =
                Duration - (this.displayMills - this.animationTestStartTime);
            console.log(
                "animationTestRemainTime:" + this.animationTestRemainTime
            );
            let animationDom = this.$refs.animationItem;
            animationDom.style.left = `${playerWidth -
                ((playerWidth + this.animationTestText.length * 16) *
                    (Duration - this.animationTestRemainTime)) /
                Duration}px`;
            animationDom.style.transform = "";
            animationDom.style.transition = ``;
        },
        continueAnimation() {
            // this.animationTestStartTime = new Date().getTime();
            let animationDom = this.$refs.animationItem;
            animationDom.style.transform = `translateX(-${((playerWidth +
                this.animationTestText.length * 16) *
                this.animationTestRemainTime) /
                Duration}px)`;
            animationDom.style.transition = `transform ${this.animationTestRemainTime}ms linear 0s`;
        },
        startDanmu() {
            this.filterDanmu();
        },
        // 轨道初始化
        initChannels() {
            let channelList = [];
            for (let i = 0; i < channelNum; i++) {
                channelList[i] = {
                    index: i,
                    danmu: {
                        startTime: 0,
                        duration: 0
                    }
                };
            }
            return channelList;
        },
        // filterDanmu() {
        //     // 不漏掉数据关键在当前时间，统一用一个当前时间？分次获取？后续修改？
        //     // 定期抓取弹幕信息
        //     // console.log('Duration:' + Duration / 4);
        //     // console.log("定期抓取弹幕信息");
        //     this.danmuDisplayTimer = setInterval(() => {
        //         // console.table(this.pools[0] && this.pools[0].danmus);
        //         let i = 0;
        //         while (i < this.danmuQueue.length) {
        //             // console.log(`danmuQueue.length:${this.danmuQueue.length}`);
        //             // if (
        //             //     this.danmuQueue[i].startTime <
        //             //     this.displayMills - Duration / 4
        //             // ) {
        //             if (
        //                 this.danmuQueue[i].startTime <
        //                 this.displayMills - 100
        //             ) {
        //                 console.log(`弹幕过期，删除：${this.danmuQueue[i].index}`);
        //                 this.danmuQueue.splice(i, 1);
        //                 // console.log(`删除后${this.danmuQueue.length}`);
        //                 // console.table(this.danmuQueue);
        //                 // continue;
        //             } else if (
        //                 this.danmuQueue[i].startTime >
        //                 this.displayMills + 100
        //             ) {
        //                 i++;
        //                 console.log(`没到播放时间:${this.danmuQueue[i].index}`);
        //                 // continue;
        //             } else {
        //                 // console.log(`展示弹幕:${this.danmuQueue[i].index}`);
        //                 this.displayDanmu(this.danmuQueue[i], 0);
        //                 this.danmuQueue.splice(i, 1);
        //                 // i++;
        //             }
        //         }
        //     }, Duration / 20);
        // },
        async filterDanmu() {
            // 不漏掉数据关键在当前时间，统一用一个当前时间？分次获取？后续修改？
            // startTime<timeline：过期弹幕
            // startTime > timeline + Duration / 10 未到播放时间不可播弹幕
            // timeline=displayMills+lastDisplayTime.getMilliseconds()
            // new Promise(() => {
            let i = 0;
            // console.log('filterDanmu');
            new Promise(async (resolve, reject) => {
                while (i < this.danmuQueue.length) {
                    if (
                        this.danmuQueue[i].startTime <
                        this.displayMills + this.lastDisplayTime.getMilliseconds()
                    ) {
                        console.log(`弹幕过期，删除：${this.danmuQueue[i].index}`);
                        this.danmuQueue.splice(i, 1);
                    } else if (
                        this.danmuQueue[i].startTime >=
                        this.displayMills + this.lastDisplayTime.getMilliseconds() + Duration / 10
                    ) {
                        console.log(`没到播放时间:${this.danmuQueue[i].index}`);
                        i++;
                        // continue;
                    } else {
                        // 展示弹幕
                        // 动画事件校正
                        this.danmuQueue[i].duration = Duration - (this.danmuQueue[i].startTime - this.displayMills - this.lastDisplayTime.getMilliseconds());
                        this.danmuQueue[i].createTime = new Date();
                        // this.displayDanmu(this.danmuQueue[i], 0);
                        // this.danmuQueue.splice(i, 1);
                        console.log(`展示弹幕:${this.danmuQueue[i].index}`);
                        // await new Promise((resolve, reject) => {
                        //     this.displayDanmu(this.danmuQueue[i], 0);
                        //     resolve();
                        //     // i++;
                        // }).then(() => {
                        //     console.log(`删除已展示item:${this.danmuQueue[i].index}`);
                        //     this.danmuQueue.splice(i, 1);
                        // })
                        await this.displayDanmu(this.danmuQueue[i], 0);
                        console.log(`删除已展示item:${this.danmuQueue[i].index}`);
                        this.danmuQueue.splice(i, 1);
                    }
                }
                resolve();
            }).then(() => {
                this.danmuDisplayTimer = setTimeout(() => {
                    this.filterDanmu();
                }, Duration / 10);
            })
            // return;
            // }).then(() => {

            // })
        },
        //   弹幕展示控制
        displayDanmu(danmu, poolIndex) {
            // 寻找适合面板层
            if (this.pools.length === poolIndex) {
                this.pools.push({
                    channels: this.initChannels(),
                    danmus: []
                });
            }
            let pool = this.pools[poolIndex];
            if (danmu.height > SH) {
                console.log("error factor danmu");
                return;
            }
            // if (pool.height + danmu.height > SH) {
            //     this.displayDanmu(danmu, ++poolIndex);
            //     return;
            // }
            // 寻找适合轨道
            // console.log(`poolIndex:${poolIndex}`);
            // console.log(`展示弹幕:${danmu.index}`);
            let channelResult = this.channelCheck(danmu, pool);
            // console.log(`channelResult:${channelResult}`);
            if (channelResult) {
                // console.log('find useful channel');
                //   danmu.channelId = channelIndex;
                pool.danmus.push(danmu);
                // let danmuIndex = this.danmuQueue.findIndex(o => {
                //     if (o.index === danmu.index) {
                //         console.log(`delete index ${danmu.index}`)
                //         return true;
                //     } else {
                //         return false;
                //     }
                //     // return o.index === danmu.index
                // })
                // this.danmuQueue.splice(danmuIndex, 1);
                // console.log(`删除后${this.danmuQueue.length}`);

                // 动画展示
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        danmu.duration = danmu.duration - danmu.createTime.getMilliseconds();
                        console.log(`设置样式弹幕：${danmu.index}`)
                        let dmDom = this.$refs[danmu.index][0];
                        // console.log(dmDom);
                        dmDom.style.position = `absolute`;

                        dmDom.style.top = `${danmu.channelId * 12}px`;
                        dmDom.style.left = `${playerWidth}px`;
                        // dmDom.style.color = danmu.color;
                        dmDom.style.color = 'red';
                        dmDom.style.fontSize = `${danmu.fontSize}px`;
                        dmDom.style.transition = `transform ${danmu.duration}ms linear 0s`;
                        // dmDom.style.transform = `translateX(-${(playerWidth)}px`;
                        dmDom.style.transform = `translateX(-${(playerWidth + danmu.width)}px`;
                        resolve();
                    }, 1000);
                })
                // return true;
            } else {
                console.log('0-------')
                // return true;
                // this.displayDanmu(danmu, ++poolIndex);
            }
        },
        pauseDanmu() {
            clearInterval(this.danmuDisplayTimer);
            // clearInterval(this.danmuFilterTimer);
            // this.pools.map(pool => {
            //     pool.danmus &&
            //         pool.danmus.map(danmu => {
            //             danmu.remainTime =
            //                 Duration - (this.displayMills - danmu.startTime);
            //             this.$refs[danmu.index][0].style.transition = "";
            //             this.$refs[danmu.index][0].style.transform = "";
            //             this.$refs[danmu.index][0].style.left = `${playerWidth -
            //                 ((playerWidth +
            //                     danmu.text.length * danmu.fontSize) *
            //                     (Duration - danmu.remainTime)) /
            //                 Duration}px`;
            //         });
            // });
        },
        continueDanmu() {
            this.pools.map(pool => {
                pool.danmus &&
                    pool.danmus.map(danmu => {
                        danmu.remainTime =
                            Duration - (this.displayMills - danmu.startTime);
                        this.$refs[
                            danmu.index
                        ][0].style.transition = `transform ${danmu.remainTime}ms linear 0s`;
                        this.$refs[
                            danmu.index
                        ][0].style.transform = `translateX(-${((playerWidth +
                            danmu.fontSize * danmu.text.length) *
                            danmu.remainTime) /
                        Duration}px)`;
                        this.$refs[danmu.index][0].style.left = `${playerWidth -
                            ((playerWidth +
                                danmu.text.length * danmu.fontSize) *
                                (Duration - danmu.remainTime)) /
                            Duration}px`;
                    });
            });
        },
        // 寻找适合轨道
        channelCheck(danmu, pool) {
            let channelNum = Math.ceil(danmu.height / ChannelHeight);
            // console.log("channels：");
            // console.table(pool.channels);
            let channels = pool.channels.filter((channel) => {
                let result = channel.danmu.startTime + channel.danmu.duration - (danmu.startTime +
                    danmu.duration * playerWidth / (danmu.width + playerWidth))
                // console.log(`channelIndex:${channelIndex},S1endTime:${channel.danmu.startTime + Duration}，S2crashTime:${danmu.startTime + Duration * playerWidth / (danmu.width + playerWidth)}`);
                // console.log(`danmu startTime:${danmu.startTime},duration:${danmu.duration}`)
                // return (
                //     channel.danmu.startTime + Duration <=
                //     danmu.startTime +
                //     Duration * playerWidth / (danmu.width + playerWidth)
                // );
                // console.log(`result:${result},channelIndex:${channel.index}`);
                if (result >= 0) {
                    // console.log(`轨道验证失败：`);
                }
                return result <= 0;
            });
            // console.log("i:" + i);
            if (!channels || channels.length < channelNum) {
                console.log('当前层没找到适合轨道');
                return false;
            }
            // let i = channels[0].index;
            // console.log('channelIndex:' + channels[0].index + 'channelNum:' + channelNum);

            // console.table(channels);
            // while (i + channelNum - 1 <= channels[channels.length - 1].index) {
            //     if (i + channelNum - 1 === channels[i + channelNum - 1].index) {
            //         channels.slice(i, i + channelNum).map(channel => {
            //             channel.danmu = danmu;
            //         });
            //         danmu.channelId = i;
            //         return true;
            //     }
            //     i++;
            // }
            let i = 0;
            // console.table(channels);
            while (i + channelNum < channels.length) {
                // console.log(`i:${i},channeleNum:${channelNum},channelsLength:${channels.length}`);
                if (channels[i].index + channelNum === channels[i + channelNum].index) {
                    channels.slice(i, i + channelNum).map(channel => {
                        channel.danmu = danmu;
                    });
                    danmu.channelId = channels[i].index;
                    console.log(`channelIndex:${channels[i].index}`);
                    return true;
                }
                i++;
            }

            console.log('当前层没找到适合轨道');
            return false;

        }
    }
};