import SelfVueRouter from './vue-router-index.js';
let SelfRoutes = new SelfVueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: () => import('./components/panel/demo.vue')
    }, {
        path: '/paneldemo',
        component: () => import('./components/panel/demo.vue')
    }, {
        path: '/dropdowndemo',
        component: () => import('./components/drop-down/demo.vue')
    }]
})
export default SelfRoutes;