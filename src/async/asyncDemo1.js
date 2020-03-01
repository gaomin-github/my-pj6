// 宏任务和微任务执行顺序
setTimeout(() => {
  console.log(`task1`, 1);

  new Promise(resolve => resolve())
    .then(() => {
      console.log(`task2`, 2);
    })
    .then(() => {
      console.log(`task3`, 3);
    });
}, 0);

new Promise(resolve => resolve())
  .then(() => {
    console.log(`task4`, 4);
  })
  .then(() => {
    console.log(`task5`, 5);
  })
  .then(() => {
    setTimeout(() => {
      console.log(`task7`, 7);
    }, 0);
  });

setTimeout(() => {
  console.log(`task6`, 6);
}, 0);
// task6时间设为100时，task6和task7执行顺序有可能不一致
