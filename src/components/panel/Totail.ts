import myTotail from './Totail.vue';
import Vue from 'vue';
export default class Tot extends myTotail{
    // message:string;
    id:number;
    vmIns:Vue;
    node:Node;
    constructor(message:string){
        super();
        this.message=message;
        this.init();
    }
    init(){
        this.vmIns=this.$mount()
        this.node=this.vmIns.$el;
        document.body.appendChild(this.node);
        // console.log('node');
        // console.log(node);

    }
    public show(){

    }
    public hide(){
        document.body.removeChild(this.node);
    }
}