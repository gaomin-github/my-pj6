const ChannelNum = Math.floor(360 / 12);
const ChannelHeight = 12;
const HorizenMargin = 10;
const VerticalMargin = 0;   //弹幕之间的垂直间距
const AdditionLineHeight = 0;   //弹幕行间距
const MinHeight = 360;
// 弹幕区宽
// 弹幕区高

// 对外方法
// 1.添加弹幕（追加弹幕数据，新增实时弹幕）
// 2.修改弹幕播放速度
// 2.修改弹幕播放时间进度（初始化，快进，后退）
// 3.修改弹幕样式（初始化宽高，横竖屏切换设置，透明度，显示区域，是否重叠，容器宽高）

// 页面卡顿优化：及时回收不需要资源
// pool层超过1层引起卡顿
export default {
    props: {
        // 视频初始化进度
        videoMills: {
            type: Number,
            default: 0
        },
        // 弹幕容器宽
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        //弹幕是否重叠
        overlap: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 8000
        }
    },
    data: function () {
        return {
            // duration: 12000,
            // 播放器相关
            displayMills: this.videoMills,
            lastDisplayTime: null,
            playerStatus: 'off',     //播放器状态，默认关闭
            startTimer: null, //定时更新控制条时间信息
            displayTimeMsg: "0:0:0",
            // 弹幕存储相关
            danmuQueue: [], //待展示弹幕
            danmuDisplayTimer: null, //定时更新弹幕屏信息
            danmuCreateTimer: null, //不定时生成测试弹幕数据
            danmuRecycleTimer: null, //定时回收已展示弹幕

            animationDelay: null,
            pools: [], //弹幕池
            ifShowScroll: true,
            topPools: [],    //顶部弹幕池
            ifShowTop: true,
            bottomPools: [],     //底部弹幕池
            ifShowBottom: true,
            danmuNum: 0,     //弹幕测试
            // 弹幕容器相关
            isHorizontal: false,    //是否横屏
            MinChannelNum: Math.floor(MinHeight / 12),    //竖屏下轨道数量
        };
    },
    mounted() {
        // 初始化弹幕容器样式
        // this.initDanmuContainer();
        this._changeOrientation();
        // 监听横竖屏切换
        window.addEventListener('resize', () => {

            this._changeOrientation();
        })
    },
    // 弹幕速度调整
    watch: {
        duration(newDuration, oldDuration) {
            console.log(`watch,newDuration:${newDuration},oldDuration:${oldDuration}`);
            // 修改弹幕列表运行时间
            this.danmuQueue = this.danmuQueue.map(danmu => {
                danmu.duration = this.duration;
                return danmu;
            })
            // 修改弹幕池运行时间

            this.pools.map((pool, poolIndex) => {
                // console.log(`pool.danmus.length :${pool.danmus.length}`);

                pool.danmus.map(danmu => {
                    if (!this.$refs[danmu.index]) {
                        console.log(`danmu.index not exist:${danmu.index}`);
                        danmu.duration = this.duration;
                        return danmu;
                    }
                    let danmuEle = this.$refs[danmu.index][0];
                    danmu.moveTime += (new Date().getTime() - danmu.lastDisplayTime.getTime());
                    danmu.lastDisplayTime = new Date();
                    danmu.moveDistance = (this.containerWidth() + danmu.width) * danmu.moveTime / danmu.duration;
                    // danmuEle.style.transition = '';
                    // danmuEle.style.transform = '';
                    danmuEle.style.cssText += `;transition:transform 0s;transform:translateX(0);` + `left:${this.containerWidth() - danmu.moveDistance}px;color:'red';`;

                    danmu.duration = this.duration - (oldDuration - danmu.duration);
                    setTimeout(() => {
                        if (danmu.duration > danmu.moveTime + 20) {
                            danmuEle.style.cssText += `transition:transform ${danmu.duration - danmu.moveTime - 20}ms linear 0s;transform:translateX(-${this.containerWidth() + danmu.width - danmu.moveDistance}px)`;

                        } else {
                            danmuEle.style.cssText += `transform:translateX(-${this.containerWidth() + danmu.width - danmu.moveDistance}px)`;
                        }

                    }, 20);

                    return danmu;
                })
            })
        }
    },
    methods: {
        // 对外接口
        // 弹幕初始化
        init() {
            this.playerStatus = 'on';
            this.startPlayer();
            this._filterDanmu();
            // this.autoDanmu();
            // this.autoAddDanmu();
            this._recycleDanmu();
        },
        // 横竖屏切换
        _changeOrientation() {
            let SW = document.body.clientWidth || document.documentElement.clientWidth;
            let SH = document.body.clientHeight || document.documentElement.clientHeight;
            this.isHorizontal = SW > SH ? true : false;
            // console.log(`playerWidth1:${this.containerWidth()}`);
            // console.log(`playerHeight:${this.containerHeight()}`);

            let playerEle = this.$refs['playerContainer'];
            //   播放器宽高变化
            playerEle.style.width = `${this.containerWidth()}px`;
            playerEle.style.height = `${this.containerHeight()}px`;
        },
        containerWidth() {
            let SW = document.body.clientWidth || document.documentElement.clientWidth;
            return this.width ? this.width : SW * 0.9;
        },
        containerHeight() {
            let SH = document.body.clientHeight || document.documentElement.clientHeight;
            return this.height ? this.height : this.isHorizontal ? SH : MinHeight;

        },
        // 只有横屏模式下可以调整弹幕样式
        // 弹幕透明度
        changeDanmuOpacity(param) {
            let danmuContainerEle = this.$refs['playerContainer'];
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
            let danmuContainerEle = this.$refs['playerContainer'];
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
                            danmu.moveDistance = (this.containerWidth() + danmu.width) * danmu.moveTime / danmu.duration;
                            // 更新长度
                            danmu.width = danmu.fontSize * fontSizeScale + HorizenMargin * 2;

                            let danmuEle = this.$refs[danmu.index][0];
                            // 更新动画起点，运动时间距离
                            danmuEle.style.transition = `transform ${danmu.duration - danmu.moveTime}ms linear 0s`;
                            // danmuEle.style.left = `${this.containerWidth() - danmu.moveDistance}px`;
                            danmuEle.style.transform = `translate3d(-${this.containerWidth() + danmu.width - danmu.moveDistance}px,0,0)`;

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
            // console.log(`Player:${new Date().getTime()}`);
            this.playerStatus = 'on';
            this.lastDisplayTime = new Date();  //记录本次定时器执行时间
            lastTime = lastTime || new Date().getTime();    //记录上次播放停止节点（用于暂停功能）
            // 更新显示信息
            // console.log(`videoMills:${this.videoMills}`);
            // console.log(`displayMills1:${this.displayMills}`);
            this.displayMills += new Date().getTime() - lastTime;
            // console.log(`displayMills2:${this.displayMills}`);
            let displayMills = this.displayMills;
            let displayHour = Math.floor(displayMills / (1000 * 60 * 60));
            let displayMinute = Math.floor(displayMills / (1000 * 60) % 60);
            let displaySecond = Math.floor(displayMills / 1000 % 60);
            this.displayTimeMsg = `${displayHour}:${displayMinute}:${displaySecond}`;

            this.startTimer = setTimeout(() => {
                this.startPlayer(this.lastDisplayTime);
            }, 1000 - (new Date().getTime() - this.lastDisplayTime.getTime()));

        },
        pausePlayer() {
            // 会有个别动画效果不停？
            this.playerStatus = 'off';
            // 暂停弹幕过滤任务
            clearTimeout(this.danmuDisplayTimer);
            this.danmuDisplayTimer = null;
            // 暂停自动生成弹幕测试数据
            clearTimeout(this.danmuCreateTimer);
            this.danmuCreateTimer = null;
            // 暂停弹幕池动画
            this._pauseDanmu();
            // 暂停播放器
            clearTimeout(this.startTimer);
            this.startTimer = null;
            // 暂停弹幕回收
            clearTimeout(this.danmuRecycleTimer);
            this.danmuRecycleTimer = null;
            // 清理延迟处理
            clearTimeout(this.animationDelay);
            this.animationDelay = null;

        },
        continuePlayer() {
            // 顺序不能变更
            this.playerStatus = 'on';
            // 启动播放器时间线
            this.startPlayer(new Date().getTime());
            // 恢复弹幕池动画
            this._continueDanmu();
            // 启动弹幕过滤任务
            this._filterDanmu();
            // 启动弹幕回收
            this._recycleDanmu();
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
            this.pools = [];
            this.topPools = [];
            this.bottomPools = [];
            // 重抓弹幕数据
            this._filterDanmu();
        },
        // 隐藏/展示 底/顶/滚动弹幕
        controlDanmuShow(type, ifShow) {
            switch (type) {
                case 'scroll': {
                    this.ifShowScroll = ifShow
                    break;
                }
                case 'top': {
                    this.ifShowTop = ifShow
                    break;
                }
                case 'bottom': {
                    this.ifShowBottom = ifShow
                    break;
                }
            }
        },
        _refactorDanmu(danmu) {
            let text = '';
            let random = Math.random();
            for (let i = 0; i < Math.floor(random * 10); i++) {
                text += '测试';
            }
            danmu.text = `${text},${danmu.index}`;
            danmu.width = danmu.text.length * danmu.fontSize + HorizenMargin * 2;
            return Object.assign(
                {
                    // height: danmu.type === 'scroll' ? danmu.fontSize : 'top' || 'bottom' ? danmu.danmuChannelNum * (danmu.fontSize + AdditionLineHeight) : 0 + VerticalMargin * 2,
                    height: danmu.type === 'scroll' ? danmu.fontSize : 'top' || 'bottom' ? (Math.ceil(danmu.width / this.containerWidth())) * danmu.fontSize : 0 + VerticalMargin * 2,

                    duration: this.duration,
                    remainTime: this.duration,
                    moveTime: 0
                },
                danmu
            );
        },
        // 弹幕层轨道初始化
        _initChannels() {
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
        // 回收弹幕数据
        _recycleDanmu() {
            this.pools.map((pool, poolIndex) => {
                pool.danmus.map((danmu, danmuIndex) => {
                    let result = danmu.startTime - (this.displayMills - this.duration * 2);
                    if (result < 0) {
                        pool.danmus.splice(danmuIndex, 1);
                    }
                })

                if (!pool || !pool.danmus || pool.danmus.length === 0) {
                    this.pools.splice(poolIndex, 1);
                }
            })
            this.topPools.map((pool, poolIndex) => {
                pool.danmus.map((danmu, danmuIndex) => {
                    let result = danmu.createTime + danmu.duration - this.displayMills - (new Date().getTime() - this.lastDisplayTime);
                    if (result <= 0) {
                        pool.danmus.splice(danmuIndex, 1);
                    }
                })

                if (!pool || !pool.danmus || pool.danmus.length === 0) {
                    this.topPools.splice(poolIndex, 1);
                }
            })
            this.bottomPools.map((pool, poolIndex) => {
                pool.danmus.map((danmu, danmuIndex) => {
                    let result = danmu.createTime + danmu.duration - this.displayMills - (new Date().getTime() - this.lastDisplayTime);
                    if (result <= 0) {
                        console.log(`回收：${danmu.index}`)
                        pool.danmus.splice(danmuIndex, 1);
                    }
                })

                if (!pool || !pool.danmus || pool.danmus.length === 0) {
                    this.bottomPools.splice(poolIndex, 1);
                }
            })

            this.danmuRecycleTimer = setTimeout(() => {
                this._recycleDanmu();
            }, this.duration / 10)
        },
        // 弹幕追加
        addDanmu(danmuList) {
            let danmus = danmuList.sort((a, b) => {
                return a.startTime - b.startTime
            })
            danmus = danmus.map(danmu => {
                return this._refactorDanmu(danmu);
            })

            // console.log(`弹幕addDanmu:${danmus[0].height}`)
            if (this.danmuQueue.length === 0) {
                this.danmuQueue.push(...danmus);
                return;
            }
            // 弹幕去重
            danmus = danmus.filter(danmu => {
                // console.log(`danmu:${danmu.startTime}`);
                // console.log(`danmu:${danmu.startTime}`);

                // console.table(this.danmuQueue[this.danmuQueue.length - 1]);
                // console.log(`danmuQueue:${this.danmuQueue[this.danmuQueue.length - 1].startTime}`);
                return danmu.startTime >= this.danmuQueue[this.danmuQueue.length - 1].startTime;
            })

            danmus.map(danmu => {
                !this.danmuQueue.findIndex(item => {
                    return item.index === danmu.index
                }) && this.danmuQueue.push(danmu);
            })
            // console.log(`danmuQueue.length:${this.danmuQueue.length}`);
        },
        // 实时弹幕
        sendDanmu(item) {
            let danmu = item;
            danmu.startTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
            danmu.createTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
            danmu = this._refactorDanmu(danmu);
            this._displayDanmu(danmu, 0);
        },
        // 定期更新+回收弹幕池数据 Duration/10
        _filterDanmu() {
            // console.log(`filterDanmu:${this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())}`);
            let lastDisplayTime = this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime());
            let i = 0;
            while (i < this.danmuQueue.length) {
                console.log(`filterDanmu:${this.danmuQueue[i].index}`);
                if (
                    this.danmuQueue[i].startTime < lastDisplayTime
                ) {
                    // console.log(`弹幕过期，删除：${this.danmuQueue[i].index},startTime:${this.danmuQueue[i].startTime}，currentTime:${(this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()))}`);
                    this.danmuQueue.splice(i, 1);
                    continue;
                }
                if (
                    this.danmuQueue[i].startTime >=
                    (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) + this.duration / 10
                ) {
                    // console.log(`没到播放时间：${this.danmuQueue[i].index},startTime:${this.danmuQueue[i].startTime}，currentTime:${(this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()))}`);
                    i++;
                    continue;
                }
                // console.log(`展示弹幕-------------${this.danmuQueue[i].index}`);
                // console.table(this.danmuQueue[i]);
                // 展示弹幕
                this.danmuQueue[i].duration = this.duration + (this.danmuQueue[i].startTime - this.displayMills - (new Date().getTime() - this.lastDisplayTime.getTime()));

                this.danmuQueue[i].createTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
                this._displayDanmu(this.danmuQueue[i], 0);
                this.danmuQueue.splice(i, 1);
            }
            this.danmuDisplayTimer = setTimeout(() => {
                this._filterDanmu();
            }, this.duration / 10 - ((this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) - lastDisplayTime));
        },
        //   弹幕展示控制（滚动弹幕）
        _displayDanmu(danmu, poolIndex) {
            console.log(`displayDanmu:${danmu.index}`);
            let SH = document.body.clientHeight || document.documentElement.clientHeight;
            let result;
            switch (danmu.type) {
                case 'scroll': {
                    // 寻找适合面板层
                    if (this.pools.length === poolIndex) {
                        this.pools.push({
                            channels: this._initChannels(),
                            danmus: []
                        });
                    }
                    let pool = this.pools[poolIndex];

                    if (danmu.height > SH) {
                        console.log("error factor danmu");
                        return;
                    }
                    // 寻找适合轨道
                    result = this._channelCheck(danmu, pool);
                    if (result) {
                        // console.log(`展示弹幕2:${danmu.index},duration:${danmu.duration},timeline:${(this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()))},startTime:${danmu.startTime}`);
                        // console.log(danmu.duration);
                        // dom节点生成
                        pool.danmus.push(danmu);
                        // let SH = document.body.clientHeight || document.documentElement.clientHeight;

                        // console.log(`展示弹幕：${danmu.index}`);
                        this.$nextTick(() => {
                            danmu.lastDisplayTime = new Date();
                            danmu.createTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
                            danmu.duration = this.duration + danmu.startTime - danmu.createTime;
                            let danmuEle = this.$refs[danmu.index][0];
                            //弹幕样式初始化

                            danmuEle.style.cssText += `top:${danmu.channelId * 12}px;` + `left:${this.containerWidth()}px;color:${danmu.color};font-size:${danmu.fontSize}px;`;
                            // console.log(`css text`);
                            // console.log(danmuEle.style.cssText);
                            if (this.playerStatus !== 'on') return;
                            // 动画展示
                            this.animationDelay = setTimeout(() => {
                                // console.log(`展示弹幕动画：${danmu.index}`);
                                danmu.createTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
                                danmu.duration = this.duration + danmu.startTime - danmu.createTime;
                                danmu.lastDisplayTime = new Date();

                                let animateWidth = Math.ceil(this.containerWidth() + danmu.width) % 2 == 0 ? Math.ceil(this.containerWidth() + danmu.width) : Math.ceil(this.containerWidth() + danmu.width) + 1
                                danmuEle.style.cssText += `transition:transform ${danmu.duration}ms linear 0s;transform:translate3d(-${(animateWidth)}px,0,0);`;
                            }, 20)
                        })
                    }
                    break;
                }
                case 'top': {
                    // 寻找适合面板层
                    if (this.topPools.length === poolIndex) {
                        this.topPools.push({
                            channels: this._initChannels(),
                            danmus: []
                        });
                    }
                    let pool = this.topPools[poolIndex];
                    if (danmu.height > SH) {
                        console.log("error factor danmu");
                        return;
                    }
                    result = this._topChannelCheck(danmu, pool);
                    if (result) {
                        console.log(`展示top弹幕:${danmu.index}`);

                        // pool.danmus.push(danmu);
                        this.$nextTick(() => {
                            danmu.lastDisplayTime = new Date();
                            danmu.createTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
                            danmu.duration = this.duration + danmu.startTime - danmu.createTime;
                            if (this.playerStatus !== 'on') return;
                            let danmuEle = this.$refs[`top-${danmu.index}`];
                            if (danmuEle) {
                                danmuEle[0].style.cssText += `top:${danmu.channelId * 12}px;` + `font-size:${danmu.fontSize}px;` + `line-height:${danmu.fontSize + AdditionLineHeight}px;`;
                            }
                        })

                    }
                    break;
                }
                case 'bottom': {
                    // 寻找适合面板层
                    if (this.bottomPools.length === poolIndex) {
                        this.bottomPools.push({
                            channels: this._initChannels(),
                            danmus: []
                        });
                    }
                    let pool = this.bottomPools[poolIndex];
                    if (danmu.height > SH) {
                        console.log("error factor danmu");
                        return;
                    }
                    result = this._bottomChannelCheck(danmu, pool);
                    if (result) {
                        console.log(`展示bottom弹幕:${danmu.index}`);
                        this.$nextTick(() => {
                            danmu.lastDisplayTime = new Date();
                            danmu.createTime = (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()));
                            danmu.duration = this.duration + danmu.startTime - danmu.createTime;
                            if (this.playerStatus !== 'on') return;
                            let danmuEle = this.$refs[`bottom-${danmu.index}`];
                            if (this.$refs[`bottom-${danmu.index}`]) {
                                danmuEle[0].style.cssText += `top:${danmu.channelId * 12}px;` + `font-size:${danmu.fontSize}px;` + `line-height:${danmu.fontSize + AdditionLineHeight}px;`;
                            }
                        })
                    }
                    break;
                }
            }
            if (!result) {
                this._displayDanmu(danmu, ++poolIndex);
            }
        },
        _pauseDanmu() {
            this.pools.map(pool => {
                pool.danmus &&
                    pool.danmus.map(danmu => {
                        // 弹幕播放结束
                        if (danmu.startTime + this.duration < (this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime()))) {
                            return;
                        }
                        danmu.moveTime += new Date().getTime() - danmu.lastDisplayTime.getTime();
                        this.$refs[danmu.index][0].style.transition = "";
                        this.$refs[danmu.index][0].style.transform = "";
                        danmu.moveDistance = (this.containerWidth() + danmu.width) * danmu.moveTime / danmu.duration;
                        this.$refs[danmu.index][0].style.left = `${this.containerWidth() - danmu.moveDistance}px`;

                    });
            });
        },
        _continueDanmu() {
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
                        let animateWidth = Math.ceil((this.containerWidth() + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) % 2 == 0 ? Math.ceil((this.containerWidth() + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) : (Math.ceil((this.containerWidth() + danmu.width) * (danmu.duration - danmu.moveTime) / danmu.duration) + 1);
                        this.$refs[
                            danmu.index
                        ][0].style.transform = `translate3d(-${this.containerWidth() + danmu.width - danmu.moveDistance}px,0,0)`;
                        this.$refs[danmu.index][0].style.left = `${this.containerWidth() - danmu.moveDistance}px`;
                    });
            });
        },
        // 寻找适合轨道
        _channelCheck(danmu, pool) {
            // console.log(`channelCheck:danmu.height:${danmu.height}`);
            let danmuChannelNum = Math.ceil(danmu.height / ChannelHeight);
            let channels = pool.channels.filter((channel) => {
                // 当前轨道为空
                if (!channel.danmu.duration) {
                    return true;
                }
                // 轨道弹幕已出框
                if ((this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) - channel.danmu.createTime > channel.danmu.duration) {
                    return true;
                }
                let channelRight = (channel.danmu.width + this.containerWidth()) * ((this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) - channel.danmu.createTime) / channel.danmu.duration;

                // 轨道被占满，右侧无空间
                if (channel.danmu.duration && channelRight <= channel.danmu.width) {
                    // console.log(`轨道被占满：channelIndex：${channel.index};channelRight:${channelRight}`)
                    return false;
                }

                let result = channel.danmu.startTime + this.duration - ((this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) +
                    danmu.duration * this.containerWidth() / (danmu.width + this.containerWidth()))
                if (result >= 0) {
                    // console.log(`轨道验证失败：`);
                }
                return result <= 0;
            });
            // console.log("i:" + i);
            // console.log(`channels.length:${channels.length},danmuChannelNum:${danmuChannelNum}`);

            if (!channels || channels.length < danmuChannelNum) {
                // console.log(`当前层没找到适合轨道,channels.length:${channels.length}`);
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

            console.log('当前层没找到适合轨道');
            return false;

        },
        _topChannelCheck(danmu, pool) {
            let danmuChannelNum = Math.ceil(danmu.height / ChannelHeight);
            let channels = pool.channels.filter((channel) => {
                // 当前轨道为空
                if (!channel.danmu.duration) {
                    return true;
                }
                // 轨道不为空
                if (channel.danmu.startTime + this.duration <= this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) {
                    return true;
                }
            })
            if (!channels || channels.length < danmuChannelNum) {
                // console.log(`当前层没找到适合轨道,channels.length:${channels.length}`);
                return false;
            }
            console.log(`TOP channel 0:${channels[0].index},channels.length:${channels.length},danmuChannelNum:${danmuChannelNum}`);
            let i = 0;
            while (i + danmuChannelNum < channels.length) {
                if (channels[i].index + danmuChannelNum === channels[i + danmuChannelNum].index) {
                    // pool.danmus.splice(danmu,)
                    channels.slice(i, i + danmuChannelNum).map(channel => {
                        channel.danmu = danmu;
                    });
                    danmu.channelId = channels[i].index;
                    danmu.channelNum = danmuChannelNum;
                    // console.log(`channelIndex:${channels[i].index}`);
                    let danmuIndex = pool.danmus.findIndex(danmu1 => {
                        return danmu1.channelId === channels[i].index;
                    })
                    console.log(`danmuIndex:${danmuIndex}`);
                    console.log(`findbottomchannel,danmuIndex:${danmuIndex},danmuFontSize:${danmu.fontSize},danmuWidth:${danmu.width},danmuHeight:${danmu.height},danmuChannelNum:${danmuChannelNum},channelId:${channels[i].index}`);

                    if (danmuIndex >= 0) {

                        pool.danmus.splice(danmuIndex, 1, danmu)
                    } else {
                        pool.danmus.push(danmu);
                    }
                    return true;
                }
                i++;
            }

        },
        _bottomChannelCheck(danmu, pool) {
            let danmuChannelNum = Math.ceil(danmu.height / ChannelHeight);
            let channels = pool.channels.filter((channel) => {
                // 当前轨道为空
                if (!channel.danmu.duration) {
                    return true;
                }
                // 轨道不为空
                if (channel.danmu.startTime + this.duration <= this.displayMills + (new Date().getTime() - this.lastDisplayTime.getTime())) {
                    return true;
                }
            })
            if (!channels || channels.length < danmuChannelNum) {
                // console.log(`当前层没找到适合轨道,channels.length:${channels.length}`);
                return false;
            }
            let i = channels.length;
            // console.log(`bottom channel 0:${channels[0].index},channels.length:${i},danmuChannelNum:${danmuChannelNum}`);
            while (i - danmuChannelNum >= 0) {
                // console.log(`i:${i}`);
                if (channels[i - 1].index - danmuChannelNum + 1 === channels[i - danmuChannelNum].index) {
                    // pool.danmus.splice(danmu,)
                    channels.slice(i - danmuChannelNum, i).map(channel => {
                        channel.danmu = danmu;
                    });
                    danmu.channelId = channels[i - danmuChannelNum].index;
                    danmu.channelNum = danmuChannelNum;
                    // console.log(`channelIndex:${channels[i].index}`);
                    let danmuIndex = pool.danmus.findIndex(danmu1 => {
                        return danmu1.channelId === channels[i - danmuChannelNum].index;
                    })
                    // console.log(`findbottomchannel,danmuIndex:${danmuIndex},danmuFontSize:${danmu.fontSize},danmuWidth:${danmu.width},danmuHeight:${danmu.height},danmuChannelNum:${danmuChannelNum},channelId:${channels[i - danmuChannelNum].index}`);
                    if (danmuIndex >= 0) {

                        pool.danmus.splice(danmuIndex, 1, danmu)
                    } else {
                        pool.danmus.push(danmu);
                    }
                    return true;
                }
                i--;
            }

        }
    }
};