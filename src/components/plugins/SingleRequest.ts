const protocal='http';
const domain='localhost';
const port='8080';
import {ModeOption,CacheOption,CredentialOption,RedirectOption,ContentTypeOption} from "./requestParam";

export interface optionConfig{
    method:string,       //请求方式
    headers?:any,            //请求头参数
    body?:any,               //请求体数据 string,formdata
    mode?:ModeOption,               //是否支持跨域
    cache?:CacheOption,                  //是否支持缓存
    credentials?:undefined|CredentialOption,        //是否支持发送cookie
    redirect?:RedirectOption,
    referer?:string,
    signal?:AbortSignal
}
export default class SingleRequest{
    url:string
    option:optionConfig
    timeOut:number
    exeTime:number
    controller:AbortController
    // 使用abort controller撤回请求

    constructor(url:string,option:optionConfig,timeOut?:number,){
        this.url=url
        this.option=option
        this.timeOut=timeOut||3000
        this.controller=new AbortController()
        this.initConfig()
    }
    initConfig(){
        // 请求头跨域设置
        let dest_url=protocal+'://'+domain+':'+port
        let regExp=/^(http|https):\/{2}([0-9a-z]+\.)*[0-9a-z]+(:[0-9]{4})*/g
        let service_url:any=((window.location.href).toLocaleUpperCase()).match(regExp)
        if(this.url.toLocaleUpperCase()!=service_url){
            console.log('跨域请求')
            // this.option.credentials=this.option.credentials||CredentialOption.include
        }
        // 请求头设置
        let myHeaders=new Headers();
        myHeaders.append("content-type",ContentTypeOption.urlencoded+';charset=utf-8');
        this.option.headers=this.option.headers?this.option.headers:myHeaders;
        // 请求方式设置
        if(this.option.method.toLocaleUpperCase()=='GET'){
            this.option.body=null
        }
        // url中查询参数重新处理
        let urlParams=this.url.match(/(&|\?)[0-9a-zA-Z_\-]*=/g)
        let urlValues=this.url.match(/=[0-9a-zA-Z\u4e00-\u9fa5_\-]*/g)
        if(urlParams!=null&&urlValues!=null){
            for(let i:number=0;i<urlParams.length;i++){
                this.url=this.url.replace(urlParams[i]+urlValues[i].slice(1,urlValues[i].length),urlParams[i]+encodeURI(urlValues[i].slice(1,urlValues[i].length)))
            }
        }
        // 防止缓存
        // if(this.url.search(/\?/g)>=0){
        //     this.url=this.url+'&time='+new Date()
        // }else{
        //     this.url=this.url+'?time='+new Date()
        // }
        // this.option.cache=CacheOption.force_cache;
        this.url=dest_url+this.url
        this.option.signal=this.controller.signal
    }
    public execute(){
        this.exeTime=(new Date()).getTime();
        let obj=this;
        let watchTask=setInterval(function(){
            if((new Date()).getTime()-obj.exeTime>=obj.timeOut){
                obj.controller.abort()
            }
        },1000)
        return fetch(this.url,this.option).then(response=>{
            clearInterval(watchTask);
            this.exeTime=0;
            if(response.ok){
                switch(response.headers.get('content-type')){
                    case ContentTypeOption.txt:return response.text()
                    case ContentTypeOption.json:return response.json()
                    case ContentTypeOption.formdata:return response.blob()
                    default: return response.blob()
                }
            }else{
                throw new Error('error statusCode：'+response.status);
            }
        },(response=>{
            throw new Error('error statusCode：'+response.status);
        })).catch(error=>{
            return error;
        }).then(resText=>{
            return resText;
        })
    }

}