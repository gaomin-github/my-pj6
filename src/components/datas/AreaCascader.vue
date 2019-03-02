<template>
    <section class="container">
            <auto-complete class="prov" :dataSource="provinceList" v-model="curProvinceName" allowEdit="false" @complete-input="surProvValue"></auto-complete>
            <auto-complete class="city" :dataSource="cityList" v-model="curCityName"></auto-complete>
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
    curProvinceName:string=''
    curProvinceIndex:number=-1
    curCityName:string=''
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
        console.log('修改省级地址')
        this.curCityIndex=-1
        this.curCityName=''
        console.log('this.curCityName')
        console.log(this.curCityName)
    }
    surCityValue(param:number){
        let obj=this
        obj.curCityIndex=param
    }
}
</script>
<style lang="scss" scoped>
    .container{
        /*border:1px black solid;*/
        width:300px;
        height:30px;
        display: flex;
    }
    .prov,.city{

        margin:0px 5px;
    }
</style>