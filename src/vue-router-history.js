import { createRoute } from './vue-router-route.js';
export default class HTML5History {
    constructor(router) {
        this.current = START;
        this.router = router;
        this.cb = null;
    }

    transitionTo(path, onComplete, onAbort) {
        const route = this.router.matcher.match(path);
        this.current = route;
        // gaomin20190911 1756
        this.cb(route);
        // this._selfroute = route;

        // this.confirmTransitionTo(route, () => {
        //     this.current = route;
        // }, () => {
        //         console.log('confirmTransitionTo update failed');
        // });
    }

    confirmTransitionTo(route, onComplete, onAbort) {

    }

    pushState(path) {
        this.transitionTo(path);
        console.log('current--------');
        console.table(this.current);
        history.pushState({}, path, path);
    }

    listen(cb) {
        this.cb = cb;
    }

}

const START = createRoute({ path: '/' })