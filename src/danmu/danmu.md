初始化属性
index：key标识（乱序）
startTime ：展示时间
duration：展示时长（根据公用参数和displayTime做调整）  //公用参数
fontSize：字体大小
color:
text：文本内容

计算得到的属性
width：宽度度
height：高度
remainTime:剩余时间
top:到播放容器顶部距离
left:到播放容器左端距离
channelId:轨道ids
poolId：弹幕池id
displayTime:上次动画播放时间    //创建，继续播放时更新
createTime:dom节点被创建时间（相对播放器时间轴）    //弹幕过滤通过时更新一次
moveTime:弹幕已运行时间     //弹幕创建，继续播放时更新



