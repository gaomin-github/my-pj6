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
enum CredentialOption{
    include='include',                  //发送凭据
    same_origin='same-origin',          //同源时发送凭据
    omit='*omit'                        //可发送凭据，不能接收
}

enum ContentTypeOption{
    json='application/json',            //json类型
    txt='text/plain',                   //文本格式
    urlencoded='application/x-www-form-urlencoded',     //url串，值被encoded
    formdata='multipart/form-data'      //字节流
}
interface optionConfig{
    method:string,       //请求方式
    headers?:Object,            //请求头参数
    body?:any,               //请求体数据 string,formdata
    mode?:ModeOption,               //是否支持跨域
    cache?:CacheOptioin,                  //是否支持缓存
    credentials?:CredentialOption,
    redirect?:string,
    referer?:string
}
export default class SingleRequest{
    url:string
    option:optionConfig
    constructor(url:string,option:optionConfig){
        this.url=url
        this.option=option
        this.initConfig()
    }
    initConfig(){
        // 初始化跨域设置
        let dest_url=protocal+'://'+domain+':'+port
        let regExp=/^(http|https):\/{2}([0-9a-z]+\.)*[0-9a-z]+(:[0-9]{4})*/g
        let service_url:any=((window.location.href).toLocaleLowerCase()).match(regExp)
        console.log('final service_url：'+service_url)
        if(this.url!=service_url){
            this.option.mode=ModeOption.cors
            this.option.credentials=CredentialOption.include
        }
        // 防止缓存

        // 默认请求数据类型
        this.option.headers={
            "content-type":ContentTypeOption.urlencoded
        }
        if(this.option.method=='GET'){
            this.option.body=null
        }
        console.log('this.url:'+this.url)
        let param_value_reg:RegExp=/=[0-9a-zA-Z\u4e00-\u9fa5_\-]*/g
        let param_name_reg:RegExp=/(&|\?)[0-9a-zA-Z_\-]*=/g
        let urlParams=this.url.match(param_name_reg)
        let urlValues=this.url.match(param_value_reg)
        if(urlParams!=null&&urlValues!=null){
            console.log('urlParams:'+urlParams.length)
            console.log('urlValues:'+urlValues.length)
            for(let i:number=0;i<urlParams.length;i++){
                this.url.replace(urlParams[i]+urlValues[i],urlParams+encodeURI(urlValues[i].slice(1,urlValues[i].length)))
            }
        }
        console.log('this.url:'+this.url)
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
            body:JSON.stringify(this.option.body),
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