import { createMatcher } from './vue-router-create-matcher-map.js';

import { install } from './vue-router-install.js';
import HTML5History from './vue-router-history.js';

export default class VueRouter {

    constructor(options) {
        this.mode = options.mode;
        this.routes = options.routes;
        this.history = null;
        this.matcher = createMatcher(this.routes);
        switch (this.mode) {
            case 'history':
                this.history = new HTML5History(this)
                break
        }

    }
    init() {
        this.history.transitionTo('/');
    }
}

VueRouter.install = install;