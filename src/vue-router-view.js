let selfRouterView = {
    props: {
        type: String,
        default: 'default'
    },
    render(h, { props, children, data, parent }) {
        let viewDepth = 0;
        const route = parent.$route;
        parent.routerView = true;

        while (parent && parent !== parent.$parent) {
            if (parent.routerView) {
                viewDepth++;
            }
            parent = parent.$parent;
        }
        return h(route.matched[viewDepth].components[name], data, children);
    }
}
export default selfRouterView;