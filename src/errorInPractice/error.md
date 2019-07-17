###项目错误集合
1.v-if和v-show
    v-if组件不会挂载到dom节点中，v-if为false时子组件created,mounted不执行
    v-show组件会挂载到dom节点中，v-show为false时子组件mounted执行
2.qs库使用
    QS.parse(`a=A&b=B&c=C`)                     //{a: "A", b: "B", c: "C"}
    QS.stringify({a:'A',b:'B',c:'C'})           //a=A&b=B&c=C
3.url/超链接a元素分析
    let url='https://www.lodashjs.com/docs/latest#_assigninobject-sources';
    let result = Object.create(null)
    let a = document.createElement('a')
    a.href = url
    result.protocol = a.protocol            //https:
    result.hostname = a.hostname            //www.lodashjs.com
    result.port = a.port                    //
    result.pathname = a.pathname            // /docs/latest
    result.search = a.search.slice(1)       //
    result.hash = a.hash.slice(1)           //_assigninobject-sources
    result.host = a.host                    //www.lodashjs.com
    result.query = Object.create(null)            //https:
4.h5页面移动端调试面板 eruda
    https://github.com/liriliri/eruda/blob/master/doc/README_CN.md
5.