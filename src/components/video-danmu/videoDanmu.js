const SW = document.body.clientWidth || document.documentElement.clientWidth;
const SH = 260;
const playerWidth = SW * 0.9; //playerWidth
// const PH=SH*0.9*
const Duration = 8000; //弹幕生命周期
const ChannelNum = Math.floor(360 / 12);
// const ChannelNum = Math.floor(200 / 12);
const ChannelHeight = 12;
const HorizenMargin = 10;
const VerticalMargin = 5;
export default {
    props: {

    },
    data: function () {
        return {
            // 播放器相关
            displayMills: 0,
            lastDisplayTime: null,
            playerStatus: 'off',     //播放器状态，默认关闭
            startTimer: null, //定时更新控制条时间信息
            displayTimeMsg: "0:0:0",
            // 动画测试相关
            animationTestShow: false,
            animationTestText: "这里是弹幕动画测试",
            animationTestStartTime: 0,
            animationTestRemainTime: 0,
            // 弹幕存储相关
            danmuQueue: [], //待展示弹幕
            danmuFetchTimer: null, //定时收集弹幕信息
            danmuDisplayTimer: null, //定时更新弹幕屏信息
            danmuCreateTimer: null, //不定时生成测试弹幕数据
            danmuRecycleTimer: null, //定时回收已展示弹幕
            pools: [], //弹幕池
            danmuNum: 0,     //弹幕测试
            // 弹幕容器相关
            isHorizontal: false,    //是否横屏
            MinChannelNum: Math.floor(200 / 12),    //竖屏下轨道数量
            overlap: false,  //弹幕是否重叠
        };
    },

    mounted() {
        // 初始化弹幕容器样式
        this.changeOrientation();
        // 监听横竖屏切换
        window.addEventListener('resize', () => {

            this.changeOrientation();
        })
    },
    methods: {
        init() {
            this.playerStatus = 'on';
            this.startPlayer();
            this.filterDanmu();
            this.autoAddDanmu();
            this.recycleDanmu();
        },
        changeOrientation() {
            let SW = document.body.clientWidth || document.documentElement.clientWidth;
            let SH = document.body.clientHeight || document.documentElement.clientHeight;
            let playerEle = this.$refs['danmuContainer'];
            //   播放器宽高变化
            // 竖屏模式
            if (SW < SH) {
                this.isHorizontal = false;
                playerEle.style.width = `${SW * 0.9}px`;
                playerEle.style.height = `200px`;
            } else {
                // 横屏模式
                this.isHorizontal = true;
                playerEle.style.width = `${SW * 0.9}px`;
                playerEle.style.height = `${SH}px`;
            }
        },
        // 只有横屏模式下可以调整弹幕样式
        // 弹幕透明度
        changeDanmuOpacity(param) {
            let danmuContainerEle = this.$refs['danmuContainer'];
            danmuContainerEle.style.opacity = `${param}`;
        },
        // 弹幕显示区域
        changeArea(param) {
            // 未完成----
            // 需要调整MinChannelNum
            if (param > 1) {
                this.overlap = true;
                return;
            }
            let danmuContainerEle = this.$refs['danmuContainer'];
            danmuContainerEle.style.height = `${param * 100}%`;
        },
        // 统一放大缩小字体
        changeFontSize(param) {
            // 未完成-----
            let danmuContainerEle = this.$refs['danmuContainer'];
            // danmuContainerEle.style.transform = `scale(${2},${2})`;
            // danmuContainerEle.style.transform = `scale(2,2)`;
            // 弹幕顶部定位变化
            // 弹幕长度变化

            // 弹幕剩余距离调整
            let fontSizeScale = param;
            if (this.playerStatus === 'on') {
                this.pools.map(pool => {
                    pool.danmus &&
                        pool.danmus.map(danmu => {
                            if (!this.$refs[danmu.index]) {
                                console.log(`danmu.index not exist:${danmu.index}`)
                                return;
                            }
                            // 已移动时间/已移动距离
                            danmu.moveTime += new Date().getTime() - danmu.lastDisplayTime.getTime();
                            danmu.moveDistance = (playerWidth + danmu.width) * danmu.moveTime / danmu.duration;
                            // 更新长度
                            danmu.width = danmu.fontSize * fontSizeScale + HorizenMargin * 2;

                            let danmuEle = this.$refs[danmu.index][0];
                            // 更新动画起点，运动时间距离
                            danmuEle.style.transition = `transform ${danmu.duration - danmu.moveTime}ms linear 0s`;
                            danmuEle.style.left = `${playerWidth - danmu.moveDistance}px`;
                            danmuEle.style.transform = `translate3d(-${playerWidth + danmu.width - danmu.moveDistance}px,0,0)`;

                            danmu.lastDisplayTime = new Date();

                        })
                })

            } else {
                this.pools.map(pool => {
                    pool.danmus.map(danmu => {
                        if (!this.$refs[danmu.index]) {
                            console.log(`danmu.index not exist:${danmu.index}`)
                            return;
                        }
                        let danmuEle = this.$refs[danmu.index][0];
                        if (!danmuEle || !danmuEle[0]) return;
                        danmu.width = danmu.fontSize * fontSizeScale + HorizenMargin * 2;
                    })
                })
            }

        },
        // 播放器相关
        startPlayer(lastTime) {
            // console.log(`startPlayer:${new Date().getTime()}`);
            this.playerStatus = 'on';
            this.lastDisplayTime = new Date();  //记录本次定时器执行时间
            lastTime = lastTime || new Date().getTime();    //记录上次播放停止节点（用于暂停功能）
            this.updatePlayerInfo(lastTime);

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
        },
        pausePlayer() {
            this.playerStatus = 'off';
            // 暂停播放器
            clearTimeout(this.startTimer);
            this.startTimer = null;
            // 暂停弹幕过滤任务
            clearTimeout(this.danmuDisplayTimer);
            this.danmuDisplayTimer = null;
            // 暂停自动生成弹幕测试数据
            clearTimeout(this.danmuCreateTimer);
            this.danmuCreateTimer = null;
            // 暂停弹幕池动画
            this.pauseDanmu();
        },
        continuePlayer() {
            // 顺序不能变更
            this.playerStatus = 'on';

            // 启动播放器时间线
            this.startPlayer(new Date().getTime());
            // 恢复弹幕池动画
            this.continueDanmu();

            // 启动弹幕过滤任务
            this.filterDanmu();

            this.autoAddDanmu();

        },
        // 修改进度条
        changePlayer(newDisplayMills) {
            // 更新时间线
            this.displayMills = newDisplayMills;
            this.lastDisplayTime = new Date();
            // 清空弹幕队列
            clearTimeout(this.danmuDisplayTimer);
            this.danmuQueue = [];
            // 清空弹幕池
            this.pools = []
            // 重抓弹幕数据
            // this.filterDanmu();
            this.autoAddDanmu();
        },
        manualAddDanmu() {
            let random = Math.random();
            let danmu = {
                index: this.danmuNum++,
                // index: random,
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
                            ? "blue"
                            : "green",
                text: `测试弹幕信息`

            };
            danmu = this.refactorDanmu(danmu);
            return danmu;
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
                    remainTime: Duration,
                    moveTime: 0
                },
                danmu
            );
        },
        // 弹幕层轨道初始化
        initChannels() {
            let channelList = [];
            for (let i = 0; i < ChannelNum; i++) {
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
        // 定时生成测试弹幕数据
        autoAddDanmu() {
            let danmu = this.manualAddDanmu();
            // console.log(`自动生成弹幕:${danmu.index}`);
            this.danmuQueue.push(danmu);
            this.danmuCreateTimer = setTimeout(() => {
                this.autoAddDanmu();
            }, Math.floor(Math.random() * 500));
        },
        // 手动回收弹幕数据
        recycleDanmu() {
            this.pools.map((pool, poolIndex) => {
                pool.danmus.map((danmu, danmuIndex) => {
                    let result = danmu.startTime - (this.displayMills - Duration * 2);
                    if (result < 0) {
                        pool.danmus.splice(danmuIndex, 1);
                    }
                })

                if (!pool || !pool.danmus || pool.danmus.length === 0) {
                    this.pools.splice(poolIndex, 1);
                }
            })
            this.danmuRecycleTimer = setTimeout(() => {
                this.recycleDanmu();
            }, Duration / 10)
        },
        // 实时弹幕
        sendDanmu() {
            let danmu = this.manualAddDanmu();
            // 弹幕播放时间为当前时间线
            danmu.startTime = this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime());
            //   http请求
            danmu.createTime = this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime());
            console.log(`新增弹幕：${danmu.index}`)
            this.displayDanmu(danmu, 0);
        },
        // 历史弹幕展示
        // 定期抓取弹幕数据,每屏幕抓取一次，一次抓取3屏幕
        fetchDanmuData() {
            let currentTime = new Date();
            new Promise(() => {
                let fetchData = this.displayMills;
                this.danmuQueue.push(fetchData.slice(fetchData.findIndex((item) => {
                    return item.startTime >= this.danmuQueue[this.danmuQueue.length - 1].startTime;
                }), fetchData.length))
                resolve();
            }).then(() => {
                this.danmuFetchTimer = setTimeout(() => {
                    this.fetchDanmuData();
                }, Duration - (new Date().getTime - currentTime.getTime()))
            })
        },
        // 定期更新+回收弹幕池数据 Duration/10
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
                // this.recycleDanmu();
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
            if (this.channelCheck(danmu, pool)) {
                // dom节点生成
                pool.danmus.push(danmu);
                this.$nextTick(() => {
                    danmu.lastDisplayTime = new Date();
                    danmu.createTime = this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime());
                    danmu.duration = Duration + danmu.startTime - danmu.createTime;
                    let danmuEle = this.$refs[danmu.index][0];
                    //弹幕样式初始化
                    this.danmuStyleInit(danmuEle, danmu);
                    if (this.playerStatus !== 'on') return;
                    // 动画展示
                    let animateWidth = Math.ceil(playerWidth + danmu.width) % 2 == 0 ? Math.ceil(playerWidth + danmu.width) : Math.ceil(playerWidth + danmu.width) + 1
                    setTimeout(() => {

                        danmuEle.style.transition = `transform ${danmu.duration}ms linear 0s`;
                        danmuEle.style.transform = `translate3d(-${(animateWidth)}px,0,0)`;
                    }, 20)
                })
            } else {
                this.displayDanmu(danmu, ++poolIndex);
            }
        },
        // 弹幕样式设置
        danmuStyleInit(danmuEle, danmu) {
            danmuEle.style.position = `absolute`;
            danmuEle.style.top = `${danmu.channelId * 12}px`;
            danmuEle.style.left = `${playerWidth}px`;
            danmuEle.style.color = danmu.color;
            danmuEle.style.fontSize = `${danmu.fontSize}px`;
            danmuEle.style.transition = `transform ${danmu.duration}ms linear 0s`;
        },
        pauseDanmu() {
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
                        danmu.moveDistance = (playerWidth + danmu.width) * danmu.moveTime / danmu.duration;
                        this.$refs[danmu.index][0].style.left = `${playerWidth - danmu.moveDistance}px`;

                    });
            });
        },
        continueDanmu() {
            this.pools.map(pool => {
                pool.danmus &&
                    pool.danmus.map(danmu => {
                        danmu.lastDisplayTime = new Date();
                        if (!this.$refs[danmu.index]) {
                            console.log(`danmu.index not exist:${danmu.index}`)
                            return;
                        }
                        this.$refs[
                            danmu.index
                        ][0].style.transition = `transform ${danmu.duration - danmu.moveTime}ms linear 0s`;
                        let animateWidth = Math.ceil((playerWidth + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) % 2 == 0 ? Math.ceil((playerWidth + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) : (Math.ceil((playerWidth + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) + 1);
                        this.$refs[
                            danmu.index
                        ][0].style.transform = `translate3d(-${playerWidth + danmu.width - danmu.moveDistance}px,0,0)`;
                        this.$refs[danmu.index][0].style.left = `${playerWidth - danmu.moveDistance}px`;
                    });
            });
        },
        // 寻找适合轨道
        channelCheck(danmu, pool) {
            let danmuChannelNum = Math.ceil(danmu.height / ChannelHeight);
            let channels = pool.channels.filter((channel) => {
                // 当前轨道为空
                if (!channel.danmu.duration) {
                    return true;
                }
                // 轨道弹幕已出框
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
                if (result >= 0) {
                    // console.log(`轨道验证失败：`);
                }
                return result <= 0;
            });
            // console.log("i:" + i);
            if (!channels || channels.length < danmuChannelNum) {
                // console.log('当前层没找到适合轨道');
                return false;
            }
            let i = 0;
            while (i + danmuChannelNum < channels.length) {
                // console.log(`i:${i},channeleNum:${channelNum},channelsLength:${channels.length}`);
                if (channels[i].index + danmuChannelNum === channels[i + danmuChannelNum].index) {
                    channels.slice(i, i + danmuChannelNum).map(channel => {
                        channel.danmu = danmu;
                    });
                    danmu.channelId = channels[i].index;
                    danmu.channelNum = danmuChannelNum;
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