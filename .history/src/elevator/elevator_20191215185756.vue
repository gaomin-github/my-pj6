<template>
  <section class="elevator-container">
    <section
      v-for="(floor, floorIndex) in floors"
      :key="floorIndex"
      class="floor"
    >
      <section class="floor-label">{{ floorIndex + 1 }}</section>
      <!-- <section class="floor-btn" :class={floor.up?'floor-btn-active':''}>up</section> -->
      <section class="floor-btn">down</section>
    </section>
  </section>
</template>
<script src="./elevator.js"></script>
<style lang="scss" scoped>
.elevator-container {
  width: 100%;
  height: 100%;
  border: 1px black solid;
}
.floor {
  width: 200px;
  // height: 50px;
  margin: 10px;
  font-size: 22px;
  line-height: 22px;
  display: flex;
  &-label {
    display: block;
    margin-right: 20px;
    width: 40px;
  }
  &-btn {
    margin-left: 5px;
    padding: 5px 10px;
    border: 1px #cecece solid;
    border-radius: 5px;
  }
  &-btn-active {
    background: rgb(50, 180, 220);
  }
}
</style>
