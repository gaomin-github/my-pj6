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
        let curNum=0,exeNum=0;
        let requestHandle=function(){
            this.fetchParams.filter(o=>o.status=='init').find(curFetchParam=>{
                debugger;
                if(curNum<this.batchNum){
                    curNum++;
                    let curFetchParam=this.fetchParams.filter(o=>o.status=='init')[0];
                    curFetchParam.status='sending';
                    console.log('sendIndex:'+curNum+',send url:'+curFetchParam.url);
                    (function(curFetchParam){
                        fetch(curFetchParam.url,curFetchParam.option).then(res=>{
                            console.log(this);
                            curNum--;
                            exeNum++;
                            console.log('success');
                            console.log('curNum：'+curNum);
                            console.log(curFetchParam);
                            if(res.ok){
                                curFetchParam.status='finish';
                            }else{
                                curFetchParam.status='error';
                            }
                            curFetchParam.res=res;
                            return exeNum;

                        },res=>{
                            curNum--;
                            console.log('error');
                            console.log('curNum：'+curNum);
                            exeNum++;
                            curFetchParam.status='error';
                            curFetchParam.res=res;
                            return exeNum;
                        }).then(exeNum=>{

                        })
                    }).bind(this)(curFetchParam)

                }
            })
        }
        let timerTask=setInterval(requestHandle.bind(this),500)

    }
}