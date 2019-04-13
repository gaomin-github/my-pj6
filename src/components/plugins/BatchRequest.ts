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
        let taskHandler=function(resolve){
            this.fetchParams.filter(o=>o.status=='init').find(curFetchParam=>{
                // debugger;
                if(curNum<this.batchNum){
                    curNum++;
                    console.log('curNum:'+curNum+',exeNum:'+exeNum);
                    let curFetchParam=this.fetchParams.filter(o=>o.status=='init')[0];
                    curFetchParam.status='sending';
                    (function(curFetchParam,resolve){
                        fetch(curFetchParam.url,curFetchParam.option).then(res=>{
                            curNum--;
                            exeNum++;
                            if(res.ok){
                                curFetchParam.status='finish';
                            }else{
                                curFetchParam.status='error';
                            }
                            curFetchParam.res=res;
                            return exeNum;

                        },res=>{
                            curNum--;
                            exeNum++;
                            curFetchParam.status='error';
                            curFetchParam.res=res;
                            return exeNum;
                        }).then(exeNum=>{
                            if(exeNum<this.fetchParams.length) taskHandler.bind(this)(resolve)
                        })
                    }).bind(this)(curFetchParam,resolve)
                }
            })
        }
        return new Promise((resolve,reject)=>{
            taskHandler.bind(this)(resolve);
        })
    }
}