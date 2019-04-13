###fetch和http相关
1.服务端接收参数的方式由客户端request决定(method,header:content-type)
2.客户端接收返回数据，数据类型由什么决定?
3.content-type和data-type的区别，用法
4.使用AbortController实现fetch请求撤回

5.fetch超时设定
typescript联合类型和交叉类型
1.fetch跨域参数
    关于跨域的参数
    mode:cors(跨域，需要服务端配合设置origin），no-cors不需要服务端配合，但是不能从response中取值（或许websocket可以解决）
2.fetch返回值
    fetch返回的resposne.body是readstream类型，可以根据返回头参数做转化，取res.text()；res.json()；具体实现参照react-native中whatwg-fetch
    fetch发请求，连接不上不会执行reject,而是resolve（即，404执行resolve)
3.fetch的onload执行中会调用resolve()

####关于promise对象及使用
1.promise对象
    new Promise()接收函数并执行，返回一个promise对象
2.promise状态变化和调用时机
    promise.then(resolve,reject)方法，promise是执行成功状态,则自动执行resolve方法
    promise是未定状态，then返回也是未定状态的promise
    resolve/reject返回值时，默认返回成功状态的promise，携带参数为返回值
    resolve/reject返回异常时，默认返回不成功的promise
3.promise的then函数
    then函数返回一个promise对象，then中注册的函数，返回值是返回给promise对象作为参数的
 函数只调用promise，没有返回，那么函数执行结束，promise也结束，没有promsie对象作为返回；
4.promise.resolve(a);返回一个promise对象，给回调函数传入值a;
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then


