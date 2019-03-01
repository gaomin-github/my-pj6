<template>
    <section class="container">
        <!--<section class="prov">-->
            <auto-complete class="prov" :dataSource="provinceList" v-model="curProvince" allowEdit="false" @complete-input="surProvValue"></auto-complete>
        <!--</section>-->
        <!--<section class="city">-->
            <auto-complete class="city" :dataSource="cityList" v-model="curCity"></auto-complete>
        <!--</section>-->
    </section>
</template>
<script lang="ts">
//地区联动控制
import defaultProvinceList from './jsons/province.json';
import defaultCityList from './jsons/city.json';
import {Vue,Component,Prop} from 'vue-property-decorator';
import AutoComplete from './AutoComplete'

@Component({
    components:{
        AutoComplete
    }
})
export default class AreaCascader extends Vue{
    @Prop({default:defaultProvinceList}) provinceData!:Array<any>
    @Prop({default:defaultCityList}) cityData!:Array<any>
    curProvince:string=''
    curCity:string=''
    mounted(){
        console.log('this.defaultProvinceData')
//        console.log(defaultProvinceData)
    }
    get provinceList(){
        let p_list=this.provinceData.map((o:any):string=>{
            return o.name
        })
        return p_list
    }
    get cityList(){
        let obj=this
        let c_data:any=this.cityData.filter((o:any):boolean=>{
            return o.name==obj.curProvince
        })

        console.log('c_data')
        console.log(c_data)
        if(c_data) return []
//        console.log('p1')
        let c_list:Array<any>=c_data.map((o:any):string=>{
            return o.name
        })
//        console.log('p2')
//        console.log(p2)
//        let c_list:Array<string>=p2.map((o:any):string=>{
//            return o.name
//        })
        return c_list
    };
    surProvValue(){
        console.log('cityData')
        let city_data=this.cityData.filter((o:any)=>{

        })
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