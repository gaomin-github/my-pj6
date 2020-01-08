import VueRouter from "vue-router";
// import VueRouter from './vue-router.common.js';
import directory from "./directory.vue";
// import dropDownDemo from './components/drop-down/demo';
// import panelDemo from './components/panel/demo';
// import dataDemo from './components/datas/demo';
// import httpDemo from './components/reqs/MyAjax.vue';
// import toolDemo from './components/tools/demo.vue';
// import navDemo from './components/nav/demo.vue';
// import directDemo from './components/direct/demo.vue';
// import directDemo2 from './components/direct/demo2.vue';
// import vuePluginDemo from './components/vuePlugins/demo.vue';
let routes = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "",
      component: directory
    },
    ,
    // {
    //     path: '/drop-down-demo',
    //     component: dropDownDemo
    // },
    // {
    //     path: '/panelDemo',
    //     component: panelDemo
    // }, {
    //     path: '/dataDemo',
    //     component: dataDemo
    // }, {
    //     path: '/httpDemo',
    //     component: httpDemo
    // }, {
    //     path: '/toolDemo',
    //     component: toolDemo
    // }, {
    //     path: '/navDemo',
    //     component: navDemo
    // }, {
    //     path: '/directDemo',
    //     component: directDemo
    // },
    // {
    //     path:'/directDemo2',
    //     component:directDemo2
    // },
    // {
    //     path: '/vuePluginDemo',
    //     component: vuePluginDemo
    // },
    // {
    //     path: '/loaderDemo',
    //     component: () => import('./components/demos/loaderDemo.vue')
    // }
    // ,
    // {
    //     path:'/errorPopDemo',
    //     component:()=>import('./errorInPractice/pop-demo.vue')
    // },{
    //     path:'/vueFor',
    //     component:()=>import('./errorInPractice/vueFor.vue')
    // }
    // {
    //     path: '/fileDemo',
    //     component: () => import('./page/fileDemo.vue')
    // },
    // {
    //     path: '/imgPickDemo',
    //     component: () => import('./components/file-manage/file-demo.vue')
    // },
    {
      path: "/fixedStyleDemo",
      component: () => import("./demoInIOS/fixedStyleDemo.vue")
    },
    {
      path: "/barrageDemo",
      component: () => import("./barrage/barrage.vue")
    },
    // {
    //     path: '/cssStyleDemo',
    //     component: () => import('./demoInIOS/cssStyleDemo.vue')
    // },
    {
      path: "/barrageDemo",
      component: () => import("./barrage/barrage.vue")
    },
    {
      path: "/danmuDemo",
      component: () => import("./danmu/danmuDemo.vue")
    },
    {
      path: "/asyncDemo",
      component: () => import("./async/asyncDemo.vue")
    },
    {
      path: "/elevatorDemo",
      component: () => import("./async/elevator.vue")
    }
  ]
});
export default routes;
