export default {
    functional: true,
    props: {
        name: {
            type: String,
            default: 'default'
        }
    },
    render: function (h, { props, data, parent, children }) {
        data.routerView = true;
        let viewDepth = 0;
        const route = parent.$selfroute;
        // let name = this.type;
        // parent.routerView = true;

        while (parent && parent !== parent.$parent) {
            if (parent.routerView) {
                viewDepth++;
            }
            parent = parent.$parent;
        }
        let component = route.matched[viewDepth].components[props.name];

        return h(component, data, children);
    }
}
