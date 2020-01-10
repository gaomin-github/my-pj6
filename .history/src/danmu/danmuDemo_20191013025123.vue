<template>
  <section>
    <section class="player-container">
      <!-- <section class="animation" v-if="visiableDanmus&&visiableDanmus.length>0"> -->
      <section class="animation">
        <section
          class="animation-item"
          ref="animationItem"
          v-if="animationTestShow"
        >
          {{ animationTestText }}
        </section>
        <!-- <section
                    class="animation-item"
                    v-for="danmu in visiableDanmus"
                    :key="danmu.index"
                    :ref="danmu.index"
                >{{danmu.text}}</section> -->
      </section>
    </section>
    <section class="control-bar">
      <section class="time-container">{{ displayTimeMsg }}</section>
      <button @click="startPlayer">播放器开始</button>
      <button @click="pausePlayer">播放器暂停</button>
      <button @click="continuePlayer">播放器继续</button>
    </section>
    <section class="manual-bar">
      <button @click="manualAddDanmu">增加弹幕</button>
      <button @click="autoAddDanmu">自动添加弹幕</button>
    </section>
    <section class="test">
      <button @click="displayAnimation">展示动画</button>
      <button @click="pauseAnimation">暂停动画</button
      ><button @click="continueAnimation">继续动画</button>
    </section>
  </section>
