// const FLOORNUM = 10;
// export default {
//     data: function () {
//         return {
//             currentFloor: FLOORNUM,
//             finalFloor: 0,
//             taskList: [],
//             direction: '',
//             floors: [],
//             floorTimer: null,
//         }
//     },
//     mounted() {
//         this.init();
//     },
//     computed: {
//         getFloors() {
//             // return this.floors.sort((a, b) => {
//             //     return b.index - a.index;
//             // })
//         }
//     },
//     methods: {
//         init() {
//             this.initFloor();
//             // console.table(this.floors);
//         },
//         initFloor() {
//             let i = FLOORNUM;
//             while (i > 0) {
//                 this.floors.push({
//                     index: i,
//                     up: false,
//                     down: false
//                 })
//                 i--;
//             }
//         },
//         chooseFloor(floorNum, dir) {
//             this.floors[FLOORNUM - floorNum][dir] = true;
//             // console.table(this.floors);
//             // console.log('getFloors');
//             // console.table(this.getFloors);
//             console.log(`floorNum:${floorNum},dir:${dir}`);
//             this.floorMove();
//         },
//         floorMove() {
//             console.log(`direction:${this.direction},currentFloor:${this.currentFloor}`);
//             if (!this.direction) {
//                 // 初始化静止状态
//                 this.direction = 'down';
//                 if (this.floors[FLOORNUM - this.currentFloor].down) this.floors[FLOORNUM - this.currentFloor] = false;
//                 this.floorTimer = setTimeout(() => {
//                     // this.currentFloor--;
//                     this.floorMove();
//                 }, 1000)
//             } else if (this.direction === 'up') {
//                 this.currentFloor++;
//                 // 当前层有上指示
//                 if (this.floors[FLOORNUM - this.currentFloor].up) this.floors[FLOORNUM - this.currentFloor].up = false;

//                 let downIndex = this.floors.slice(FLOORNUM - this.currentFloor, FLOORNUM).findIndex(floor => {
//                     return floor.up || floor.down;
//                 })
//                 let upIndex = this.floors.slice(0, FLOORNUM - this.currentFloor).findIndex(floor => {
//                     return floor.down || floor.up;
//                 })
//                 if (upIndex >= 0 || downIndex < 0) {
//                     // 上层有人等待,下层无人等待
//                     if (this.currentFloor === FLOORNUM) {
//                         // 最高层
//                         this.direction = '';
//                     } else {
//                         // 上行
//                         this.floorTimer = setTimeout(() => {
//                             // this.currentFloor++;
//                             this.floorMove();
//                         }, 1000)
//                     }
//                 } else {
//                     // 上层无指令，下层有等待，下行
//                     this.direction = 'down';
//                     if (this.floors[FLOORNUM - this.currentFloor].down) this.floors[FLOORNUM - this.currentFloor].down = false;

//                     this.floorTimer = setTimeout(() => {
//                         // this.currentFloor--;
//                         this.floorMove();
//                     }, 1000)

//                 }
//             } else if (this.direction === 'down') {
//                 this.currentFloor--;
//                 // 当前层有下指示
//                 if (this.floors[FLOORNUM - this.currentFloor].down) this.floors[FLOORNUM - this.currentFloor].down = false;

//                 let downIndex = this.floors.slice(FLOORNUM - this.currentFloor, FLOORNUM).findIndex(floor => {
//                     return floor.down || floor.up;
//                 })

//                 if (downIndex >= 0) {
//                     // 下层有等待，下行
//                     // this.direction === 'up';
//                     this.floorTimer = setTimeout(() => {
//                         this.floorMove();
//                     }, 1000)
//                 } else {
//                     this.direction = 'up';
//                     if (this.floors[FLOORNUM - this.currentFloor].up) this.floors[FLOORNUM - this.currentFloor].up = false;

//                     this.floorTimer = setTimeout(() => {
//                         // this.currentFloor++;
//                         this.floorMove();
//                     }, 1000)

//                 }

//             }

//         }
//     }
// }
export default {}