<template>
    <section class="barrage-container">
        <h3>弹幕测试</h3>
        <section class="player-container">
            <!-- <ul class="player-info">
                <li
                    v-for="item in barrageList"
                    :ref="item"
                    :key="item"
                    :style="{
                         fontSize:`${barrageQueue[item].fontSize}px`,
                         color:`${barrageQueue[item].color}`,
                         transition:all `${barrageQueue[item].duration}s linear`
                    }"
                >{{barrageQueue[item.msg]}}</li>
            </ul>-->

            <!-- <section class="test3" ref="test3">动画测试3内容</section> -->
        </section>
        <button @click="addTestBarrage">新增弹幕</button>
        <button @click="displayBarrage">展示弹幕</button>
        <h3>动画测试1</h3>
        <h3 @click="moveTest3">动画测试3</h3>
        <section
            class="test"
            ref="test"
            v-if="showTest"
            style="
                display:block;
                width:100px;
                height:100px;
                backgroundColor:red;
                transition: all 5s;
                position: absolute;"
        >donghua</section>
        <h3>动画测试2</h3>
        <section
            class="test2"
            ref="test2"
            style="
                display:block;
                width:100px;
                height:100px;
                backgroundColor:red;
                transition: all 5s;
                position: absolute;"
        >donghua</section>

        <!-- <section class="test" ref="test" v-if="showTest" :style="{transition:`all ${10}s`}">donghua</section> -->
    </section>
</template>
<script>
const screenWidth = document.documentElement.clientWidth;
const screenHeight = document.documentElement.clientHeight;
export default {
    name: "barrage",
    data: function() {
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
        // this.initChannels();
        // this.displayBarrage();
    },
    methods: {
        // 新增测试弹幕
        addTestBarrage() {
            this.addBarrage({
                index: `danmu_${new Date().getTime()}`,
                speed: Math.floor(Math.random() * 100),
                msg: "吐槽：" + Math.random(),
                fontSize: Math.floor(Math.random() * 40),
                color: Math.random() * 10 < 5 ? "rgb(0,0,0)" : "rgb(255,0,0)"
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
            this.channelList.flll(
                {
                    index: channelIndex++,
                    right: screenWidth,
                    speed: 0,
                    barrage: null
                },
                0,
                Math.floor(screenHeight - 60) / 12
            );
        },
        // 新增弹幕
        addBarrage(barrageItem) {
            barrageQueue[barrageItem.index] = barrageItem.assign(barrageItem, {
                width: barrageItem.msg.length * barrageItem.fontSize,
                height: barrageItem.fontSize,
                getDuration: function() {
                    return (this.width + screenWidth) / barrageItem.speed;
                }
            });
        },
        // 寻找可用轨道
        findChannels(barrage) {
            let currentTime = new Date().getTime();
            this.channelList.map(channel => {
                let channelRight =
                    channel.speed *
                        (currentTime - channel.barrage.createTime) *
                        channel.speed -
                    channel.barrage.length;
                channel.right = channelRight;
                return channel;
            });
            let availableChannels = this.channelList.filter(channel => {
                if (barrage.speed < channel.speed) return true;

                if (channel.right <= 0) return false;
                let channelFinishTime =
                    (screenWidth - channel.right) / channel.speed;
                let channelCrashTime =
                    channel.right / (barrage.speed - channel.speed);
                if (channelFinishTime < channelCrashTime) return true;
            });
            let channelIndex = 0;
            let channelNum = barrage.height / 12;
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
            while (
                this.barrageIndex !==
                this.barrageQueue[barrageQueue.length - 1].index
            ) {
                let barrage = this.barrageQueue[
                    this.barrageQueue.findIndex(
                        o => o.index === this.barrageIndex
                    ) + 1
                ];
                let channels = this.findChannels(barrage);
                if (channels) {
                    // 更新弹幕信息
                    barrage.createTime = new Date().getTime(); //更新弹幕产生时间（展示时间）
                    this.barrageIndex = barrage.index;

                    // 更新轨道信息
                    let minChannelRight = Math.min(
                        this.channelList.flatMap(channel => {
                            channel.right;
                        })
                    );
                    channels.forEach(channel => {
                        channel.speed = barrage.speed;
                        // channel右侧空白计算需重新
                        channel.barrage = barrage;
                    });
                    // 增加dom
                    // 生成新dom
                    this.barrageList.push(barrage.index);
                    // 为新dom增加动画效果
                    this.$nextTick(() => {
                        // 选择dom元素需重新编码
                        this.$refs.barrages[
                            barrage.index
                        ].cssText += `top:${channels[0].index *
                            12}px;left:0px;transition:all linear ${
                            barrage.duration
                        }s`;
                        // 销毁dom
                        setTimeout(barrage => {
                            this.barrageList.splice(
                                this.barrageList.findIndex(
                                    o => o === barrage.index
                                ),
                                1
                            );
                            this.barrageQueue.splice(
                                this.barrageQueue.findIndex(
                                    o => o.index === barrage.index
                                ),
                                1
                            );
                        }, barrage.duration);
                    });
                }
            }
        }
    }
};
</script>
<style lang="scss" scoped>
section {
    width: 100%;
    height: 100%;
    display: block;
}
button {
    height: 32px;
    line-height: 32px;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    border-radius: 10px;
    margin: 20px;
}
@keyframes test3 {
    from {
        left: 0px;
        right: 100%;
        transform: translateX(-100%);
    }
    to {
        left: 100%;
        right: 0px;
        // transform: translateX(100%);
    }
}
.barrage-container {
    overflow-x: visible;
}
.player {
    &-container {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 10%;
        background: rgb(0, 0, 0);
    }
}
.test,
.test2,
.test3 {
    display: block;
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
}
.test3 {
    animation: test3 8s linear;
}
</style>

