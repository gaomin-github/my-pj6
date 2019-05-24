####可滚动窗口重叠时出现的问题
1.pc端
    触发事件：scroll mousewheel 键盘上下（keydown) 拖拽滚动条（不会出现滚动穿透）
    scroll:ui事件，不能用preventDefault阻止执行
    解决方法
    1）弹出框展示时，下层模块设置overflow:hidden（移动端实体机无效)，需要保留底层初始滚动值（不保存好像也可以被缓存住）
    2）弹出层有滚动需求时，弹出层相关事件阻止冒泡（移动端无效，弹出层滚动到边界时，底层滚动不会停）。
2.移动端：滚动穿透
    触发事件：touchmove
    解决方法
    1）弹出层不需要滚动时，禁用滚动相关事件
    2）弹出层有滚动需求时，判断弹出层滚动是否到达边界，到达边界禁用 滚动相关事件（preventdefault)
    3）https://github.com/pod4g/tool/wiki/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%BB%9A%E5%8A%A8%E7%A9%BF%E9%80%8F%E9%97%AE%E9%A2%98

事件
1）stopPropagation：阻止冒泡（执行完本次事件）
2）stopImmediatePropagation：阻止冒泡（阻止执行之后的任何代码段）
3）preventDefault（取消默认事件）：使用场合？
代码参照：局部滚动插件iscroll：https://github.com/cubiq/iscroll/blob/master/src/core.js

键盘事件：
1）支持的元素：input document; div元素因为不能聚焦，不支持该事件
2）不支持的元素解决方案：添加tabindex属性，可以为任意值；或者添加contenteditable=true属性。让元素可以聚焦。缺陷：设置了tabindex属性的元素，有滚动范围的对下拉箭头触发滚动没有反应，但是可以吧tabindex添加到它内部的元素。
在document上监听键盘事件，而不是div块上；

scroll:
scrollTop:一个带滚动条的元素，内部滚动高度
scrollHeight：带滚动条元素内部真正高度