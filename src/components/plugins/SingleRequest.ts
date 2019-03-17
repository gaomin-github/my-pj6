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
    same_origin='same-origin'  //只支持同源
}
enum CacheOptioin{
    no_cache='no-cache',                //不支持缓存
    reload='reload',
    force_cache='force-cache'
}
enum CredentialOption{
    include='include',                  //发送凭据
    same_origin='same-origin',          //同源时发送凭据
    omit='omit'                        //可发送凭据，不能接收
}

enum ContentTypeOption{
    json='application/json',            //json类型
    txt='text/plain',                   //文本格式
    urlencoded='application/x-www-form-urlencoded',     //url串，值被encoded
    formdata='multipart/form-data'      //字节流
}
enum RedirectOption{
    follow='follow',
    manual='manual',
    error='error'
}
interface optionConfig{
    method:string,       //请求方式
    headers?:Headers,            //请求头参数
    body?:any,               //请求体数据 string,formdata
    mode?:ModeOption,               //是否支持跨域
    cache?:CacheOptioin,                  //是否支持缓存
    credentials?:CredentialOption,
    redirect?:RedirectOption,
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
        // 请求头跨域设置
        let dest_url=protocal+'://'+domain+':'+port
        let regExp=/^(http|https):\/{2}([0-9a-z]+\.)*[0-9a-z]+(:[0-9]{4})*/g
        let service_url:any=((window.location.href).toLocaleUpperCase()).match(regExp)
        if(this.url.toLocaleUpperCase()!=service_url){
            console.log('跨域请求')
            this.option.mode=ModeOption.cors
            // this.option.credentials=CredentialOption.include
        }
        // 默认请求数据类型
        let myHeaders=new Headers();
        myHeaders.append("content-type",ContentTypeOption.urlencoded+';charset=utf-8');
        this.option.headers=this.option.headers?this.option.headers:myHeaders
        if(this.option.method.toLocaleUpperCase()=='GET'){
            this.option.body=null
        }
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
    }
    public execute(){
        console.log('this.url:'+this.url)
        return fetch(this.url,this.option).then(response=>{
            // console.log('this.option.headers:'+this.option.headers)
            // console.log(this.option.headers)
            // console.log('this.option.headers.content-type:')
            if(response.ok&&this.option.headers&&this.option.headers.get('content-type')){
                if((new RegExp(ContentTypeOption.formdata,'g')).test(this.option.headers.get('content-type')||'')){
                    console.log('blob')
                    return response.blob()
                }else if((new RegExp(ContentTypeOption.json,'g')).test(this.option.headers.get('content-type')||'')){
                    console.log('json')
                    return response.json()
                }else{
                    return response.text()
                }
            }
        }).catch(response=>{
            console.log(response.error)
        })
    }

}