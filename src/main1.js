"use strict";
import Vue from 'vue';
var A='<h1>main1</h1>'
var vm=new Vue({
    el:'#app1',
    components:{
        'A':{
            template:'<h1>我是main1组件</h1>'
        }
    },
    template:'<A/>'
})