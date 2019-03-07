<template>
    <section class="date_container" @input="handlerInput">
        <h3>{{test}}</h3>
        <basic-input :showPop="true" v-model="initDate" @click="handlerClick"></basic-input>
        <transition name="date">
            <section class="down" v-if="showPop">
                <section class="header">
                    <section class="y_prev" @click="preYear--">&laquo;</section>
                    <section class="m_prev" @click="prevMonth">&langle;</section>
                    <section class="header_label">{{curYear}}-{{curMonth+1}}-{{curDay}}</section>
                    <section class="m_next" @click="nextMonth">&rangle;</section>
                    <section class="y_next" @click="preYear++">&raquo;</section>
                </section>
                <ul class="header_week">
                    <li v-for="weekItem in WeekStrs">
                        {{weekItem}}
                    </li>
                </ul>
                <ul class="con_day">
                    <li v-for="dayItem in dayList" :class="[dayItem.month==curMonth?dayItem.year==curYear&&dayItem.day==curDay?'cur_day':'':'not_cur_month',dayItem.year+'-'+(dayItem.month+1)+'-'+dayItem.day==nowDate?'init_day':'']" @click="handlerChoose(dayItem)">
                        {{dayItem.day}}
                    </li>
                </ul>
            </section>
        </transition>

    </section>
</template>
<script lang="ts">
    //电话号码格式校验
    import {Vue,Component,Prop} from 'vue-property-decorator';
    import BasicInput from './BasicInput';
    @Component({
        components:{
            BasicInput
        }
    })
    export default class DatePicker extends Vue{
        @Prop({default:(new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate()}) value!:string        //传入组件值
        nowDate:string=(new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate()        //当前系统时间
        WeekStrs:Array<string>=['Mon','Tues','Wed','Thur','Fri','Sat','Sun']
        MonthIndexs:Array<number>=[31,28,31,30,31,30,31,31,30,31,30,31]
        initDate:string=this.value                  //组件选中值
        curYear:number=parseInt((this.value.split('-'))[0])     //选中年份
        curMonth:number=parseInt((this.value.split('-'))[1])-1    //选中月份
        curDay:number=parseInt((this.value.split('-'))[2])      //选中日期值
        showPop:boolean=false
        get curWeek(){
            return (new Date(this.curYear,this.curMonth,this.curDay)).getDay()
        }
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
        prevMonth(){
            this.curYear=this.curMonth>0?this.curYear:this.curYear-1
            this.curMonth=this.curMonth>0?this.curMonth-1:11
        }
        nextMonth(){
            this.curMonth++
            this.curYear=this.curMonth%12==0?this.curYear+1:this.curYear
            this.curMonth=this.curMonth%12
        }
//        点击输入框
        handlerClick(){
            console.log('handler click')
            this.showPop=!this.showPop
            this.$emit('click')
        }
        handlerChoose(dayItem:any){
            this.curYear=dayItem.year
            this.curMonth=dayItem.month
            this.curDay=dayItem.day
            this.initDate=this.curYear+'-'+(this.curMonth+1)+'-'+this.curDay
            this.showPop=false
            this.$emit('select')
        }
        handlerInput(){
            this.curYear=parseInt((this.initDate.split('-'))[0])
            this.curMonth=parseInt((this.initDate.split('-'))[1])-1
            this.curDay=parseInt((this.initDate.split('-'))[2])
            this.$emit('input',this.initDate)
        }
    }
</script>
<style lang="scss" scoped>
.date_container{
    position: relative;
}
.down{
    position: absolute;
    left:0px;
    margin-top: 5px;
    width:240px;
    height:120px;
    flex-direction: column;
    cursor: pointer;
}
.header{
    height:30px;
    display:flex;
    border: 1px rgb(180,180,180) solid;
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
    height:26px;
    display: grid;
    grid-template-columns:14% 14% 14% 14% 14% 14% 14%;
    border:1px red solid;
    font-size: 12px;
    /*justify-content: space-between;*/
    align-items: center;
    li{
        text-align: center;
    }
}
.con_day{
    display: grid;
    height:160px;
    border:1px rgb(180,180,180) solid;
    grid-template-rows:auto;
    align-items: center;
    justify-content: center;
    grid-template-columns:14% 14% 14% 14% 14% 14% 14%;
    li{
        font-size: 12px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin:0px 2px;
    }
    li:hover{
        background-color: rgba(154,200,240,0.5);
    }
    .not_cur_month{
        color:rgb(150,150,150);
    }
    .cur_day,.cur_day:hover{
        background-color: rgb(50,150,200);
        font-weight: 600;
        color:rgb(255,255,255);
    }
    .init_day{
        border:1px rgb(50,150,200) solid;
        border-radius: 2px;
    }
}
    .date-enter,.date-leave-to{
        max-height: 0px;
        overflow-y: hidden;
    }
    .date-enter-to,.date-leave{
        max-height:300px;
        overflow-y: hidden;
    }
    .date-enter-active,.date-leave-active{
        transition:all 6s;
        overflow-y: hidden;
    }

</style>