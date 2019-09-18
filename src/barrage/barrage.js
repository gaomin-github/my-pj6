// 屏幕区域宽度
const screenWidth = document.documentElement.clientWidth;
const screenHeight = ocument.documentElement.clientHeight;
// import channel from './channel.js';
export default barrage {
    name: 'barrage',
        data: function() {
            return {
                barrageList: [],
                barrageIndex: 0,     //针对queue的播放节点barrage的索引(barrage的index)
                barrageQueue: [],
                channelList: []
            }
        },
    mounted() {
        this.initChannels();

        // 每5d添加弹幕测试信息
        setInterval(() => {
            this.addBarrage({
                index: `danmu_${new Date().getTime()}`,
                speed: Math.floor(Math.random() * 100),
                msg: '吐槽：' + Math.random(),
                fontSize: Math.floor(Math.random() * 40),
                color: Math.random() * 10 < 5 ? 'rgb(0,0,0)' : 'rgb(255,0,0)'
            })
        }, 5000)

        this.displayBarrage();
    },
    methods: {
        // 初始化轨道
        initChannels(){
            let channelIndex = 0;
            this.channelList.flll({
                index: channelIndex++,
                right: screenWidth,
                speed: 0,
                barrage: null
            }, 0, Math.floor(screenHeight - 60) / 12)
        },
        // 新增弹幕
        addBarrage(barrageItem){
            barrageQueue[barrageItem.index] = barrageItem.assign(barrageItem, {
                width: barrageItem.msg.length * barrageItem.fontSize,
                height: barrageItem.fontSize,
                getDuration: function () { return (this.width + screenWidth) / barrageItem.speed }
            })
        },
        // 寻找可用轨道
        findChannels(barrage){
            let currentTime = (new Date()).getTime();
            this.channelList.map(channel => {
                let channelRight = channel.speed * (currentTime - channel.barrage.createTime) * channel.speed - channel.barrage.length;
                channel.right = channelRight;
                return channel;
            })
            let availableChannels = this.channelList.filter(channel => {
                if (barrage.speed < channel.speed) return true;

                if (channel.right <= 0) return false;
                let channelFinishTime = (screenWidth - channel.right) / channel.speed;
                let channelCrashTime = channel.right / (barrage.speed - channel.speed)
                if (channelFinishTime < channelCrashTime) return true;
            })

            let resultChannels = [];
            let channelIndex = 0;
            let channelNum = barrage.height / 12;
            //    第一次匹配成功的连续轨道
            while (channelIndex + channelNum < availableChannels.length) {
                if (availableChannels[channelIndex].index + channelNum === availableChannels[channelIndex + channelNum].index) {
                    return availableChannels.splice(channelIndex, channelIndex + channelNum);
                }
                channelIndex++;
            }
            return null;

        },
        // 弹幕展示
        displayBarrage(){
            while (this.barrageIndex !== this.barrageQueue[barrageQueue.length - 1].index) {
                let barrage = this.barrageQueue[this.barrageQueue.findIndex(o => o.index === this.barrageIndex) + 1];
                let channels = this.findChannels(barrage);
                if (channels) {
                    barrage.createTime = new Date().getTime();
                    // 更新弹幕信息
                    this.barrageIndex = barrage.index;
                    this.barrageList.push(barrage.index);
                    // 更新轨道信息
                    let minChannelRight = Math.min(this.channelList.flatMap(channel => { channel.right }))
                    channels.forEach((channel) => {
                        channel.speed = barrage.speed;
                        // channel右侧空白计算需重新
                        channel.barrage = barrage;
                    })
                    // 增加dom
                    // 生成新dom
                    barrageList.push(barrage.index);
                    // 为新dom增加动画效果
                    this.$nextTick(() => {
                        // 选择dom元素需重新编码
                        this.$refs.barrages[barrage.index].cssText += `top:${channels[0].index * 12}px;left:0px;transition:all linear ${barrage.duration}s`;
                        // 销毁dom
                        setTimeout((barrage) => {
                            this.barrageList.splice(this.barrageList.findIndex(o => o === barrage.index), 1);
                            this.barrageQueue.splice(this.barrageQueue.findIndex(o => o.index === barrage.index), 1)
                        }, barrage.duration)
                    })
                }
            }
        }
    }
}