<template>
    <section>
        <h1>my ajax demo</h1>
        <button @click="singleReq">单次请求</button>
        <button @click="batchReq">单次请求</button>
    </section>
</template>
<script lang="ts"}>
    import SingleRequest from '../plugins/SingleRequest.ts';
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component({
        components:{

        }
    })
    export default class MyAjax extends Vue {
        created(){
        }
        singleReq(){
//            /graphQuery/test?id=123&first_name=张三&age=&last_name=anny'
//            let myFetch=new SingleRequest('/graphQuery/test',{
//                method:'get',
//                body:''
//            },2000);
//            let myFetch=new SingleRequest('/graphQuery/test',{
                let myFetch=new SingleRequest('/AESGet',{
                headers:{
                    contentTtype:'application/json'
                },
                method:'get',
                body:JSON.stringify({
                    id:'222',
                    name:'网二'
                })
            },2000);
            myFetch.execute().then((response:any)=>{
                console.log(response)

            });
//                var xhr=new XMLHttpRequest()
//                xhr.open('POST','http://localhost:9000/ajaxPostTest?time='+new Date(),true)
//                xhr.onreadystatechange=function(){
//                    if(xhr.readyState==4&&xhr.status==200){
//                        console.log('请求成功')
//                    }
//                }
//                let postParam={
//                    "id":1,
//                    "name":'天气'
//                }
//                xhr.setRequestHeader('Content-Type','application/json')
//                xhr.send(JSON.stringify(postParam))
        }
        batchReq(){
            let reqStrs:Array<Object>=[
                {
                    url:'http://localhost:8080/AESGet',
                    option:{
                        method:'get',
                        data:null
                    }
                },{
                    url:'http://localhost:8080/AESPost',
                    option:{
                        method:'post',
                        data:null
                    }
                },{
                    url:'http://localhost:8080/AESGet',
                    option:{
                        method:'get',
                        data:null
                    }
                }
            ]
        }
    }
</script>