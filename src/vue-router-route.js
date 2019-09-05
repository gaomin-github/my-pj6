export function createRoute(record) {
    const route = {
        path: record.path,
        matched: record ? formatMatch(record) : []
    }
    return route;
}

export function _createRoute() {
    createRoute({ path: '' })
}

function formatMatch(record) {
    let res = [];
    while (record) {
        res.unshift(record);
        record = record.parent;
    }
    return res;
}