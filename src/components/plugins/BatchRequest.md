setTimeout和serInterval，定义的函数，函数体中this指向全局
立即执行函数中的this指向全局
嵌套函数的this指向：一个函数，若是分配到某个变量的，即不属于任何对象下的一员，那么this的参数就变为windows对象
箭头函数的this指向？
new Promise()中的函数this指向
在promise.then中再新创建then：关于微队列任务分配
then中新创建的promise以及then会先执行
new Promise(function(resolve,reject){
        console.log('111');
        resolve();
    }).then(()=>{
        console.log('222');
        new Promise(function(resolve,reject){
            console.log('555');
            resolve();
        }).then(()=>{
            console.log('666');
        })
    }).then(()=>{
        console.log('333');
    }).then(()=>{
        console.log('444');
    })
    执行结果：
VM441:2 111
VM441:5 222
VM441:7 555
VM441:10 666
VM441:13 333
VM441:15 444