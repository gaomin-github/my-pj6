export enum MethodOption{
    GET="GET",
    POST="POST",
    OPTIONS="OPTIONS",
    PUT="PUT",
    DELETE="DELETE"
}
export enum ModeOption{
    cors='cors',                //支持跨域
    no_cors='no-cors',          //支持跨域请求，不支持跨域返回
    same_origin='same-origin'  //只支持同源
}
export enum CacheOption{
    no_cache='no-cache',                //不支持缓存
    reload='reload',
    force_cache='force-cache'
}
export enum CredentialOption{
    include='include',                  //发送凭据
    same_origin='same-origin',          //同源时发送凭据
    omit='omit'                        //可发送凭据，不能接收
}
export enum ContentTypeOption{
    json='application/json;charset=UTF-8',            //json类型
    txt='text/plain;charset=UTF-8',                   //文本格式
    urlencoded='application/x-www-form-urlencoded;charset=UTF-8',     //url串，值被encoded
    formdata='multipart/form-data;charset=UTF-8'      //字节流
}
export enum RedirectOption{
    follow='follow',
    manual='manual',
    error='error'
}
