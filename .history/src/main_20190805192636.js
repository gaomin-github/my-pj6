"use strict";
import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router.js';
import App from './app.vue';
// 注册是为了能在vue实例中使用route实例
// import image1 from '../static/1.jpg';
console.log(__dirname);
console.log('22222222222');

// Vue.use(tip);
Vue.use(VueRouter)

let vm = new Vue({
    el: '#app',
    components: {
        'App': App
    },
    template: '<App/>',
    router: router
})