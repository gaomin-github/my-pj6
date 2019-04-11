export function aesRequestGet(){
    return fetch('http://localhost:8080/AESGet',{
        method:'GET',
        headers:{
            "app-token":"123getreq"
        },
        body:null
    }).then(res1=>{
        console.log('app-token:'+res1.headers.get('app-token'));
        return res1.text();
    }).then(res2=>{
        return res2+',1'
    })

}
export function aesRequestPost(){
    return fetch('http://localhost:8080/AESPost',{
        method:'POST',
        // mode:'cors',
        headers:{
            'content-type':'application/json',
            "app-token":"123 post req"
        },
        body:(new Date()).getTime()
    }).then(res=>{
        console.log(res);
        res.headers.forEach(o=>{
            console.log(o)
        })
        return Promise.resolve(res.text())
    })
}
