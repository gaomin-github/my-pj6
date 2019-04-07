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
        b:number,
        imgData:ImageData
    }
    @Component({
        components:{
        }
    })
    export default class Mosaic extends Vue{
        @Prop({default:''})imgUrl!:string;
        @Prop({default:150}) posX!:number;
        @Prop({default:100}) posY!:number;
        @Prop({default:100}) posW!:number;
        @Prop({default:100}) posH!:number;
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
                            let imgData:ImageData=obj.myCtx.getImageData((i%obj.posColumn)*obj.vagueWidth,(Math.floor(i/obj.posColumn))*obj.vagueWidth,obj.vagueWidth,obj.vagueWidth)
                            let r=0,g=0,b=0;
                            for(let j=0;j<imgData.data.length;j+=4){
                                r=r+imgData.data[j];
                                g=g+imgData.data[j+1];
                                b=b+imgData.data[j+2];
                            }
                            obj.pixDatas=[...obj.pixDatas,{
                                x:i%obj.posColumn,
                                y:Math.floor(i/obj.posColumn),
                                r:Math.round(r/(imgData.data.length/4)),
                                g:Math.round(g/(imgData.data.length/4)),
                                b:Math.round(b/(imgData.data.length/4)),
                                imgData:imgData
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
            let posStartX=Math.floor((this.posX)/this.vagueWidth)+1;
            let posStartY=Math.floor((this.posY)/this.vagueWidth)+1;
            let posEndX=Math.ceil((this.posX+this.posW)/this.vagueWidth);
            let posEndY=Math.ceil((this.posY+this.posH)/this.vagueWidth);
            console.log('posStartX:'+posStartX+'，posEndX:'+posEndX+'，posStartY:'+posStartY+'，posEndY:'+posEndY);
            for(let i=posStartX;i<posEndX;i++){
                for(let j=posStartY;j<posEndY;j++){
                    this.myCtx.beginPath();
                    this.myCtx.rect((i-1)*this.vagueWidth,(j-1)*this.vagueWidth,this.vagueWidth,this.vagueWidth);
                    let data:PixData=this.pixDatas.slice((j-1)*this.posColumn+i-1,(j-1)*this.posColumn+i)[0];
                    console.log('x:'+data.x+',y:'+data.y);
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

//                console.log('key:'+key+',x：'+this.mosaicData[key].x+',y:'+this.mosaicData[key].y);
                let imgData=this.mosaicData[key].imgData;
                this.myCtx.clearRect(this.mosaicData[key].x*this.vagueWidth,this.mosaicData[key].y*this.vagueWidth,this.vagueWidth,this.vagueWidth);
                this.myCtx.putImageData(imgData,this.mosaicData[key].x*this.vagueWidth,this.mosaicData[key].y*this.vagueWidth);
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