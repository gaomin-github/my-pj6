<template>
    <section>
        <section class="css_mosaic">
            <h4>马赛克组件</h4>
        </section>
        <section class="canvas_mosaic">
            <!--<img src=""/>-->

            <button @click="createMosiac">增加马赛克</button>
            <button @click="clearMosiac">清除马赛克</button>
            <br/>
            <canvas id="cvs1" width="500" height="300">

            </canvas>
        </section>

    </section>
</template>
<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator';
    interface PixData{
        x:number,
        y:number,
        r:number,
        g:number,
        b:number
    }
    @Component({
        components:{
        }
    })
    export default class Mosaic extends Vue{
        @Prop({default:''})imgUrl!:string;
        @Prop({default:0}) posX!:number;
        @Prop({default:0}) posY!:number;
        @Prop({default:200}) posW!:number;
        @Prop({default:200}) posH!:number;
        myCvs:HTMLCanvasElement;
        myCtx:CanvasRenderingContext2D; //canvas可渲染区域
        vagueWidth:number=10;
        pixDatas:Array<PixData>=new Array();     //图像的像素值列表
        mosaicData:Array<PixData>=new Array();      //马赛克的数据
        mounted(){
            this.myCvs=document.getElementById('cvs1') as HTMLCanvasElement
            if(this.myCvs){
                this.myCtx=this.myCvs.getContext('2d')||new CanvasRenderingContext2D();
                if(this.myCtx){
                    let myImg:HTMLImageElement=new Image();
                    myImg.src='/static/2.jpeg';
                    let obj=this;
                    myImg.onload=function(){
                        obj.myCtx.drawImage(myImg,0,0);
                        for(let i=0;i<obj.posRow*obj.posColumn;i++){
                            let data=obj.myCtx.getImageData((i%obj.posColumn)*obj.vagueWidth,(i/obj.posColumn)*obj.vagueWidth,obj.vagueWidth,obj.vagueWidth).data;
                            let r=0,g=0,b=0;
                            for(let j=0;j<data.length;j+=4){
                                r=r+data[j];
                                g=g+data[j+1];
                                b=b+data[j+2];
                            }
                            obj.pixDatas=[...obj.pixDatas,{
                                x:i%obj.posColumn,
                                y:i/obj.posColumn,
                                r:Math.ceil(r/(data.length/4)),
                                g:Math.ceil(g/(data.length/4)),
                                b:Math.ceil(b/(data.length/4))
                            }];
                        }
                    }
                }
            }
        }
        get posRow(){
            return Math.ceil(this.myCvs.height/this.vagueWidth);
        }
        get posColumn(){
            return Math.ceil(this.myCvs.width/this.vagueWidth);
        }
        createMosiac(){
            let posStartX=Math.ceil((this.posX+1)/this.vagueWidth);
            let posStartY=Math.ceil((this.posY+1)/this.vagueWidth);
            let posEndX=Math.ceil((this.posX+this.posW)/this.vagueWidth);
            let posEndY=Math.ceil((this.posY+this.posH)/this.vagueWidth);
            for(let i=posStartX;i<posEndX;i++){
                for(let j=posStartY;j<posEndY;j++){
                    this.myCtx.beginPath();
                    this.myCtx.rect((i-1)*this.vagueWidth,(j-1)*this.vagueWidth,this.vagueWidth,this.vagueWidth);
                    let data:PixData=this.pixDatas.slice(i+this.posColumn*(j-1)-1,i+this.posColumn*(j-1))[0];
                    this.mosaicData=[...this.mosaicData,data];
                    this.myCtx.fillStyle='rgb('+data.r+','+data.g+','+data.b+')';
                    this.myCtx.lineWidth=2;
                    this.myCtx.strokeStyle='rgb('+data.r+','+data.g+','+data.b+')';
                    this.myCtx.fill();
                    this.myCtx.stroke();
                }
            }
        }
        clearMosiac(){
            for(let key in this.mosaicData){
                this.myCtx.clearRect(this.mosaicData[key].x*this.vagueWidth,this.mosaicData[key].y*this.vagueWidth,this.vagueWidth,this.vagueWidth);

            }
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