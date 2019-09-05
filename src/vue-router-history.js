import { createRoute } from './vue-router-route.js';
export default class HTML5History {
    constructor(router) {
        this.current = START;
        this.router = router;
    }

    transitionTo(path, onComplete, onAbort) {
        const route = this.router.matcher.match(path);
        this.current = route;
        // this.confirmTransitionTo(route, () => {
        //     this.current = route;
        // }, () => {
        //         console.log('confirmTransitionTo update failed');
        // });
    }

    confirmTransitionTo(route, onComplete, onAbort) {

    }



}

const START = createRoute({ path: '/' })