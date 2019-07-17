<template>
    <section class="con">
        <ul class="list-left">
            <!--<vue-for-each v-for="(item,index) in rankInfo.rightInfo" :key="index" v-if="index<curNum" :itemParam="item.id+' left'"></vue-for-each>-->
            <vue-for-each v-for="(item,index) in rankInfo.rightInfo" :key="index" v-if="index<curNum" :itemParam="Object.assign({'index':index+'_2','dir':'left'},item)"></vue-for-each>
            <!--<li v-for="(item,index) in rankInfo.rightInfo">-->
                <!--left list {{item.id}}-->
            <!--</li>-->
        </ul>
        <ul class="list-right">
            <vue-for-each v-for="(item,index) in rankInfo.rightInfo" :key="index" v-if="index<curNum" :itemParam="Object.assign({'index':index+'_2','dir':'right'},item)"></vue-for-each>
            <!--<vue-for-each v-for="(item,index) in rankInfo.rightInfo" :key="index" v-if="index<curNum" :itemParam="item.id+' right'"></vue-for-each>-->

            <!--<li v-for="(item,index) in rankInfo.rightInfo">-->
                <!--right list {{item.id}}-->
            <!--</li>-->
        </ul>

        <div class="loadmore-btn" @click="loadMore">
            加载更多
        </div>
    </section>
</template>
<script>
    import {rankInfo} from './vueForTestData.js';
    import QS from 'qs';
    export default{
        name:'vueFor',
        data:function(){
          return{
              curNum:3,
              rankInfo:rankInfo
          }
        },
        mounted(){
          console.log(QS.parse(`a=A&b=B&c=C`));
          console.log(QS.stringify({a:'A',b:'B',c:'C'}))
          let url='https://www.lodashjs.com/docs/latest#_assigninobject-sources';
            let result = Object.create(null)
            let a = document.createElement('a')
            a.href = url
            result.protocol = a.protocol
            result.hostname = a.hostname
            result.port = a.port
            result.pathname = a.pathname
            result.search = a.search.slice(1)
            result.hash = a.hash.slice(1)
            result.host = a.host
            result.query = Object.create(null)
            console.log('result');
            console.log(result);
        },
        methods:{
            loadMore(){
              this.curNum++;
            },
            enterItem(param){
                // console.log(param);
            }
        },
        components:{
            'vue-for-each':()=>import ('./vueFor-each.vue'),
        }
    }
</script>
<style lang="scss" scoped>
    .con{
        width:100%;
        display: flex;
        position:relative;
        pading-bottom:30px;
    }
    .list-left,.list-right{
        display: block;
        width:100%;
        li{
            height:30px;
            cursor: pointer;
        }
    }
    .list-left{
        border:1px black solid;
    }
    .list-right{
        border:1px red solid;
    }
    .loadmore-btn{
        position:absolute;
        bottom:-30px;
        width:100%;
        text-align: center;
    }
</style>