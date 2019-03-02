<template>
    <section class="container">
            <auto-complete class="prov" :dataSource="provinceList" v-model="curProvinceName" allowEdit="false" @complete-input="surProvValue"></auto-complete>
            <auto-complete class="city" :dataSource="cityList" v-model="curCityName" @complete-input="surCityValue" @click="curCityName=''"></auto-complete>
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
    @Prop({default:''}) curProvinceName!:string
    @Prop({default:''}) curCityName!:string
    curProvinceIndex:number=-1
    curCityIndex:number=-1
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
        this.curCityName=''
    }
    surCityValue(param:number){
        let obj=this
        obj.curCityIndex=param
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width:300px;
        height:30px;
        display: flex;
    }
    .prov,.city{
        margin:0px 5px;
    }
</style>