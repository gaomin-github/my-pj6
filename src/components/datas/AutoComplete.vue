<template>
    <section class="container">
        <section class="left_container" v-if="leftLabel!==null&&leftLabel.length>0">{{leftLabel}}</section>
        <section class="in_container">
            <section class="auto">
                <input type="text" v-if="allowEdit" ref="input" :value="currentValue" @click="handleFocus" @blur="handleBlur" @input="updateValue" @keydown="selectReferItem" @keypress="clearSelectItem" :placeholder="placeHolder"/>
                <input type="text" v-else ref="input" :value="value" @click="handleFocus" @blur="handleBlur" @keydown="selectReferItem" @keypress="clearSelectItem" :placeholder="placeHolder" readonly/>
            </section>
            <section class="clear" @click="clearValue">清除</section>
            <transition name="drop_animate">
                <ul class="refer_contaienr" v-if="dataSource&&dataSource.length>0&&showRefer" ref="ref_con" @click="completeInput">
                    <li v-for="(item,key) in dataSource"  :ref="'refer_item_'+key" :key="key"  :class="selectItemIndex==key?'refer_item-active':''" :index="key">
                        {{item}}
                    </li>
                </ul>
            </transition>
        </section>
        <section class="right_container" v-if="rightLabel!==null&&rightLabel.length>0">
            {{rightLabel}}
        </section>
    </section>
</template>
<script lang="ts">
//根据设置的数据源自动录入
    import {Vue,Component,Prop} from 'vue-property-decorator';
//    防抖
    const Debounce=(function(){
        let lastTime:number=(new Date()).getTime()
        return function(fn:any,interval:number){
            let curTime:number=(new Date()).getTime();
            if(curTime-lastTime>=interval){
                lastTime=(new Date()).getTime();
                fn.apply(arguments)
            }else{
                lastTime=curTime
            }
        }
    })()
    @Component
    export default class AutoComplete extends Vue{
//        初始化值
        @Prop({default:''}) value!:string
//        数据源
        @Prop({default:[]}) dataSource!:Array<string>
//        占位文字
        @Prop({default:''}) placeHolder!:string
        @Prop({default:''}) leftLabel!:string
        @Prop({default:''}) rightLabel!:string
        @Prop({default:true}) allowEdit!:boolean
        selectItemIndex:number=-1    //在参照列表选中的条目索引
        showRefer:boolean=false      //控制是否显示参照列表
        get currentValue(){
            return this.value
        }
        mounted(){
            if(this.currentValue!=''&&this.currentValue.length<=0){
                this.selectItemIndex=-1
                return
            }
            this.selectItemIndex=this.dataSource.findIndex((value:string):boolean=>{
                let regStr=new RegExp('^'+this.currentValue+'+','g')
                return regStr.test(value)
            })
            this.$emit('init',this.selectItemIndex)
        }
//        组件聚焦,
        handleFocus(){
            let inputEle:any=this.$refs['input']
            inputEle.focus()
            this.showRefer=!this.showRefer
            this.$emit('focus')
        }
        handleBlur(){
            let inputEle:any=this.$refs['input']
            inputEle.blur()
            this.showRefer=false
            this.selectItemIndex=-1
            this.$emit('blur')
        }
//        选择要参照条目
        selectReferItem(event:any){
            if(this.dataSource==null||this.dataSource.length<=0) return
            if(event.keyCode==38&&this.selectItemIndex>0) this.selectItemIndex--
            else if(event.keyCode==40&&this.selectItemIndex<this.dataSource.length-1) this.selectItemIndex++
//            下拉滚动条滚动到选中位置
            let refContainer:any=this.$refs['ref_con']
            let selectItem:any=this.$refs['refer_item_'+this.selectItemIndex]
            if(selectItem[0].offsetTop-refContainer.offsetHeight>=0){
                refContainer.scrollTop=selectItem[0].offsetTop-refContainer.offsetHeight+selectItem[0].offsetHeight+10
            }else{
                refContainer.scrollTop=0
            }
            this.$emit('select')
        }
//        在参照下拉使用enter
        clearSelectItem(event:any){
            if(event.keyCode==13&&this.selectItemIndex>=0){
                this.completeInput(null)
            }
        }
//        点击参照条目补全剩余内容
        completeInput(e:any){
            if(e!=null){
                this.selectItemIndex=e.target.getAttribute('index')
            }
            this.showRefer=false
            this.$emit('input',this.dataSource[this.selectItemIndex])
            this.$emit('complete-input',this.selectItemIndex)
        }
//        清空输入内容
        clearValue(){
            this.selectItemIndex=-1
            this.$emit('input','')
            this.$emit('clear')
            this.$emit('complete-input',this.selectItemIndex)
        }
//        更新组件值
        updateValue(e:any){
            let obj:any=this
            Debounce(()=>{
                if(e.target.value==null||e.target.value.length<=0){
                    this.selectItemIndex=-1
                }else{
                    let regMatch=new RegExp('^'+e.target.value+'+','g');
                    let index=this.dataSource.findIndex((value:string,index:number):boolean=>{
                        return regMatch.test(value)
                    })
                    this.selectItemIndex=index
                }
                this.$emit('input',e.target.value)
                this.$emit('complete-input',this.selectItemIndex)
            },300)
        }
    }
</script>
<style lang="scss" scoped>
    input{
        min-width: 0px;
    }
.container{
    width:260px;
    height:30px;
    display: flex;
    align-items: center;
}
/*左边标签模块*/
.left_container{
    margin-right: 5px;
}
.right_container{
    margin-left:5px;
}
.in_container{
    flex:1;
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right:5px;
    height:100%;
    border:1px rgb(180,180,180) solid;
    position: relative;
}
.in_container:active,.in_container:hover{
    border:1px rgb(40,180,220) solid;
}
.auto{
    flex:1;
    height:90%;
    input{
        width:100%;
        height:100%;
        border:none;
        outline:none;
        background: none;
    }
    input:active,input:focus{
        outline:none;
        border:none;
    }
}
.clear{
    display: flex;
    cursor: pointer;
    height:90%;
    margin-left: 5px;
    border-left:1px rgb(180,180,180) solid;
    align-items: center;
}
.refer_contaienr{
    border:1px rgb(180,180,180) solid;
    background-color: rgb(255,255,255);
    position: absolute;
    display: block;
    width:100%;
    height: 200px;
    top:100%;
    left: 0px;
    margin-top:5px;
    overflow: scroll;
    z-index:9;
    li{
        padding:0px 5px;
        line-height: 24px;
        margin:3px 0px;
        cursor: pointer;
    }
    li:hover{
        background-color: rgb(230,230,230);
    }
    .refer_item-active{
        background-color: rgb(230,230,230);
    }
}
    .refer_contaienr::-webkit-scrollbar{
        width:4px;
        height:4px;
    }
    .refer_contaienr::-webkit-scrollbar-track{
        background: rgb(235,235,235);
    }
    .refer_contaienr::-webkit-scrollbar-thumb{
        background:rgb(150,150,150);
    }
.drop_animate-enter,.drop_animate-leave-to{
    max-height: 0px;
}
.drop_animate-enter-to,.drop_animate-leave{
    max-height: 300px;
}
.drop_animate-enter-active,.drop_animate-leave-active{
    transition:all .5s;
}
</style>