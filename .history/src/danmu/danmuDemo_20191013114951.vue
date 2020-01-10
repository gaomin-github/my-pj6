<template>
  <section>
    <section class="player-container">
      <!-- <section class="animation"> -->
      <!-- <section
          class="animation-item"
          ref="animationItem"
          v-if="animationTestShow"
        >
          {{ animationTestText }}
        </section> -->

      <!-- </section> -->
      <section class="animation" v-if="pools&&pools.length>0">
        <section
          class="animation-layer"
          v-for="pool in pools"
          :key="pool.index"
          :style="`{zIndex:${pool.index+10}}`"
        >
          <section v-if="pool&&pool.danmus&&pool.danmus.length>0">
            <section
              class="animation-item"
              v-for="danmu in pool.danmus"
              :key="danmu.index"
              :ref="`${pool.index}-${danmu.index}`"
            >
              {{ danmu.text }}
            </section>
          </section>
        </section>
      </section>
    </section>
    <section class="control-bar">
      <section class="time-container">{{ displayTimeMsg }}</section>
      <button @click="startPlayer(0)">播放器开始</button>
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
  const Duration = 4000; //弹幕生命周期
  const channelNum = Math.floor(SH / 12);
  export default {
    data: function() {
      return {
        // 播放器相关
        // startMills: 0,
        displayMills: 0,
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
      startPlayer(lastTime) {
        //   初始化计数器
        lastTime = lastTime ? lastTime : 0;
        // console.log("lastTime:" + lastTime);

        let startMills = new Date().getTime();
        this.startTimer = setInterval(() => {
          let currentMills = new Date().getTime();
          this.displayMills = lastTime + currentMills - startMills;
          //   console.log("displaymills/" + this.displayMills);
          let displayHour = Math.floor(this.displayMills / (1000 * 60 * 60));
          let displayMinute = Math.floor(
            (this.displayMills - 1000 * 60 * 60 * displayHour) / (1000 * 60)
          );
          let displaySecond = Math.ceil(
            (this.displayMills -
              1000 * 60 * 60 * displayHour -
              1000 * 60 * displayMinute) /
              1000
          );
          this.displayTimeMsg = `${displayHour} h::${displayMinute} m::${displaySecond} s`;
        }, 50);
        // 数据和动画初始化
        this.filterDanmu();
      },
      pausePlayer() {
        clearInterval(this.startTimer);
        // this.pauseAnimation();
        this.pauseDanmu();
      },
      continuePlayer() {
        this.startPlayer(this.displayMills);
        // this.continueAnimation();
        this.continueDanmu();
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
        this.animationTestStartTime = this.displayMills;
        this.animationTestRemainTime = Duration;
        this.animationTestShow = true;
        setTimeout(() => {
          let animationDom = this.$refs.animationItem;
          animationDom.style.left = `${playerWidth}px`;
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
        console.log("animationTestRemainTime:" + this.animationTestRemainTime);
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
        // 定期抓取弹幕信息
        this.danmuDisplayTimer = setInterval(() => {
          // 后续考虑优化？
          //按照startTime升序排列
          // this.danmuQueue = this.danmuQueue.sort((a, b) => {
          //     return a.startTime - b.startTime;
          // });
          // 定时抓弹幕信息
          this.initDanmuList();
          //   定期清理danmuQueue中的过期数据
          let i = 0;
          while (i < this.danmuQueue.length) {
            //删除过期信息：danmu.startTime<currentTime
            // let spliceIndex = this.danmuQueue.findIndex(
            //     danmu =>
            //         danmu.startTime < new Date().getTime() - this.startMills
            // );
            // this.danmuQueue.splice(0, spliceIndex + 1);
            // 当前屏显示信息
            if (this.danmuQueue[i].startTime < this.displayMills - Duration) {
              this.danmuQueue.splice(i, 1);
              continue;
            }
            if (this.danmuQueue[i].startTime > this.displayMills + Duration) {
              i++;
              continue;
            }
            this.displayDanmu(this.danmuQueue[i], 0);
            i++;
          }
          // let filterIndex = this.danmuQueue.findIndex(
          //     danmu =>
          //         danmu.startTime >
          //         new Date().getTime() - this.startMills + Duration
          // );
          // let data = this.danmuQueue.splice(0, filterIndex);
          // this.visiableDanmus.push(data);
        }, Math.floor(Duration / 4));
        // 定期移除弹幕池中的过期弹幕dom节点
        setInterval(() => {
          this.pools = this.pools.filter(pool => {
            return pool.danmus && pool.danmus.length > 0;
          });
          this.pools = this.pools.map(pool => {
            return (pool = pool.danmu.filter(danmu => {
              return danmu.startTime < this.displayMills + Duration;
            }));
          });
        }, Math.floor(Duration / 4));
      },
      //   弹幕展示控制
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
        // 寻找适合轨道
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
      },
      pauseDanmu() {
        this.pools.map(pool => {
          pool.danmus &&
            pool.danmus.map(danmu => {
              danmu.remainTime =
                Duration - (this.displayMills - danmu.startTime);
              this.$refs[danmu.index][0].style.transition = "";
              this.$refs[danmu.index][0].style.transform = "";
              this.$refs[danmu.index][0].style.left = `${playerWidth -
                ((playerWidth + danmu.text.length * danmu.fontSize) *
                  (Duration - danmu.remainTime)) /
                  Duration}px`;
            });
        });
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
                ((playerWidth + danmu.text.length * danmu.fontSize) *
                  (Duration - danmu.remainTime)) /
                  Duration}px`;
            });
        });
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
    width: 100%;
    height: 100%;
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
    width: 100px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    white-space: nowrap;
    // border: 1px black solid;
  }
  .animation {
    position: relative;
    /* &-item {
      display: inline;
      color: rgb(255, 0, 255);
      font-size: 16px;
      position: absolute;
      border: 1px rgb(255, 255, 255) solid;

      word-wrap: none;
      white-space: nowrap;
    } */
    &-layer {
      position: absolute;
    }
    &-item {
      position: absolute;
      display: inline;
      word-wrap: none;
      white-space: nowrap;
      border: 1px rgb(255, 255, 255) solid;
    }
  }
</style>
