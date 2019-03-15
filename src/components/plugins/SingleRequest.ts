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
    no_cors='no-cors',          //支持跨域请求，不支持跨域返回
    same_origin='*same-origin'  //只支持同源
}
enum CacheOptioin{
    no_cache='no-cache',                //不支持缓存
    reload='reload',
    force_cache='force-cache',
    onlyIfCache='only-if-cached'
}
enum credentialOption{
    include='include',                  //发送凭据
    same_origin='same-origin',          //同源时发送凭据
    omit='*omit'                        //可发送凭据，不能接收
}
interface optionConfig{
    method:MethodOption,       //请求方式
    headers?:Object,            //请求头参数
    body?:string,               //请求体数据 string,formdata
    mode?:ModeOption,               //是否支持跨域
    cache?:string,                  //是否支持缓存
    credentials?:string,
    redirect?:string,
    referer?:string
}
enum ContentTypeOption{
    json='application/json',            //json类型
    txt='text/plain',                   //文本格式
    urlencoded='application/x-www-form-urlencoded',     //url串，值被encoded
    formdata='multipart/form-data'      //字节流
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