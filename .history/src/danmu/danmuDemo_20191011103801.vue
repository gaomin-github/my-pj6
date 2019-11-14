<template>
    <section>
        <section class="player-container"></section>
        <section class="control-bar">
            <section class="time-container">{{displayTimeMsg}}</section>
            <button @click="startPlayer">播放器开始</button>
            <button @click="stopPlayer">播放器结束</button>
            <button @click="continuePlayer">播放器继续</button>
        </section>
    </section>
</template>
<script>
export default {
    data: function() {
        return {
            startMills: 0,
            startTimer: null,
            displayTimeMsg: ""
        };
    },
    mounted() {},
    methods: {
        init() {
            this.startTimer = function() {
                setInterval(() => {
                    let currentMills = new Date().getTime();
                    let displayMills = currentMills - this.startMills;
                    let displayHour = Math.floor(
                        displayMills / (1000 * 60 * 60)
                    );
                    console.log("displayHour:" + displayHour);
                    let displayMinute =
                        (displayMills - 1000 * 60 * 60 * displayHour) /
                        (1000 * 60);
                    let displaySecond =
                        (displayMills -
                            1000 * 60 * 60 * displayHour -
                            1000 * 60 * displayMinute) /
                        (1000 * 60);
                    this.displayTimeMsg = `${displayHour} h::${displayMinute} m::${displaySecond} s`;
                }, 300);
            };
        },
        startPlayer() {
            this.startTimer();
        },
        stopPlayer() {
            clearInterval(this.startTimer);
        },
        continuePlayer() {
            this.startTimer();
        }
    }
};
</script>
<style lang="scss" scoped>
section {
    display: block;
}
.player-container {
    width: 300px;
    height: 260px;
    background: rgb(0, 0, 0);
}
.control-bar {
    // width:300px;
    height: 60px;
    span {
        font-size: 16px;
        line-height: 30px;
    }
    button {
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        margin: 10px;
    }
}
.time-container {
    width: 100px;
    height: 60px;
    line-height: 60px;
}
</style>