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
            displayTimeMsg: "00:00:00"
        };
    },
    mounted() {
        // this.init();
    },
    methods: {
        timer() {},
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
            }, 200);
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
    width: 90%;
    height: 260px;
    background: rgb(0, 0, 0);
    margin: 5%;
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
        margin: 5px;
    }
}
.time-container {
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    // border: 1px black solid;
}
</style>