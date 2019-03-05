####auto complete component
#####属性配置
dataSource:Array<string>    数据源，字符串数组类型
value:string                组件值，用v-model绑定（必需）
placeHolder:string          占位文字（非必需）
leftLabel:string            输入框左边标签内容（非必需）
rightLabel:string           输入框右边标签内容（非必需）
allowEdit:boolean           是否允许编辑（输入）,默认true可编辑（非必需）
#####暴露方法
focus               获得焦点
blur                失去焦点
complete-input      使用下拉框中数据源数据完成输入后
input               输入时