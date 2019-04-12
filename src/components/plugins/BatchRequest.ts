// 批量可控http请求
// 批量接收请求地址
// 并发多次请求，并且可以识别相应返回
// 并发请求次数可控
export default class BatchRequest{
    fetchParams:Array<Object>;
    batchNum:number;
    constructor(fetchParams:Array<Object>,batchNum?:number){
        // this.fetchParams=fetchParams.map((o,oi)=>{
        //     o.index=oi;
        //     return o;
        // })
        this.fetchParams=fetchParams;
        this.batchNum=batchNum||3;
    }
    execute(){
        let curOrder=0
        if(this.fetchParams.length>0){
            this.fetchParam[curOrder].order=curOrder;
            fetch(this.fetchParam[curOrder].url,this.fetchParams[curOrder].option).then(res=>{
                console.log('index:$(curOrder)');
                if(res.ok){
                    this.fetchParams.splice(this.fetchParams.findIndex(o=>{
                        return o.order==curOrder
                    })-1,1);
                }else{
                    this.fetchParam[curOrder].status='error';
                    // throw newError()
                }


            })
        }
    }
}