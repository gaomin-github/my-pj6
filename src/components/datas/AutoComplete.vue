<template>
    <section class="container" @click="focusInput" @blur="blurInput">
        <section class="left_container">{{leftLabel}}</section>
        <section class="in_container">
            <section class="auto">
                <input type="text" ref="input" :value="value" @keydown="selectReferItem" @keypress="clearSelectItem" :placeholder="placeHolder" @input="updateValue" @focus="showRefer=true" @blur="selectItemIndex=-1;showRefer=false"/>
                <!--<input type="text" v-else ref="input" v-model="inValue" @keydown="selectReferItem" @keypress="clearSelectItem" :placeholder="placeHolder" @input="updateValue" @focus="showRefer=true" @blur="selectItemIndex=-1;showRefer=false" disabled/>-->
            </section>
            <section class="clear" @click="clearValue">清除</section>
            <transition name="drop_animate">
                <ul class="refer_contaienr" v-if="referDataSource&&referDataSource.length>0&&showRefer">
                    <li v-for="(item,key) in referDataSource" @click="completeInput(key)" :class="selectItemIndex==key?'refer_item-active':''">
                        {{item}}
                    </li>
                </ul>
            </transition>
        </section>
        <section class="right_container">
            {{rightLabel}}
        </section>

    </section>

</template>
<script lang="ts">
//根据设置的数据源自动录入
    import {Vue,Component,Prop} from 'vue-property-decorator';
    @Component
    export default class AutoComplete extends Vue{
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

//        过滤数据源
        get referDataSource(){
            let result=this.dataSource.filter(o=>{
                let reg=new RegExp("\^"+this.value+".+",'i')
                return reg.test(o)
            })
            return result
        }
//        组件聚焦,
        focusInput(){
            let inputEle:any=this.$refs['input']
            inputEle.focus()
            this.$emit('focus')
        }
        blurInput(){
            let inputEle:any=this.$refs['input']
            inputEle.blur()
            this.$emit('blur')
        }
//        选择要参照条目
        selectReferItem(event:any){
            if(this.referDataSource==null||this.referDataSource.length<=0) return
            if(event.keyCode==38&&this.selectItemIndex>=0) this.selectItemIndex--
            else if(event.keyCode==40&&this.selectItemIndex<this.referDataSource.length) this.selectItemIndex++
        }
//        清空记录的选中参照条目索引值
        clearSelectItem(event:any){
            if(event.keyCode==13&&this.selectItemIndex>=0){
                this.completeInput(this.selectItemIndex)
                return
            }
            this.selectItemIndex=-1
        }
//        通过参照补全剩余内容
        completeInput(key:number){
            this.$emit('input',this.referDataSource[key])
            this.$emit('complete-input',key)
        }
//        清空输入内容
        clearValue(){
            this.$emit('input','')
        }
//        更新组件值
        updateValue(e:any){
            this.$emit('input',e.target.value)
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
    /*position:relative;*/
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
    max-height: 200px;
    top:100%;
    left: 0px;
    margin-top:5px;
    overflow: scroll;
    z-index:9;
    li{
        padding:0px 5px;
        line-height: 24px;
        margin:3px 0px;
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
    max-height: 200px;
}
.drop_animate-enter-active,.drop_animate-leave-active{
    transition:all .5s;
}
</style>