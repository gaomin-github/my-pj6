// import myTotail from './Totail.vue';
import Vue from 'vue';
// export default class Tot extends myTotail {
export default class Tot {
    id: number;
    vmIns: Vue;
    node: Node;
    constructor(message: string) {
        // super();
        // this.message=message;
        this.init();
    }
    init() {
        // this.vmIns=this.$mount()
        this.node = this.vmIns.$el;
        // this.show();
    }
    public show() {
        document.body.appendChild(this.node);
    }
    public hide() {
        document.body.removeChild(this.node);
    }
    handleClose() {
        console.log('ts');
    }
}