import { vueRouter } from "./vue-router-self";

import selfRouterView from './vue-router-view.js';
import selfRouterLink from './vue-router-link.js';

export let _Vue;
export function install(Vue) {
    if (install.installed && _vue === Vue) return;
    install.installed = true;
    _Vue = Vue;

    Vue.mixin({
        beforeCreate() {
            this.$options.router.init(this);
            let router = this.$options.router;
            Vue.util.defineReactive(this, '_selfroute', router.history.current);
        }
    })
    Vue.prototype.$selfroute = this._selfroute;
    Vue.prototype.$selfrouter = this.$options.router;

    Vue.component('selfRouterLink', selfRouterLink);
    Vue.component('selfRouterView', selfRouterView);
}