import { resolve } from "q";
import { createRoute } from './vue-router-route.js';

export function createMatcher(routes) {
    // let pathList=[], pathMap= {}, nameMap = {};
    let { pathList, pathMap, nameMap } = createMatcherMap(routes);

    function match(path) {
        // if (!!pathList[path]) {
        return createRoute(pathMap[path])
        // }
    }
    function createMatcherMap(routes) {
        // let pathList = oldPathList ? oldPathList : [];
        pathList = pathList ? pathList : [];
        pathMap = pathMap ? pathMap : {};
        // let pathMap = oldPathMap ? oldPathMap : {};
        routes.forEach(route => {
            addRecord(route);
        });
        return {
            pathList, pathMap
        }
    };
    function addRecords(routes) {
        createMatcherMap(routes);
    }

    function addRecord(route, parent) {
        // pathList = pathList ? pathList : [];
        // pathMap = pathMap ? pathMap : {};
        const normalizePath = _normalizePath(route, parent);
        const record = {
            path: route.path,
            parent,
            components: route.components ? route.components : { default: route.component },
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

