export class vueRouter {
    constructor(options) {

    }
}
export function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            this._router = this.$options.router;
            Vue.util.defineReactive(this, '_route', this._router.history.current);
        }
    })
    Vue.prototype.$route = this._routeRoot._route;
    Vue.prototype.$router = this._routeRoot._router;
    Vue.component('routerView')
}
let routerView = {
    name: 'routerView',
    render(h, context) {
        let parent = context.parent;
        let route = context.$route;
        let data = context.data;
        return h(route, data, context.children);

    }
}

let routerLink = {
    name: 'routerLink',
    props: {
        to: String,
        tag: {
            type: String,
            default: 'a'
        }
    },
    render(h, { props, children, data, parent, listeners }) {
        let url = this.$router.location + this.to;
        const on = {
            click: () => {
                pushState(url);
            }
        }
        data.on = on;
        return h(tag, data, children);

    }
}

export function pushState(url) {
    const history = window.history;
    history.pushState(url);
}
vueRouter.install = install;
