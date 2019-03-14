<template>
    <section class="container">
            <auto-complete class="prov" :dataSource="provinceList" :value="curProvinceName" @input="handleProvInput" @complete-input="handleProvCompleteInput" :allowEdit="false"></auto-complete>
            <auto-complete class="city" :dataSource="cityList" :value="curCityName" @input="handleCityInput" @complete-input="handleCityCompleteInput"></auto-complete>
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
    mounted(){
        let obj:any=this
        this.curProvinceIndex=this.provinceList.findIndex((o:string):boolean=>{
            return o=obj.curProvinceName
        })
        this.curProvinceIndex=this.curProvinceIndex>=0?this.curProvinceIndex:-1
        this.curCityIndex=this.cityList.findIndex((o:string):boolean=>{
            return o=obj.curCityName
        })
        this.curCityIndex=this.curCityIndex>=0?this.curCityIndex:-1
    }
    get curProvinceName(){
        return this.value.match(/[\u4e00-\u9fa5]+(?=-)/g)
    }
    get curCityName(){
        return this.value.match(/[\u4e00-\u9fa5]+$/g)
    }
    get provinceList(){
        let p_list=this.areaData.map((o:any):string=>{
            return o.name
        })
        return p_list
    }
    get cityList(){
        console.log('init city list')
        if(this.curProvinceIndex<0){
            return []
        }
        console.log('this.curProvinceIndex:'+this.curProvinceIndex)
        return this.areaData[this.curProvinceIndex].city.map((o:any)=>{
            return o.name
        })
    }
    handleProvCompleteInput(provIndex:number){
        this.curProvinceIndex=provIndex
        this.$emit('complete-input',this.curProvinceIndex)
    }
    handleProvInput(provValue:string){
        this.$emit('input',provValue+'-')
    }
    handleCityCompleteInput(cityIndex:number){
        this.curCityIndex=cityIndex
        this.$emit('complete-input')
    }
    handleCityInput(cityValue:string){
        this.$emit('input',this.curProvinceName+'-'+cityValue)
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