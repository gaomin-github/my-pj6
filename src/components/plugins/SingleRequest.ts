const protocal='http';
const domain='localhost';
const port='9000';
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
            this.option.mode=this.option.mode||ModeOption.cors

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
        let param_value_reg:RegExp=/=[0-9a-zA-Z\u4e00-\u9fa5_\-]*/g
        let param_name_reg:RegExp=/(&|\?)[0-9a-zA-Z_\-]*=/g
        let urlParams=this.url.match(param_name_reg)
        let urlValues=this.url.match(param_value_reg)
        if(urlParams!=null&&urlValues!=null){
            for(let i:number=0;i<urlParams.length;i++){
                this.url=this.url.replace(urlParams[i]+urlValues[i].slice(1,urlValues[i].length),urlParams[i]+encodeURI(urlValues[i].slice(1,urlValues[i].length)))
            }
        }
        // 防止缓存
        if(this.url.search(/\?/g)>=0){
            this.url=this.url+'&time='+new Date()
        }else{
            this.url=this.url+'?time='+new Date()
        }
        this.url=dest_url+this.url
        console.log('this.url:'+this.url)
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
        console.log('request.url:'+this.url)
        return fetch(this.url,this.option).then(response=>{
            clearInterval(watchTask);
            this.exeTime=0;
            console.log(response)
            if(response.ok){
                if(this.option.headers&&this.option.headers.get('content-type')){
                    if((new RegExp(ContentTypeOption.formdata,'g')).test(this.option.headers.get('content-type')||'')){
                        return response.blob()
                    }else if((new RegExp(ContentTypeOption.json,'g')).test(this.option.headers.get('content-type')||'')){
                        return response.json()
                    }else{
                        return response.text()
                    }
                }
            }else{
                Promise.reject(response)
            }
        },(response=>{
            clearInterval(watchTask);
            this.exeTime=0;
            if((new Date()).getTime()-this.exeTime>this.timeOut){
                throw new Error('请求超时')
            }
            console.log(response)
            return 'error'
        })).catch(error=>{
            console.log(error)
            return 'error'
        })
    }

}