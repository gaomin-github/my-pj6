Vue.directive('directTip',{
    bind:function(el,binding,vnode){
        console.log('global directive tip,with value='+binding.value);
        console.log('global directive tip,with paramName='+binding.name+',paramValue='+binding.value);
        // console.log('binding');
        // console.log('binding.name:'+binding.name);
        // console.log('binding.value:'+binding.value);
        // console.log('binding.oldvalue:'+binding.oldvalue);
        // console.log('binding.expression:'+binding.expression);
        // console.log('binding.arg:'+binding.arg);
        // // console.log('binding.modifiers:'+binding.modifiers);
        // console.log('vnode');
        // console.log(vnode);
    }
})
