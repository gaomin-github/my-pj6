import VueRouter from 'vue-router';
import directory from './directory.vue';
import dropDownDemo from './components/drop-down/demo';
let routes=new VueRouter({
    mode:'history',
    routes:[
        {
            path:'',
            component:directory,
        },
        {
            path:'/drop-down-demo',
            component:dropDownDemo
        }
    ]

})
export default routes;