</template>
<script>
  const SW = document.body.clientWidth || document.documentElement.clientWidth;
  const SH = 260;
  const playerWidth = SW * 0.9; //playerWidth
  // const PH=SH*0.9*
  const Duration = 8000; //弹幕生命周期
  const channelNum = Math.floor(SH / 12);
  export default {
    data: function() {
      return {
        // 播放器相关
        startMills: 0,
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
        pools: [] //弹幕池
      };
    },
    mounted() {
      // this.init();
    },
    methods: {
      // 播放器相关
      startPlayer() {
        this.startMills = new Date().getTime();
        this.startTimer = setInterval(() => {
          let currentMills = new Date().getTime();
          let displayMills = currentMills - this.startMills;
          let displayHour = Math.floor(displayMills / (1000 * 60 * 60));
          let displayMinute = Math.floor(
            (displayMills - 1000 * 60 * 60 * displayHour) / (1000 * 60)
          );
          let displaySecond = Math.ceil(
            (displayMills -
              1000 * 60 * 60 * displayHour -
              1000 * 60 * displayMinute) /
              1000
          );
          this.displayTimeMsg = `${displayHour} h::${displayMinute} m::${displaySecond} s`;
        }, 20);
      },
      pausePlayer() {
        clearInterval(this.startTimer);
      },
      continuePlayer() {
        this.startTimer();
      },
      // 弹幕数据抓取
      initDanmuList() {
        for (let i = 0; i < 10; i++) {
          this.manualAddDanmu();
        }
      },
      manualAddDanmu() {
        let random = Math.random();
        let danmu = {
          index: new Date().getTime(),
          startTime: new Date().getTime() + Math.floor(random * 1000),
          fontSize:
            random * 10 < 3
              ? 12
              : random * 10 < 5
              ? 16
              : random * 10 < 8
              ? 24
              : 36,
          color:
            (random * 10) % 2 === 0
              ? "red"
              : (random * 10) % 3 === 0
              ? "white"
              : "green",
          text: `danmu${random}`
        };
        danmu = this.refactorDanmu(danmu);
        this.danmuQueue.push(danmu);
      },
      refactorDanmu(danmu) {
        return Object.assign(
          {
            width: danmu.text.length() * danmu.fontSize,
            height: danmu.fontSize,
            duration: Duration,
            remainTime: Duration
          },
          danmu
        );
      },
      autoAddDanmu() {
        setInterval(this.manualAddDanmu, 2000);
      },
      // 动画效果测试
      displayAnimation() {
        // this.animationTestStartTime = new Date().getTime();
        // this.animationTestRemainTime = Duration;
        // this.animationTestShow = true;
        // setTimeout(() => {
        //   let animationDom = this.$refs.animationItem;
        //   animationDom.style.left = `${SW * 0.9}px`;
        //   animationDom.style.transition = `transform ${Duration}ms linear 0s`;
        //   animationDom.style.transform = `translateX(-${playerWidth +
        //     this.animationTestText.length * 16}px)`;
        // }, 0);
      },
      pauseAnimation() {
        // this.animationTestRemainTime -=
        //   new Date().getTime() - this.animationTestStartTime;
        // let animationDom = this.$refs.animationItem;
        // animationDom.style.left = `${playerWidth -
        //   ((playerWidth + this.animationTestText.length * 16) *
        //     (Duration - this.animationTestRemainTime)) /
        //     Duration}px`;
        // animationDom.style.transform = "";
        // animationDom.style.transition = ``;
      },
      continueAnimation() {
        // this.animationTestStartTime = new Date().getTime();
        // let animationDom = this.$refs.animationItem;
        // animationDom.style.transform = `translateX(-${((playerWidth +
        //   this.animationTestText.length * 16) *
        //   this.animationTestRemainTime) /
        //   Duration}px)`;
        // animationDom.style.transition = `transform ${this.animationTestRemainTime}ms linear 0s`;
      },
      // 轨道初始化
      initChannels() {
        let channelList = [];
        for (let i = 0; i < channelNum; i++) {
          this.channelList[i] = {
            index: i,
            barrage: null
          };
        }
        return channelList;
      },
      filterDanmu() {
        // 不漏掉数据关键在当前时间，统一用一个当前时间？分次获取？后续修改？
        this.danmuDisplayTimer = setInterval(() => {
          // 后续考虑优化？
          //按照startTime升序排列
          // this.danmuQueue = this.danmuQueue.sort((a, b) => {
          //     return a.startTime - b.startTime;
          // });
          for (i in danmuQueue) {
            //删除过期信息：danmu.startTime<currentTime
            // let spliceIndex = this.danmuQueue.findIndex(
            //     danmu =>
            //         danmu.startTime < new Date().getTime() - this.startMills
            // );
            // this.danmuQueue.splice(0, spliceIndex + 1);
            // 当前屏显示信息
            if (
              this.danmuQueue[i].startTime <
              new Date().getTime() - this.startMills - Duration
            )
              continue;
            if (
              this.danmuQueue[i].startTime >
              new Date().getTime() - startMills + Duration
            )
              continue;
            this.displayDanmu(this.danmuQueue[i], 0);
          }
          // let filterIndex = this.danmuQueue.findIndex(
          //     danmu =>
          //         danmu.startTime >
          //         new Date().getTime() - this.startMills + Duration
          // );
          // let data = this.danmuQueue.splice(0, filterIndex);
          // this.visiableDanmus.push(data);
        }, Math.floor(Duration / 4));
      },
      displayDanmu(danmu, poolIndex) {
        // 寻找适合面板层
        if (!this.pools || this.pools.length < poolIndex) {
          this.pools.push(this.initChannels());
        }
        let pool = this.pools[poolIndex];
        if (!pool || pool.length <= 0) {
        }
        if (danmu.height > SH) {
          console.log("error factor danmu");
          return;
        }
        // if (pool.height + danmu.height > SH) {
        //     this.displayDanmu(danmu, ++poolIndex);
        //     return;
        // }
        if (channelCheck(danmu, poolIndex)) {
          danmu.channelId = channelIndex;
          pool.push(danmu);
          // 动画展示
          setTimeout(() => {
            let dmDom = this.$refs[danmu.index][0];
            dmDom.style.left = `${playerWidth}px`;
            dmDom.style.transition = `transform ${Duration}ms linear 0s`;
            dmDom.style.transform = `translateX(-${playerWidth}px`;
          });
        } else {
          this.displayDanmu(danmu, ++poolIndex);
        }

        // 寻找适合轨道
      },
      // 寻找适合轨道
      channelCheck(danmu, poolIndex) {
        let channelNum = Math.ceil(danmu.height / ChannelHeight);
        let channels = this.pools[poolIndex].filter(channel => {
          return (
            channel.barrage.startTime + Duration <=
            danmu.startTime +
              (Duration * playerWidth) / (danmu.width + playerWidth)
          );
        });
        if (!channels || channel.length < channelNum) return false;
        let i = channels[0].index;

        while (i + channelNum - 1 <= channels[channels.length - 1].index) {
          if (i + channelNum - 1 === channels[channelNum - 1].index) {
            channels.slice(i, i + channelNum).map(channel => {
              channel.danmu = danmu;
            });
            danmu.channelId = i;
            danmu.poolId = poolIndex;
            return true;
          }
          i++;
        }
        return false;
      }
    }
  };
</script>
<style lang="scss" scoped>
  section {
    display: block;
  }
  .player-container {
    width: 90%;
    height: 260px;
    background: rgb(0, 0, 0);
    margin: 5%;
    position: relative;
  }
  .control-bar,
  .manual-bar {
    height: 60px;
    span {
      font-size: 16px;
      line-height: 30px;
    }
    button {
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      margin: 5px;
      outline: none;
    }
  }
  .time-container {
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    // border: 1px black solid;
  }
  .animation {
    position: relative;
    &-item {
      display: inline;
      color: rgb(255, 0, 255);
      font-size: 16px;
      position: absolute;
      border: 1px rgb(255, 255, 255) solid;

      word-wrap: none;
      white-space: nowrap;
    }
  }
</style>
