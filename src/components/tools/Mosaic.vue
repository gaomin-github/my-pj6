<template>
    <section>
        <section class="css_mosaic">
            <h4>马赛克组件</h4>
        </section>
        <section class="canvas_mosaic">
            <!--<img src=""/>-->

            <button @click="addMosiac">增加马赛克</button>
            <button @click="clearMosiac">清除马赛克</button>
            <br/>
            <canvas id="cvs1" width="500" height="300">

            </canvas>
        </section>

    </section>
</template>
<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator';
    @Component({
        components:{
        }
    })
    export default class Mosaic extends Vue{
        myCtx:CanvasRenderingContext2D; //canvas可渲染区域
        vagueWidth:number=10;
        mounted(){

            let cvs1:HTMLCanvasElement=document.getElementById('cvs1') as HTMLCanvasElement;
            if(cvs1.getContext('2d')!=null){
                let  ctx:CanvasRenderingContext2D=cvs1.getContext('2d')||(new CanvasRenderingContext2D());
                if(ctx!=null){
                    let myImg:HTMLImageElement=new Image();
                    myImg.src='/static/2.jpeg';
                    let obj=this;
                    myImg.onload=function(){
                        ctx.drawImage(myImg,0,0);
                        obj.myCtx=ctx;
                    }
                }
            }
        }
        addMosiac(){
            let cvs1:HTMLCanvasElement=document.getElementById('cvs1') as HTMLCanvasElement;
            let row=cvs1.width/this.vagueWidth;
            let column=cvs1.height/this.vagueWidth;
            console.log('row:'+row+',column:'+column);
            for(let x=0;x<row*column;x++){
                let imgData=this.myCtx.getImageData((x%row)*this.vagueWidth,(x/row)*this.vagueWidth,this.vagueWidth,this.vagueWidth);
                let datas=imgData.data;
                let r:number=0,g:number=0,b:number=0;
                for(let i=0;i<datas.length;i+=4){
                    r=r+datas[i];
                    g=g+datas[i+1];
                    b=b+datas[i+2];
                }
                this.myCtx.beginPath();
                this.myCtx.rect((x%row)*this.vagueWidth,(x/row)*this.vagueWidth,this.vagueWidth,this.vagueWidth);
                this.myCtx.fillStyle='rgb('+Math.round(r/(datas.length/4))+','+Math.round(g/(datas.length/4))+','+Math.round(b/(datas.length/4))+')';
                this.myCtx.lineWidth=2;
                this.myCtx.strokeStyle='rgb('+Math.round(r/(datas.length/4))+','+Math.round(g/(datas.length/4))+','+Math.round(b/(datas.length/4))+')';
                this.myCtx.fill();
                this.myCtx.stroke();
            }
        }
        clearMosiac(){

        }
    }
</script>
<style lang="scss" scoped>
.css_mosaic{
    color:transparent;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
}
    canvas{
        border:1px red solid;
        margin-left: 20px;
    }
</style>