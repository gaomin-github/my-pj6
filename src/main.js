"use strict";
import Vue from 'vue';
// import VueRouter from 'vue-router';

import SelfVueRouter from './vue-router-index.js';
import SelfRoutes from './self-router.js';
Vue.use(SelfVueRouter);



// import VueRouter from './vue-router.common.js';

// import router from './router.js';
import App from './app.vue';
// import eruda from 'eruda';
// 注册是为了能在vue实例中使用route实例
// import image1 from '../static/1.jpg';
console.log(__dirname);
// console.log('22222222222');
// console.log('33333333');

// eruda.init();
// Vue.use(tip);
// Vue.use(VueRouter)

let vm = new Vue({
    el: '#app',
    components: {
        'App': App
    },
    template: '<App/>',
    // router: router
    router: SelfRoutes
})