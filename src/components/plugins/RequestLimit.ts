// 节流：在规定的事件只触发一次
export const Throttle=(function(){
    let lastTime:number=(new Date()).getTime();
    return function(fn:any,interval:number){
        let curTime:number=(new Date()).getTime();
        if(curTime-lastTime>=interval){
            lastTime=(new Date()).getTime();
            fn.apply(arguments)
        }
    }
})()
// 防抖：在规定时间只处理一次请求，如果时间范围内有多次请求，从最新一次请求开始计时
export const Debounce=(function(){
    let lastTime:number=(new Date()).getTime()
    return function(fn:any,interval:number){
        let curTime:number=(new Date()).getTime();
        if(curTime-lastTime>=interval){
            lastTime=(new Date()).getTime();
            fn.apply(arguments)
        }else{
            lastTime=curTime
        }
    }
})()