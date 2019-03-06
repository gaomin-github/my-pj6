<template>
    <section>
        <h3>{{test}}</h3>
        <basic-input :showPop="true">
            <section slot="down" class="down">
                <section class="header">
                    <section class="y_prev">&laquo;</section>
                    <section class="m_prev" @click="curMonth--">&langle;</section>
                    <section class="header_label">{{curYear}}-{{curMonth}}-{{curDay}},{{MonthIndexs[curMonth]}},{{monthWeek}}</section>
                    <section class="m_next">&rangle;</section>
                    <section class="y_next">&raquo;</section>
                </section>
                <ul class="header_week">
                    <li v-for="weekItem in WeekStrs">
                        {{weekItem}}
                    </li>
                </ul>
                <ul class="con_day">
                    <li v-for="dayItem in dayList" :class="[dayItem.month==curMonth?'':'not_cur_month',dayItem.day==curDay&&dayItem.month==curMonth?'day_item-active':'']">
                        <!--:class="dayItem.month==curMonth?'not_cur_month':'',dayItem.day==curDay?'day_item-active':''"-->
                        <!--<section</section>-->
                        <!--{{dayItem.month}},-->
                        <!--{{curMonth}},-->
                        {{dayItem.day}}
                    </li>
                </ul>
            </section>
        </basic-input>
    </section>
</template>
<script lang="ts">
    //电话号码格式校验
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import BasicInput from './BasicInput';
//    const WeekStrs=['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
    enum Week{
        Sun=0,
        Mon,
        Tues,
        Wed,
        Thur,
        Fri,
        Sat
    }
    @Component({
        components:{
            BasicInput
        }
    })
    export default class DatePicker extends Vue{
        WeekStrs:Array<string>=['Mon','Tues','Wed','Thur','Fri','Sat','Sun']
        MonthIndexs:Array<number>=[31,28,31,30,31,30,31,31,30,31,30,31]
        curYear:number=(new Date()).getFullYear()
        curMonth:number=(new Date()).getMonth()
        curDay:number=(new Date()).getDate()
        initWeek:number=(new Date()).getDay()
//        获取当前月天数
        get monthDay(){
            if(this.curMonth==2) return 28
            else if(this.curMonth!=12&&this.curMonth!=10&&this.curMonth%2==0) return 30
            else return 31
        }
//        本月第一天星期数
        get monthWeek(){
            let newDate=new Date(this.curYear,this.curMonth,1)
            console.log('newDate:'+newDate.getDay())
            return newDate.getDay();

        }
        get dayList(){
            let result=new Array()
            //获取上月总计天数
            let preMonthDay=this.curMonth==0?31:this.MonthIndexs[this.curMonth-1]
            console.log('monthWeek:'+this.monthWeek)
            for(let i=0;i<this.monthWeek-1;i++){
                result.push({
                    day:preMonthDay-i,
                    month:this.curMonth==0?11:this.curMonth-1,
                    year:this.curMonth==0?this.curYear-1:this.curYear
                })
            }
            result=result.sort((a,b)=>{
                return a.day-b.day
            })
            for(let i=1;i<=this.MonthIndexs[this.curMonth];i++){
                result.push({
                    day:i,
                    month:this.curMonth,
                    year:this.curYear
                })
            }
//            本月月末周数
            let monthLastWeek=(new Date(this.curYear,this.curMonth,this.MonthIndexs[this.curMonth])).getDay()
            for(let i=1;i<=7-monthLastWeek;i++){
                result.push({
                    day:i,
                    month:(this.curMonth+1)%12,
                    year:this.curMonth==11?this.curYear+1:this.curYear
                })
            }
            return result
        }

        mounted(){
            console.log('curYear:'+this.curYear)
            console.log('curMonth:'+this.curMonth)
            console.log('curDay:'+this.curDay)
            console.log('initWeek:'+this.initWeek)
        }
    }
</script>
<style lang="scss" scoped>
.down{
    height:200px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.header{
    display:flex;
    border: 1px rgb(180,180,180) solid;
    height:30px;
    .y_prev,.y_next,.m_prev,.m_next{
        width:20px;
        height:20px;
        line-height: 20px;
        border:1px black solid;
    }
    .header_label{
        flex: 1;
        text-align: center;
        font-size: 12px;
        line-height: 30px;
    }
}
.header_week{
    display: grid;
    height:26px;
    grid-template-columns:14% 14% 14% 14% 14% 14% 14%;
    border:1px rgb(180,180,180) solid;
    font-size: 12px;
    /*justify-content: space-between;*/
    align-items: center;
    li{
        text-align: center;
    }
}
.con_day{
    flex:1;
    display: grid;
    border:1px rgb(180,180,180) solid;
    grid-template-rows:auto;
    align-items: center;
    justify-content: center;
    grid-template-columns:14% 14% 14% 14% 14% 14% 14%;
    li{
        display: block;
        /*border:1px black solid;*/
        text-align: center;
        font-size: 12px;
    }
    .not_cur_month{
        color:rgb(150,150,150);
    }
    .day_item-active{
        background-color: rgb(24,150,220);
    }
}
</style>