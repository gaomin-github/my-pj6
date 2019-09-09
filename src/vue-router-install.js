import { vueRouter } from "./vue-router-self";

import selfRouterView from './vue-router-view.js';
import selfRouterLink from './vue-router-link.js';

export let _Vue;
export function install(Vue) {
    // if (install.installed && _vue === Vue) return;
    // install.installed = true;
    _Vue = Vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._routerRoot = this;
                this.$options.router.init(this);
                let router = this.$options.router;
                Vue.util.defineReactive(this, '_selfroute', router.history.current);
                // Vue.util.defineReactive(Vue, '_selfroute', Vue.options.router.history.current);
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
            }
        }
    })
    // Vue.prototype.$selfroute = Vue._selfroute;
    // Vue.prototype.$selfrouter = Vue.options.router;

    Object.defineProperty(Vue.prototype, '$selfroute', {
        get() {
            return this._routerRoot._selfroute;
            // return Vue._selfroute
        }
    })

    Object.defineProperty(Vue.prototype, '$selfrouter', {
        get() {
            return this._routerRoot.$options.router;
            // return Vue.options.router
        }
    })
    // 
    Vue.component('selfRouterLink', selfRouterLink);
    Vue.component('selfRouterView', selfRouterView);
}