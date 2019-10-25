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
            displayTimeMsg: "0:0:0",
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
            // console.log(`startPlayer:${new Date().getTime()}`);

            this.lastDisplayTime = new Date();  //记录本次定时器执行时间
            lastTime = lastTime || new Date().getTime();    //记录上次播放停止节点（用于暂停功能）
            this.updatePlayerInfo(lastTime);
            // console.log(`startPlayer updateTime:${new Date().getTime()},lastDisplayTime:${this.lastDisplayTime.getMilliseconds()}`);

            // this.startTimer = setTimeout(() => {
            //     this.startPlayer(this.lastDisplayTime);
            // }, 1000 - this.lastDisplayTime.getMilliseconds());
            this.startTimer = setTimeout(() => {
                this.startPlayer(this.lastDisplayTime);
            }, 1000 - (new Date().getTime() - this.lastDisplayTime.getTime()));

        },
        updatePlayerInfo(lastTime) {
            this.displayMills += new Date().getTime() - lastTime;
            let displayMills = this.displayMills;
            let displayHour = Math.floor(displayMills / (1000 * 60 * 60));
            let displayMinute = Math.floor(displayMills / (1000 * 60) % 60);
            let displaySecond = Math.floor(displayMills / 1000 % 60);
            this.displayTimeMsg = `${displayHour}:${displayMinute}:${displaySecond}`;
            // console.log(`displayTimeMsg:${this.displayTimeMsg}`);

        },
        // pausePlayer() {
        //     clearInterval(this.startTimer);
        //     clearInterval(this.danmuDisplayTimer);
        // },
        pausePlayer() {
            // console.log('暂停播放器')
            // 暂停弹幕池动画
            this.pauseDanmu();
            // this.lastDisplayTime = null;

            // 暂停播放器
            clearTimeout(this.startTimer);
            this.startTimer = null;
            // 暂停弹幕过滤任务
            clearTimeout(this.danmuDisplayTimer);
            this.danmuDisplayTimer = null;
        },
        continuePlayer() {
            // 启动播放器时间线
            this.startPlayer(new Date().getTime());
            // 启动弹幕过滤任务
            this.filterDanmu();
            // 恢复弹幕池动画
            this.continueDanmu();
            // this.continueAnimation();
        },
        // 弹幕数据抓取
        sendDanmuTest() {
            for (let i = 0; i < 1; i++) {
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
                // startTime: this.displayMills + this.lastDisplayTime.getMilliseconds() + Math.floor(random * 1000),
                startTime: this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()) + Math.floor(random * 1000),
                duration: Duration,
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
                // text: `测试弹幕信息${random}`
                text: `测试弹幕信息`

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
            // danmu.text = `${text}`;

            return Object.assign(
                {
                    width: danmu.text.length * danmu.fontSize,
                    height: danmu.fontSize + VerticalMargin * 2,
                    duration: Duration,
                    remainTime: Duration,
                    moveTime: 0
                },
                danmu
            );
        },
        // 定时生成测试弹幕数据
        autoAddDanmu() {
            setTimeout(() => {
                this.manualAddDanmu();
            }, Math.floor(Math.random() * 1000))
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
                Duration}px) translateZ(0)`;
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
        // 实时弹幕

        // 历史弹幕展示
        filterDanmu() {
            let i = 0;
            let currentTime = new Date();   //纠正每次数据过滤偏差
            new Promise((resolve, reject) => {
                let lastDisplayTime = (new Date().getTime() - this.lastDisplayTime.getTime());
                while (i < this.danmuQueue.length) {
                    if (
                        this.danmuQueue[i].startTime <
                        this.displayMills + lastDisplayTime
                    ) {
                        // console.log(`弹幕过期，删除：${this.danmuQueue[i].index},startTime:${this.danmuQueue[i].startTime}`);
                        this.danmuQueue.splice(i, 1);
                        continue;
                    }
                    if (
                        this.danmuQueue[i].startTime >=
                        this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()) + Duration / 10
                    ) {
                        // console.log(`没到播放时间:${this.danmuQueue[i].index}`);
                        i++;
                        continue;
                    }
                    // 展示弹幕
                    this.danmuQueue[i].duration = Duration + (this.danmuQueue[i].startTime - this.displayMills - (new Date().getTime() - this.lastDisplayTime.getTime()));

                    this.danmuQueue[i].createTime = this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime());
                    this.displayDanmu(this.danmuQueue[i], 0);
                    this.danmuQueue.splice(i, 1);
                }
                resolve();
            }).then(() => {
                this.danmuDisplayTimer = setTimeout(() => {
                    this.filterDanmu();
                }, Duration / 10 - (new Date().getTime() - currentTime.getTime()));
            })
        },
        //   弹幕展示控制
        displayDanmu(danmu, poolIndex) {
            let curTime = new Date();
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
            // 寻找适合轨道
            let channelResult = this.channelCheck(danmu, pool);
            if (channelResult) {
                // console.log('find useful channel');
                pool.danmus.push(danmu);
                // 动画展示
                danmu.createTime = this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime());

                danmu.duration = Duration + danmu.startTime - danmu.createTime;
                // setTimeout(() => {
                this.$nextTick(() => {
                    danmu.lastDisplayTime = new Date();

                    let dmDom = this.$refs[danmu.index][0];
                    dmDom.style.position = `absolute`;

                    dmDom.style.top = `${danmu.channelId * 12}px`;
                    dmDom.style.left = `${playerWidth}px`;
                    dmDom.style.color = 'red';
                    dmDom.style.fontSize = `${danmu.fontSize}px`;
                    // dmDom.style.transform = `translateX(-${(playerWidth)}px`;
                    dmDom.style.transition = `transform ${danmu.duration}ms linear 0s`;
                    let animateWidth = Math.ceil(playerWidth + danmu.width) % 2 == 0 ? Math.ceil(playerWidth + danmu.width) : Math.ceil(playerWidth + danmu.width) + 1
                    setTimeout(() => {

                        dmDom.style.transform = `translate3d(-${(animateWidth)}px,0,0)`;

                    }, 50)
                })
                // console.log(`duration1:${Duration + danmu.startTime}`);
                // console.log(`duration2:${Duration + danmu.startTime - danmu.createTime}`);
                // console.log(`设置样式弹幕：${danmu.index}`)

                // console.log(dmDom);
                // dmDom.style.color = danmu.color;
                // resolve();
                // }, 20);
                // })
                // return true;
            } else {
                console.log('0-------')
                // return true;
                this.displayDanmu(danmu, ++poolIndex);
            }
        },
        pauseDanmu() {
            // clearInterval(this.danmuDisplayTimer);

            this.pools.map(pool => {
                pool.danmus &&
                    pool.danmus.map(danmu => {
                        // 弹幕播放结束
                        if (danmu.startTime + Duration < this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) {
                            return;
                        }
                        this.$refs[danmu.index][0].style.transition = "";
                        this.$refs[danmu.index][0].style.transform = "";
                        danmu.moveTime += new Date().getTime() - danmu.lastDisplayTime.getTime();
                        this.$refs[danmu.index][0].style.left = `${playerWidth - (playerWidth + danmu.width) * danmu.moveTime / danmu.duration}px`;

                    });
            });
        },
        continueDanmu() {
            this.pools.map(pool => {
                pool.danmus &&
                    pool.danmus.map(danmu => {
                        danmu.lastDisplayTime = new Date();
                        this.$refs[
                            danmu.index
                        ][0].style.transition = `transform ${danmu.duration - danmu.moveTime}ms linear 0s`;
                        let animateWidth = Math.ceil((playerWidth + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) % 2 == 0 ? Math.ceil((playerWidth + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) : (Math.ceil((playerWidth + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) + 1);
                        this.$refs[
                            danmu.index
                        ][0].style.transform = `translate3d(-${animateWidth}px,0,0)`;
                        this.$refs[danmu.index][0].style.left = `${playerWidth - (playerWidth + danmu.width) * danmu.moveTime / danmu.duration}px`;
                    });
            });
        },
        // 寻找适合轨道
        channelCheck(danmu, pool) {
            let channelNum = Math.ceil(danmu.height / ChannelHeight);
            // console.log("channels：");
            // console.table(pool.channels);
            let channels = pool.channels.filter((channel) => {
                // 当前轨道为空
                if (!channel.danmu.duration) {
                    // console.log(`空白轨道：channelIndex:${channel.index},duration:${channel.danmu.duration}`)
                    return true;
                }
                // 轨道弹幕已出框
                // if (this.displayMills + this.lastDisplayTime.getMilliseconds() - channel.danmu.createTime > channel.danmu.duration) {
                //     return true;
                // }
                // let channelRight = (channel.danmu.width + playerWidth) * (this.displayMills + this.lastDisplayTime.getMilliseconds() - channel.danmu.createTime) / channel.danmu.duration;
                if (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()) - channel.danmu.createTime > channel.danmu.duration) {
                    return true;
                }
                let channelRight = (channel.danmu.width + playerWidth) * (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()) - channel.danmu.createTime) / channel.danmu.duration;

                // 轨道被占满，右侧无空间
                if (channel.danmu.duration && channelRight <= channel.danmu.width) {
                    // console.log(`轨道被占满：channelIndex：${channel.index};channelRight:${channelRight}`)
                    return false;
                }

                let result = channel.danmu.startTime + Duration - (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()) +
                    danmu.duration * playerWidth / (danmu.width + playerWidth))
                // console.log(`channelIndex:${channelIndex},S1endTime:${channel.danmu.startTime + Duration}，S2crashTime:${danmu.startTime + Duration * playerWidth / (danmu.width + playerWidth)}`);
                // console.log(`danmu startTime:${danmu.startTime},duration:${danmu.duration}`)
                // console.log(`result:${result},channelIndex:${channel.index},createTime:${channel.danmu.creatTime}`);
                if (result >= 0) {
                    // console.log(`轨道验证失败：`);
                }
                return result <= 0;
            });
            // console.log("i:" + i);
            if (!channels || channels.length < channelNum) {
                // console.log('当前层没找到适合轨道');
                return false;
            }
            // let p = channels[0].index;
            // console.log('channelIndex:' + channels[0].index + 'channelNum:' + channelNum);
            let i = 0;
            // console.table(channels);
            while (i + channelNum < channels.length) {
                // console.log(`i:${i},channeleNum:${channelNum},channelsLength:${channels.length}`);
                if (channels[i].index + channelNum === channels[i + channelNum].index) {
                    channels.slice(i, i + channelNum).map(channel => {
                        channel.danmu = danmu;
                    });
                    danmu.channelId = channels[i].index;
                    // console.log(`channelIndex:${channels[i].index}`);
                    return true;
                }
                i++;
            }

            // console.log('当前层没找到适合轨道');
            return false;

        }
    }
};