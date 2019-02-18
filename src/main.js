"use strict";
import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router.js';
import App from './app.vue';
// 注册是为了能在vue实例中使用route实例
Vue.use(VueRouter)
var vm=new Vue({
    el:'#app',
    components:{
        'App':App
    },
    template:'<App/>',
    router:router
})