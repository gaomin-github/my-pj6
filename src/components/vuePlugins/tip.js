import tipComponent from './tip.vue';
export default{
    install:function(){
        console.log('global plugin tip');
        // console.log('execute tip install');
        Vue.component('tip',tipComponent);
    }
}