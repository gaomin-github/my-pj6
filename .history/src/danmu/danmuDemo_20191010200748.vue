<template>
    <section>
        <section class="player-container"></section>
        <section class="control-bar">
            <span>{{displayTimeMsg}}</span>
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
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.startTimer = setInterval(() => {
                let currentMills = new Date().getTime();
                let displayMills = currentMills - this.startMills;
                let displayHour = displayMills / (1000 * 60 * 60);
                let displayMinute =
                    (displayMills - 1000 * 60 * 60 * displayHour) / (1000 * 60);
                let displaySecond =
                    (displayMills -
                        1000 * 60 * 60 * displayHour -
                        1000 * 60 * displayMinute) /
                    (1000 * 60);
                this.displayTimeMsg = `${displayHour} h::${displayMinute} m::${displaySecond} s`;
            }, 300);
        },
        startPlayer() {
            this.startTimer();
        },
        stopPlayer() {
            clearInterval(this.startTimer);
        }
    }
};
</script>
<style lang="scss" scoped>
section {
    display: block;
}
.player-container {
    width: 400px;
    height: 300px;
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
</style>