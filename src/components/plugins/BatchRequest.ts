// 批量可控http请求
// 批量接收请求地址
// 并发多次请求，并且可以识别相应返回
// 并发请求次数可控
export default class BatchRequest{
    fetchParams:Array<any>;
    batchNum:number;
    constructor(fetchParams:Array<any>,batchNum?:number){
        this.fetchParams=fetchParams.map((o,oi)=>{

            o=Object.assign(o,{
                status:'init'
            })
            return o;
        })
        this.fetchParams=fetchParams;
        this.batchNum=batchNum||3;
        this.execute();
    }
    execute(){
        let curNum=0
        while(this.fetchParams.filter(o=>o.status=='init').length>0){
            debugger;
            if(curNum<this.batchNum){
                curNum++;
                let curFetchParam=this.fetchParams.filter(o=>o.status=='init')[0];
                curFetchParam.status='sending';
                console.log('sendIndex:'+curNum+',send url:'+curFetchParam.url);
                (function(curFetchParam,curNum){
                    fetch(curFetchParam.url,curFetchParam.option).then(res=>{
                        curNum--;
                        console.log('success');
                        console.log('curNum：'+curNum);
                        console.log(curFetchParam);
                        if(res.ok){
                            curFetchParam.status='finish';
                        }else{
                            curFetchParam.status='error';
                        }

                        curFetchParam.res=res;

                    },res=>{
                        console.log('error');
                        console.log('curNum：'+curNum);
                        curFetchParam.status='error';
                        curFetchParam.res=res;
                    })
                })(curFetchParam,curNum)

            }

        }
    }
}