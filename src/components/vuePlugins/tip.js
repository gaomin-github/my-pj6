// tip消息提示插件
import tipComponent from './tip.vue';
export default{
    install:function(){
        Vue.component('tip',tipComponent);
    }
}