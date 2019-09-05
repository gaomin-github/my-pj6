import { resolve } from "q";

export function createMatcher(routes) {
    const { pathList, pathMap, nameMap } = createMatcherMap(routes);

    function match(path) {

        if (pathList[path]) {
            return createRoute(pathMap[path])
        }
    }
    function createMatcherMap(routes) {
        routes.forEach(route => {
            addRecord(route);
        });
    }
    function addRecords(routes) {
        createMatcherMap(routes);
    }

    function addRecord(route, parent) {
        const normalizePath = _normalizePath(route, parent);
        const record = {
            path: route.path,
            parent,
            components: route.components,
            children: route.children,
        }
        if (!pathList[normalizePath]) {
            pathList.push(record.path);
        }
        pathMap[record.path] = record;
        record.children && record.children.forEach(child => {
            addRecord(child, record);
        })
    }

    function _normalizePath(route, parent) {
        return parent ? parent.path + '/' + route.path : route.path;
    }
    return {
        match
    }
}

