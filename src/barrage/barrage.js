
    // const screenWidth = document.documentElement.clientWidth;
    // const screenHeight = document.documentElement.clientHeight;
    const screenWidth = 300;
    const screenHeight = 300;
    import Vue from "vue";
    export default{
        name: "barrage",
        data: function () {
            return {
                barrageList: [],
                barrageIndex: 0, //针对queue的播放节点barrage的索引(barrage的index)
                barrageQueue: [],
                channelList: [],
                showTest: false,
                duration: 0
            };
        },
        mounted() {
            // 每5d添加弹幕测试信息
            // setInterval(() => {
            //     this.addBarrage({
            //         index: `danmu_${new Date().getTime()}`,
            //         speed: Math.floor(Math.random() * 100),
            //         msg: "吐槽：" + Math.random(),
            //         fontSize: Math.floor(Math.random() * 40),
            //         color: Math.random() * 10 < 5 ? "rgb(0,0,0)" : "rgb(255,0,0)"
            //     });
            // }, 5000);
            // 动画测试
            // this.moveTest();
            // this.moveTest2();
            this.initChannels();
            // this.displayBarrage();
        },
        methods: {
            // 新增测试弹幕
            addTestBarrage() {
                this.addBarrage({
                    index: `danmu_${new Date().getTime()}`,
                    speed: Math.floor(Math.random() * 100),
                    msg: "吐槽：" + Math.random(),
                    fontSize: Math.floor(Math.random() * 20),
                    color: Math.random() * 10 < 5 ? "rgb(255,255,255)" : "rgb(255,0,0)"
                });
            },
            // 动画测试1
            moveTest() {
                this.showTest = true;
                this.duration = 5;
                this.$nextTick(() => {
                    console.table("2");
                    setTimeout(() => {
                        this.$refs["test"].style.cssText +=
                            "transform:translateX(400px);";
                    }, 300);
                });
            },
            // 动画测试2
            moveTest2() {
                this.showTest = true;
                this.duration = 5;
                this.$nextTick(() => {
                    // document.getElementsByClassName("test2")[0].animate(
                    //     [
                    //         {
                    //             background: `blue`
                    //         }
                    //     ],
                    //     5000
                    // );
                });
            },
            moveTest3() {
                // this.$refs["test3"].style.cssText += `
                // width:50px;
                // @keyframes test4{
                //     from{
                //         left:-100px;
                //         right:100%;}
                //     to{
                //         left:100%;
                //         right:-100px;
                //     }
                // }
                // animation:test4 5s
                // `;
            },
            // 初始化轨道
            initChannels() {
                let channelIndex = 0;
                while(channelIndex<Math.floor((screenHeight - 60) / 12)){
                    this.channelList[channelIndex]={
                        index: channelIndex++,
                        right: screenWidth,
                        speed: 0,
                        barrage: null
                    }
                }
            },
            // 新增弹幕
            addBarrage(barrageItem) {
                this.barrageQueue[barrageItem.index]=(
                    Object.assign(barrageItem, {
                        width: barrageItem.msg.length * barrageItem.fontSize,
                        height: barrageItem.fontSize,
                        getDuration: function () {
                            return (this.width + screenWidth) / barrageItem.speed;
                        }
                    })
                );
                this.barrageQueue.length++;
            },
            // 寻找可用轨道
            findChannels(barrage) {
                let currentTime = new Date().getTime();
                this.channelList.map(channel => {
                    let channelRight =0;
                    if(!!channel.barrage){
                        channelRight=channel.speed *
                        (currentTime - channel.barrage.createTime) *
                        channel.speed -
                        channel.barrage.length;

                    }else{
                        channelRight=screenWidth
                    }
                    channel.right = channelRight;
                    return channel;
                });
                let availableChannels = this.channelList.filter(channel => {
                    // 碰撞检测的几种情景
                    // 轨道为空
                    if(channel.right===screenWidth) return true;
                    // 1.弹幕速度<轨道速度
                    if (barrage.speed < channel.speed) return true;
                    // 2.轨道右侧无空间
                    if (channel.right <= 0) return false;
                    let channelFinishTime =
                        (screenWidth - channel.right) / channel.speed;
                    let channelCrashTime =
                        channel.right / (barrage.speed - channel.speed);
                        // 3.弹幕速度>=轨道速度
                    if (channelFinishTime <= channelCrashTime) return true;
                });
                let channelIndex = 0;
                let channelNum = Math.ceil(barrage.height / 12);
                //    第一次匹配成功的连续轨道
                while (channelIndex + channelNum < availableChannels.length) {
                    if (
                        availableChannels[channelIndex].index + channelNum ===
                        availableChannels[channelIndex + channelNum].index
                    ) {
                        return availableChannels.splice(
                            channelIndex,
                            channelIndex + channelNum
                        );
                    }
                    channelIndex++;
                }
                return null;
            },
            // 弹幕展示
            displayBarrage() {
                // console.table(this.barrageQueue);
                let o = this.barrageList;
                // if (
                //     this.barrageIndex !==
                //     this.barrageQueue[this.barrageQueue.length - 1].index
                // ) {

                if (
                    this.barrageIndex !==
                    this.barrageQueue[Object.keys(this.barrageQueue)[this.barrageQueue.length-1]].index
                ) {

                    // let barrage = this.barrageQueue[
                    // this.barrageQueue.findIndex(
                    //     o => o.index === this.barrageIndex
                    // ) + 1
                    //     ];
                    let barrage = this.barrageQueue[
                        Object.keys(this.barrageQueue)[Object.keys(this.barrageQueue).findIndex(
                            o => o === this.barrageIndex
                        ) + 1]
                    ];
                    let channels = this.findChannels(barrage);
                    // console.table('channels');
                    // console.table(channels);

                    if (channels) {
                        // 更新弹幕信息
                        barrage.createTime = new Date().getTime(); //更新弹幕产生时间（展示时间）
                        this.barrageIndex = barrage.index;

                        // 更新所有轨道信息?
                        let minChannelRight = Math.min(
                            ...this.channelList.flatMap(channel => channel.right)
                        );
                        channels.forEach(channel => {
                            channel.speed = barrage.speed;
                            // channel右侧空白计算需重新
                            channel.barrage = barrage;
                        });
                        // 增加do
                        // 生成新dom
                        this.barrageList.push(barrage.index);
                        // 为新dom增加动画效果
                        this.$nextTick(() => {
                            // 选择dom元素需重新编码
                            // this.$refs["barrage_"+barrage.index][0].cssText += `top:${channels[0].index *
                            // 12}px;left:0px;transition:all linear ${
                            //     barrage.duration
                            //     }s`;
                            // this.$refs["barrage_"+barrage.index][0].cssText += `top:${channels[0].index *
                            //     12}px;left:0px;transition:all linear ${
                            //         barrage.duration
                            //         }s`;
                            // 销毁dom

                            // setTimeout(() => {
                            //     this.barrageList.splice(
                            //         this.barrageList.findIndex(
                            //             o => o === barrage.index
                            //         ),
                            //         1
                            //     );
                                
                            //     // this.barrageQueue.splice(
                            //     //     this.barrageQueue.findIndex(
                            //     //         o => o.index === barrage.index
                            //     //     ),
                            //     //     1
                            //     // );
                            //     delete this.barrageQueue[barrage.index];
                            // }, barrage.duration);
                        });
                    }
                }
            }
        }
    };