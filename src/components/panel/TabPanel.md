### 选项卡面板涉及到的知识点<br/>
1)typescript组件vue-class-component,vue-property-decorator;decorator的内容取自component<br/>
2)vue的provide/inject功能，不能实现动态响应<br/>
3)父子组件间的数据共享+动态响应实现方法：<br/>
    3.1)vuex<br/>
    3.2)利用eventbus原理，新创建vue实例，在新实例上监听响应事件；组件中共同引入新实例，在组件方法里触发新实例的事件<br/>
    3.3)利用vue this.$parent，在dom渲染有上下级关系的的组件中使用，也可以利用当前vue实例传递事件(类似3.2)<br/>
4)滚动条相关<br/>
    4.1)与滚动条有关的属性值 scrollLeft,scrollWidth,clientWidth,根据这三个值可以获取当前元素滚动位置，也可以控制元素移动<br/>
    4.2)css中通过-webkit-scrollbar选择器可以控制滚动条样式<br/>
5)未解决问题<br/>
    5.1)使用v-for渲染列表，根据computed获取元素，发现computed获取到的元素节点为undefined（未解决）<br/>
    5.2)使用typescript语法 Vue.extend()声明组件内容时，provide/inject的参数用this获取不到；使用了typescript装饰器之后可以获取到(vue-property-decorator),原因未知<br/>
    5.3)官网有说明，provide/inject声明的参数不能动态响应，除非传递的是动态响应值（具体如何实现?)<br/>
    5.4)直接使用this.$parent.attributeName，报错提示属性名不存在于当前Vue；修改为<br/>
    '''
    let obj:any=this.$parent
    console.log(obj.activeKey)
    '''
之后不报错。应该是和元素类型有关，但未解决<br/>

