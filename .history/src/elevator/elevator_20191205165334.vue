<template>
    <section class="elevator-container">
        <!-- <section v-for="(floor,floorIndex) in floors" :key="floorIndex" class="floor">
            <section class="floor-label">{{floor.index}}</section>
            <section
                class="floor-btn"
                :class="{'floor-btn-active':floor.up}"
                @click="chooseFloor(floor.index,'up')"
            >up</section>
            <section
                class="floor-btn"
                :class="{'floor-btn-active':floor.down}"
                @click="chooseFloor(floor.index,'down')"
            >down</section>
            <section class="floor-icon-up" v-if="direction==='up'"></section>
        <section class="floor-icon-down" v-if="direction==='down'"></section>-->
        <!-- </section>
        <section>当前楼层{{currentFloor}},方向{{direction}}</section>-->
    </section>
</template>
<script src="./elevator.js">
</script>
<style lang="scss" scoped>
.elevator-container {
    width: 100%;
    height: 100%;
    border: 1px black solid;
}
.floor {
    width: 100%;
    margin: 10px;
    font-size: 22px;
    line-height: 22px;
    display: flex;
    position: relative;
    // &-label {
    //     display: block;
    //     margin-right: 20px;
    //     width: 40px;
    // }
    // &-btn {
    //     margin-left: 5px;
    //     padding: 5px 10px;
    //     border: 1px #cecece solid;
    //     border-radius: 5px;
    // }
    // &-btn-active {
    //     background: rgb(50, 180, 220);
    // }
    // &-icon-up,
    // &-icon-down {
    //     border: 20px rgb(200, 150, 50) solid;
    //     border-left: 10px solid transparent;
    //     border-right: 10px solid transparent;
    //     position: absolute;
    // }
    // &-icon-up {
    //     border-top: 10px solid transparent;
    //     bottom: 7px;
    //     right: 140px;
    // }
    // &-icon-down {
    //     border-bottom: 10px solid transparent;
    //     top: 7px;
    //     right: 110px;
    // }
}
</style>