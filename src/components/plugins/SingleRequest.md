###fetch和http相关
1.服务端接收参数的方式由客户端request决定(method,header:content-type)
2.客户端接收返回数据，数据类型由什么决定?
3.content-type和data-type的区别，用法
4.使用AbortController实现fetch请求撤回

5.fetch超时设定
typescript联合类型和交叉类型

####关于promise对象及使用
1.promise对象
    new Promise()接收函数并执行，返回一个promise对象
2.promise状态变化和调用时机
    promise.then(resolve,reject)方法，promise是执行成功状态,则自动执行resolve方法
    promise是未定状态，then返回也是未定状态的promise
    resolve/reject返回值时，默认返回成功状态的promise，携带参数为返回值
    resolve/reject返回异常时，默认返回不成功的promise
3.promise.resolve()
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then


