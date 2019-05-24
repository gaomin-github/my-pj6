// 模态窗口展示时 ，阻止背景滑动
export default{
    install:function(Vue,options){
        Vue.directive('vuePluginTip',{
            update:function(el,binding,vnode){
                // console.log(binding.expression);
                // 移动端和PC端通用方法
                console.log('binding.value：'+binding.value);
                if(binding.value){
                    el.pageScrollNum=document.documentElement?document.documentElement.scrollTop:document.body.scrollTop;
                    console.log('this.pageScrollNum:'+el.pageScrollNum);
                    document.documentElement.style=document.body.style=`position:fixed;top:${-el.pageScrollNum}px`;
                }else{
                    document.documentElement.style=`position:${''};`;
                    document.documentElement.scrollTop=document.body.scrollTop=el.pageScrollNum;
                }
            }
        })
    }
}
