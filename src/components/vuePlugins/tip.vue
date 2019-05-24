<template>
    <section class="con" >
            <section class="tip-con" ref="tip">
                <p>{{msg}}</p>
            </section>
    </section>
</template>
<script>
    export default{
        name:'tip',
        data:function(){
            return{
                msg:'',
                duration:0,
                stopTime:0,
                tipCount:0,
            }
        },
        mounted:function(){
            this.$on('vuetip',(msg)=>{
                this.msg=msg;
                this.$refs['tip'].style.opacity=1;
                this.$refs['tip'].style.transition=`all ${this.duration}s ease-in-out`;
                this.tipCount++;
                setTimeout(()=>{
                    if(this.tipCount<=1){
                        this.$refs['tip'].style.opacity=0;
                        this.$refs['tip'].style.transition=`all ${this.duration}s ease-in-out`;
                    }
                    this.tipCount--;
                },this.stopTime||1500);
            })
        }
    }
</script>
<style lang="scss" scoped>
    .tip-con{
        position:fixed;
        top:50%;
        left:50%;
        transform:translateX(-50%);
        border:1px rgb(200,200,200) solid;
        z-index: 30;
        background:rgb(220,220,220);
        border-radius: 5px;
        padding:3px 8px;
        opacity:0;
    }
</style>