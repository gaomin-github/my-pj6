import VueRouter from 'vue-router';
import directory from './directory.vue';
import dropDownDemo from './components/drop-down/demo';
import panelDemo from './components/panel/demo';
import dataDemo from './components/datas/demo';
import httpDemo from './components/reqs/MyAjax.vue';
import toolDemo from './components/tools/demo.vue';
import navDemo from './components/nav/demo.vue';
let routes=new VueRouter({
    mode:'history',
    routes:[
        {
            path:'',
            component:directory,
        },{
            path:'/drop-down-demo',
            component:dropDownDemo
        },{
            path:'/panelDemo',
            component:panelDemo
        },{
            path:'/dataDemo',
            component:dataDemo
        },{
            path:'/httpDemo',
            component:httpDemo
        },{
            path:'/toolDemo',
            component:toolDemo
        },{
            path:'/navDemo',
            component:navDemo
        }
    ]

})
export default routes;