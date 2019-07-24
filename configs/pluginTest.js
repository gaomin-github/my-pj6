function pluginTest(options){

}

pluginTest.prototype.apply=function(){
    console.log('pluginTest apply execute')
}

module.exports= pluginTest;