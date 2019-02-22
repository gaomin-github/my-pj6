import VueRouter from 'vue-router';
import directory from './directory.vue';
import dropDownDemo from './components/drop-down/demo';
import panelDemo from './components/panel/demo';
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
        }
    ]

})
export default routes;