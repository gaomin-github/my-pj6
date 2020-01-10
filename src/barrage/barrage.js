
// const screenWidth = document.documentElement.clientWidth;
// const screenHeight = document.documentElement.clientHeight;
const screenWidth = 300;
const screenHeight = 300;
import Vue from "vue";
export default {
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
        // setInterval(() => {
        //     console.log('addTestBarrage');
        //     this.addTestBarrage();
        // }, 500);
    },
    methods: {
        // 新增测试弹幕
        addTestBarrage() {
            let myRandom = Math.random();
            this.addBarrage({
                index: `danmu_${new Date().getTime()}`,
                speed: Math.floor(myRandom * 100),
                msg: "吐槽：" + myRandom,
                fontSize: Math.ceil(myRandom * 20) < 12 ? 12 : Math.ceil(myRandom * 20),
                color: myRandom * 10 < 5 ? "rgb(255,255,255)" : "rgb(255,0,0)"
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
            while (channelIndex < Math.floor((screenHeight - 60) / 12)) {
                this.channelList[channelIndex] = {
                    index: channelIndex++,
                    right: screenWidth,
                    speed: 0,
                    barrage: null
                }
            }
        },
        // 新增弹幕
        addBarrage(barrageItem) {
            this.barrageQueue[barrageItem.index] = (
                Object.assign(barrageItem, {
                    width: barrageItem.msg.length * barrageItem.fontSize + 10,
                    height: barrageItem.fontSize,
                    getDuration: function () {
                        return (this.width + screenWidth) / barrageItem.speed;
                    }
                })
            );
            // console.table(this.barrageQueue);
            this.barrageQueue.length++;
        },
        // 寻找可用轨道
        findChannels(barrage) {
            let currentTime = new Date().getTime();
            this.channelList.map(channel => {
                let channelRight = 0;
                if (channel.barrage) {
                    channelRight = channel.barrage.speed *
                        (currentTime - parseFloat(channel.barrage.createTime)) / 1000 -
                        channel.barrage.width;
                    channelRight = channelRight > screenWidth ? screenWidth : channelRight;   //轨道上弹幕已清空时

                    channel.createTime = channel.barrage.createTime;
                    channel.barrageWidth = channel.barrage.width;
                } else {
                    channelRight = screenWidth
                }
                channel.right = channelRight;
                channel.curTime = new Date().getTime();
                return channel;
            });
            let availableChannels = this.channelList.filter(channel => {
                // 碰撞检测的几种情景
                // 1.轨道为空
                if (channel.right === screenWidth) return true;
                // 2.轨道右侧无空间
                if (channel.right <= 0) return false;
                // 3.轨道右侧有空间：弹幕速度<=轨道速度
                if (barrage.speed <= channel.speed) return true;
                // 4.轨道右侧有空间：弹幕速度>轨道速度
                let channelFinishTime =
                    (screenWidth - channel.right) / channel.speed;
                let channelCrashTime =
                    channel.right / (barrage.speed - channel.speed);
                if (channelFinishTime <= channelCrashTime) return true;
            });
            // console.table(availableChannels);
            let channelIndex = 0;
            let channelNum = Math.ceil(barrage.height / 12);
            //    第一次匹配成功的连续轨道
            while (channelIndex + channelNum < availableChannels.length) {
                if (
                    availableChannels[channelIndex].index + channelNum ===
                    availableChannels[channelIndex + channelNum].index
                ) {
                    return availableChannels.slice(
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
            let barrageQueueKeys = Object.keys(this.barrageQueue);
            if (
                this.barrageIndex !==
                this.barrageQueue[barrageQueueKeys[barrageQueueKeys - 1]].index
            ) {
                let barrage = this.barrageQueue[
                    barrageQueueKeys[barrageQueueKeys.findIndex(
                        o => o === this.barrageIndex
                    ) + 1]
                ];
                let channels = this.findChannels(barrage);
                // console.table('channels');
                // console.table(channels);

                if (channels) {

                    this.barrageIndex = barrage.index;
                    // console.table(barrage);
                    // console.table(this.channelList);
                    // 增加新dom
                    this.barrageList.push(barrage.index);
                    // 更新弹幕信息
                    barrage.createTime = (new Date().getTime()).toString(); //更新弹幕产生时间（展示时间）
                    barrage.channelIndex = channels[0].index;
                    // 更新所有轨道信息?
                    // let minChannelRight = Math.min(
                    //     ...this.channelList.flatMap(channel => channel.right)
                    // );
                    channels.map(channel => {
                        channel.speed = barrage.speed;
                        // channel右侧空白计算需重新
                        channel.barrage = barrage;
                    });
                    // 为新dom增加动画效果
                    this.$nextTick(() => {
                        // 选择dom元素需重新编码
                        // setTimeout(() => {

                        //     this.$refs['barrage_' + barrage.index][0].cssText += ` animation:test4 ${barrage.duration}s linear`;
                        // }, 2000)
                        // this.$re30fs["barrage_"+barrage.index][0].cssText += `top:${channels[0].index *
                        // 12}px;left:0px;transition:all linear ${
                        //     barrage.duration
                        //     }s`;
                        // this.$refs["barrage_"+barrage.index][0].cssText += `top:${channels[0].index *
                        //     12}px;left:0px;transition:all linear ${
                        //         barrage.duration
                        //         }s`;
                        // 销毁dom

                        setTimeout(() => {
                            this.barrageList.splice(
                                this.barrageList.findIndex(
                                    o => o === barrage.index
                                ),
                                1
                            );
                            delete this.barrageQueue[barrage.index];
                            this.barrageQueue.length--;
                        }, barrage.getDuration() * 1000);
                    });
                }
            }
        }
    }
};