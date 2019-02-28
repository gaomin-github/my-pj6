<template>
    <section class="container">
        <section class="in_container" @click="focusInput" @focus="showDataSource">
            <input type="text" class="auto" ref="input" v-model="inValue" @keydown="selectReferItem" @keypress="clearSelectItem"/>
            <section class="clear" @click="clearInValue">清除</section>
        </section>
        <transition name="drop_animate">
            <ul class="refer_contaienr" v-if="showDataSource&&showDataSource.length>0">
                <li v-for="(item,key) in showDataSource" @click="completeInput(key)" :class="selectItemIndex==key?'refer_item-active':''">
                    {{item}}
                </li>
            </ul>
        </transition>
    </section>

</template>
<script lang="ts">
//根据设置的数据源自动录入
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class AutoComplete extends Vue{
        inValue:string=''       //文本框输入值
        selectItemIndex:number=-1    //在参照列表选中的条目索引
        @Prop({default:[]}) dataSource!:Array<string>
//        展示数据源列表
        get showDataSource(){
            console.log('dataSource')
            console.log(this.dataSource)
            if(this.inValue==null||this.inValue.length<=0) return []
            let result=this.dataSource.filter(o=>{
                let reg=new RegExp("\^"+this.inValue+".+",'i')
                return reg.test(o)
            })
            return result
        }
//        输入框聚焦
        focusInput(){
            let inputEle:any=this.$refs['input']
            inputEle.focus()
        }
//        选择要用于补充的参照条目
        selectReferItem(event:any){
            if(this.showDataSource==null||this.showDataSource.length<=0) return
            if(event.keyCode==38&&this.selectItemIndex>=0) this.selectItemIndex--
            else if(event.keyCode==40&&this.selectItemIndex<this.showDataSource.length) this.selectItemIndex++
//            38向上 40向下
        }
//        清空记录的选中的参照条目
        clearSelectItem(event:any){
            if(event.keyCode==13&&this.selectItemIndex>=0){
                this.completeInput(this.selectItemIndex)
                return
            }
            this.selectItemIndex=-1
        }
//        补全剩余内容
        completeInput(key:number){
            this.inValue=this.showDataSource[key]
        }
        clearInValue(){
            this.inValue=''
        }
    }
</script>
<style lang="scss" scoped>
.container{
    width:260px;
    height:30px;
    position:relative;
    border:1px rgb(180,180,180) solid;
}
.container:active,.container:hover{
     border:1px rgb(40,180,220) solid;
 }
.in_container{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 5px;
    padding-right:5px;
    width:100%;
    height:100%;
}
.auto{
    flex:1;
    height:90%;
    border:none;
    display: block;
}
.auto:active,.auto:focus{
    outline:none;
    border:none;
}
.clear{
    display: block;
    cursor: pointer;
    height:90%;
    margin-left: 5px;
    border-left:1px rgb(180,180,180) solid;
    display: flex;
    align-items: center;
    justify-content: center;
}
.refer_contaienr{
    border:1px rgb(180,180,180) solid;
    position: absolute;
    display: block;
    width:100%;
    margin-top:5px;
    overflow-y: hidden;
    background-color: rgb(255,255,255);
    li{
        padding:0px 5px;
        line-height: 24px;
        margin:3px 0px;
    }
    .refer_item-active{
        background-color: rgb(230,230,230);
    }
}
.drop_animate-enter,.drop_animate-leave-to{
    max-height: 0px;
}
.drop_animate-enter-to,.drop_animate-leave{
    max-height: 1000px;
}
.drop_animate-enter-active,.drop_animate-leave-active{
    transition:all .5s;
}
</style>