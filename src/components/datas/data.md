###自动完成组件
1.css相关
    1.1）input和flex搭配使用，会影响自适应布局,这是因为input有默认宽度，需要为min-width或者width设置值化解。自适应布局中用到input，有两种处理方式：
    第一种：为input在外面加一层section包裹，section样式设置：
    {   flex:1;
        input{
            width:100%;
        }
    }
    第二种：为input设置{min-width:0px;}
2.js相关
    2.1）keypress只能响应数字+英文+enter+符号键,keydown可以响应所有键盘按钮活动<br/>
    2.2）键盘识别借助event.keyCode 上箭头38,下箭头40,enter13<br/>
3.vue相关
    3.1）v-model是<section :value="modelValue" :input="(newValue)=>{modelValue=event.targetElement.value}">的语法糖，因此在组件中通过this.$emit('input',newValue)就可以修改组件modelValue值<br/>
4.typescript相关
    4.1）在.ts文件中使用import导入json文件，会提示找不到文件或无法解析json模块。需要在typescript配置文件tsconfig.json中添加：
    "compilerOptions": {"resolveJsonModule":true}
