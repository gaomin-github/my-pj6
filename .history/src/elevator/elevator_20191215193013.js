const FLOORNUM = 10;
export default {
  data: function() {
    return {
      currentFloor: FLOORNUM,
      finalFloor: 0,
      taskList: [],
      direction: "",
      floors: [],
      floorTimer: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initFloor();
      console.table(this.floors);
    },
    // 业务设计
    // 选中楼层，楼层上/下被标志
    楼层初始化在最上层
    楼层被选中：
    1.打上电梯移动标志
    2.
    initFloor() {
      let i = 1;
      while (i <= FLOORNUM) {
        this.floors.push({
          up: false,
          down: false
        });
        i++;
      }
    },
    chooseFloor(floorNum, dir) {
      this.floors[floorNmu - 1][dir] = true;
    },
    floorMove() {
      if (!this.direction) {
        // 初始化静止状态
        this.direction = "down";
        this.floorTimer = setTimeout(() => {
          this.currentFloor--;
          this.floorMove();
        }, 1000);
      } else if (this.direction === "up") {
        let downIndex = this.floors
          .slice(0, this.currentFloor)
          .findIndex(floor => {
            return floor.up || floor.down;
          });
        let upIndex = this.floors
          .slice(this.currentFloor, FLOORNUM)
          .findIndex(floor => {
            return floor.down || floor.up;
          });
        if (upIndex >= 0 || downIndex < 0) {
          // 上层有人等待,下层无人等待
          if (this.currentFloor === FLOORNUM) {
            // 最高层
            this.direction = "";
          } else {
            // 上行
            this.floorTimer = setTimeout(() => {
              this.currentFloor++;
              this.floorMove();
            }, 1000);
          }
        } else {
          // 上层无指令，下层有等待，下行
          this.direction = "down";
          this.floorTimer = setTimeout(() => {
            this.currentFloor--;
            this.floorMove();
          }, 1000);
        }
      } else if (this.direction === "down") {
        let downIndex = this.floors
          .slice(0, this.currentFloor)
          .findIndex(floor => {
            return floor.down || floor.up;
          });

        if (downIndex >= 0) {
          // 下层有等待，下行
          // this.direction === 'up';
          this.floorTimer = setTimeout(() => {
            this.currentFloor--;
            this.floorMove();
          }, 1000);
        } else {
          this.direction = "up";
          this.floorTimer = setTimeout(() => {
            this.currentFloor++;
            this.floorMove();
          }, 1000);
        }
      }
    }
  }
};
