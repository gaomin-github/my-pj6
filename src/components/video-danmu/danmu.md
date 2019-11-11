初始化属性
index：key标识（乱序）
startTime ：展示时间
duration：展示时长（根据公用参数和displayTime做调整）  //公用参数
fontSize：字体大小
color:
text：文本内容
type:弹幕类型srcoll/top/bottom(默认scroll)


计算得到的属性
width：宽度度
height：高度
top:到播放容器顶部距离
left:到播放容器左端距离
channelId:轨道ids
channelNum:占用的轨道数量
poolId：弹幕池id
createTime:dom节点被创建时间（相对播放器时间轴）    //弹幕过滤通过时更新一次；作用：碰撞检测
lastDisplayTime:上次动画播放时间    //创建，继续播放时更新
moveTime:弹幕已运行时间     //弹幕创建，继续播放,调速时更新
moveDistance:弹幕已运行距离

常量:
ChannelHeight：轨道高度。pc端12，移动端10
HorizenMargin：弹幕水平边距（备用）
VerticalMargin：弹幕垂直边距（备用）
prop

data:

SW：屏幕宽度，播放器宽度，弹幕运行相关
SH：播放器高度。横屏下360，竖屏下200

playerWidth：弹幕容器宽度
duration：弹幕周期时间
ChannelNum：轨道数量
MinChannelNum：竖屏下轨道数量（备用）


1.横竖屏切换相关：
1）弹幕容器高度发生变化
2）轨道数量是否发生变化？
轨道数量动态变化：（弹幕轨道号不固定）
横屏切换竖屏，弹幕池现有数据有一部分会被隐藏。后续新添加弹幕有一部分会被隐藏，不定期时间后，不会被隐藏，文字覆盖率会变高
竖屏切换横屏，弹幕池现有数据完整显示，底部一部分轨道会空闲一段时间
轨道数量不变：（弹幕轨道号不固定）
横屏切换竖屏，弹幕池底部一部分会被隐藏。后续新添加弹幕有可能会隐藏。
竖屏切换横屏，弹幕池被隐藏数据会显示出来

腾讯处理方式：竖屏下不显示弹幕
人人视频：只能横屏播放
tip1:resize和orientationchange监听横竖屏切换区别
resize：只要窗口大小变化就会触发。立刻监听到变化后的屏幕宽高。
orientationchange：判断event.orientation|screen.orientation.angle判断横竖屏，有浏览器兼容问题。android下立即触发回调函数只能获得变换前的屏幕宽高。需要延迟一定的时间。ios下可以立即获取到最新宽高。
tip2:

3）现有弹幕池处理（按照轨道数量不变设计）
因为字体不一致，横屏下显示的文字切换到竖屏，出现文字显示不完整问题：
 // 显示时监控可用轨道号，过滤弹幕
2.统一修改字体大小
 1）transform弹幕容器大小。
 弹幕起始位置改编，移动距离改编（不好实现）
 2）遍历修改字号，修改顶部距离（占用轨道号也发生变化）
 3）修改轨道高度
3.弹幕速度调整
    1）修改队列的弹幕时间周期
    2）修改弹幕池弹幕周期，样式
4.顶部和底部弹幕（弹幕池独立）
顶部：自上而下，可控制是否重叠。弹幕占据整行，文字居中可换行
底部：自下而上，可控制是否重叠。弹幕占据整行，文字居中可换行
b站策略：
    文字过长，不可换行，溢出屏幕，但永远居中显示
5.弹幕重叠时，次序？按照弹幕池？按照弹幕创建时间？

###调用接口
init()：启动计时器，弹幕播放，弹幕回收
startPlayer():启动计时器
pausePlayer():暂停计时器，暂停弹幕播放，暂停弹幕回收
continuePlayer()

changePlayer(newTimeLine:Number)：修改进度条播放进度（毫秒级）
changeDanmuOpacity(newOpacity:Number)：修改所有弹幕透明度
changeArea(param:Number)：修改弹幕显示区域（垂直方向百分比）
controlDanmuShow(type：top||bottom||scroll,ifShow:Boolean)：控制弹幕是否可覆盖
addDanmu(danmuList:Array<Danmu>)：追加新弹幕列表
sendDanmu(danmu:Danmu)：展示一条实时弹幕
###配置
videoMills:进度条初始化（毫秒级，默认0）
duration：弹幕运行周期（毫秒级，默认6000）
overlap：弹幕是否可重叠（默认不重叠）