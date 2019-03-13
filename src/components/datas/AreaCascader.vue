<template>
    <section class="container">
            <auto-complete class="prov" :dataSource="provinceList" :value="curProvinceName" @input="surProvValue" allowEdit="false" @complete-input="surProvValue"></auto-complete>
            <auto-complete class="city" :dataSource="cityList" :value="curCityName" @complete-input="surCityValue"></auto-complete>
    </section>
</template>
<script lang="ts">
//地区联动控制
import defaultAreaList from './jsons/city.json';
import {Vue,Component,Prop} from 'vue-property-decorator';
import AutoComplete from './AutoComplete'
interface areaInfo{
    name:string,
    index:number
}
@Component({
    components:{
        AutoComplete
    }
})
export default class AreaCascader extends Vue{
    @Prop({default:defaultAreaList}) areaData!:Array<any>
    @Prop({default:''}) value!:string
    curProvinceIndex:number=-1
    curCityIndex:number=-1
    get curProvinceName(){
        console.log()
        return this.value.match(/[\u4e00-\u9fa5]+(?=-)/g)
    }
    get curCityName(){
        return ''
    }
    get provinceList(){
        let p_list=this.areaData.map((o:any):string=>{
            return o.name
        })
        return p_list
    }
    get cityList(){
        if(this.curProvinceIndex<0){
            return []
        }
        return this.areaData[this.curProvinceIndex].city.map((o:any)=>{
            return o.name
        })
    }
    surProvValue(param:number){
        let obj=this
        obj.curProvinceIndex=param
        this.curCityIndex=-1

    }
    surCityValue(param:number){
        let obj=this
        obj.curCityIndex=param
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width:400px;
        height:30px;
        display: flex;
    }
    .prov,.city{
        margin:0px 5px;
    }
</style>