// 单次请求
const protocal='http';
const domain='localhost';
const port='9000';
enum MethodOption{
    GET="GET",
    POST="POST",
    OPTIONS="OPTIONS",
    PUT="PUT",
    DELETE="DELETE"
}
enum ModeOption{
    cors='cors',                //支持跨域
    no-cors:'no-cors',          //支持跨域请求，不支持跨域返回

}
interface optionConfig{
    method?:MethodOption,       //请求方式
    headers?:Object,            //请求头参数
    body?:string,               //请求体数据
    mode?:string,               //是否支持跨域
    cache?:string,
    credentials?:string,
    redirect?:string,
    referer?:string
}
export class SingleRequest{
    url:string
    option:any
    constructor(url:string,option:optionConfig){
        this.url=url
        this.option=option
        this.initConfig()
    }
    initConfig(){
        this.url=protocal+'://'+domain+':'+port+this.url
        if(this.url.search(/\?/g)>=0){
            this.url=this.url+'&time='+new Date()
        }else{

            this.url=this.url+'?time='+new Date()
        }
    }
    execute(){
        fetch(this.url,{
            method:this.option.method,
            headers:{

            },
            body:JSON.stringify(this.option.data),
            mode:'cors',
            cache:'no-cache',
            credentials:'same-origin',
            redirect:'follow',
            referrer:'no-referer',
        }).then(response=>{
            let res:any=response.json()
            console.log('res:')
            console.log(res)
        })
    }

}