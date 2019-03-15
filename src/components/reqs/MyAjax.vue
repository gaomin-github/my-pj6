<template>
    <section>
        <h1>my ajax demo</h1>
        <button @click="ajaxText">ajax测试</button>
    </section>
</template>
<script>
    import SingleRequest from '../plugins/SingleRequest.ts';
    export default {
        created:function(){
        },
        methods:{
            ajaxText(){
                let myFetch=new SingleRequest('/fetchTest',{
                    method:'get',
                    body:null,

                })
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
        }
    }
</script>