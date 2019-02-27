import Vue from 'vue';
import VueRouter from 'vue-router';
import {Route} from 'vue-router';
import {Component} from 'vue-property-decorator';
declare module 'vue/types/vue' {
    import Vue from 'vue';
    export default Vue;
    interface Vue{
        $router:VueRouter,
        $route:routes
    }
}