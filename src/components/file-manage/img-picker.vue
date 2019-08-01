<template>
    <section>
        <section
            class="operate-container"
            ref="file_picker_container"
            :style="{background:`url(${upLoadIcon})  0 0 / contain no-repeat`}"
        >
            <img :src="loadingIcon" v-show="loading" class="loading-icon" />
            <input
                ref="file_picker"
                type="file"
                @click="addImg"
                @input="addImg"
                multiple
                v-show="!loading"
            />
        </section>

        <section class="display-container" v-if="imgList&&imgList.length">
            <section class="switch-preview">
                <section
                    class="switch-preview-item"
                    v-if="previewType!=='table'"
                    @click="switchPreview('table')"
                ></section>
                <section
                    class="switch-preview-item"
                    v-else-if="previewType!=='list'"
                    @click="switchPreview('list')"
                ></section>
            </section>
            <section class="table-container" v-if="previewType==='table'">
                <section v-for="(item,key) in imgList" :key="key" class="table-container-item">
                    <img :src="item.result" />
                    <section class="cancel-icon" @click="removeImg(item)">
                        <img :src="cancelIcon" />
                    </section>
                </section>
            </section>
            <section class="list-container" v-if="previewType==='list'">
                <section v-for="(item,key) in imgList" :key="key" class="list-container-item">
                    <p>{{item.title}}</p>
                    <section class="list-container-item-cancel"></section>
                </section>
            </section>
        </section>
    </section>
</template>
<script>
export default {
    name: "img-picker",
    props: {
        fileType: {
            type: Array,
            default() {
                return ["jpg", "jpeg", "png", "gif"];
            }
        },
        fileNum: {
            type: Number,
            default: 0
        },
        value: {
            type: Array,
            default: []
        },
        ifPreview: {
            type: Boolean,
            default: true
        },
        upLoadIcon: {
            type: String,
            // default: "./imgs/add.jpg"
            default: require("./imgs/add.jpg")
        },
        loadingIcon: {
            type: String,
            // default: "./imgs/loading.png"
            default: require("./imgs/loading.png")
        },
        cancelIcon: {
            type: String,
            default: require("./imgs/cancel.jpg")
        }
    },
    data() {
        return {
            imgList: this.value || [],
            errimgList: [],
            loading: false,
            previewType: "table" //table| list
        };
    },
    mounted() {
        // console.log("img picker init");
        // let file_picker_container = this.$refs.file_picker_container;
        // file_picker_container.style.backgroundImage =
        // 'url("./imgs/add.jpg")';
        // `url("` + this.upLoadIcon + `")`;
        // file_picker_container.style.backgroundSize = "contain";
        // file_picker_container.style.backgroundPositionX = "0px";
        // file_picker_container.style.backgroundPositionY = "0";
        // file_picker_container.style.backgroundRepeat = "no-repeat";
        // console.log(file_picker_container.style);
    },
    methods: {
        addImg: function(e) {
            // console.table(e);
            let that = this;

            that.loading = true;
            // 类数组和数组判断？

            let fileList = Array.from(e.target.files);
            if (
                that.fileNum &&
                that.imgList.length + fileList.length >= that.fileNum
            ) {
                console.log("文件上传超出限制");
                return;
            }
            // console.table(e.target.files);
            let fileListHandler = fileList.map(file => {
                // console.table(file);
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        // console.table(this);
                        that.imgList.push({
                            title: new Date().getTime() + file.name,
                            result: this.result
                        });
                        setTimeout(() => {
                            resolve(file.name);
                        }, 1000);
                    };
                    reader.onerror = function() {
                        that.errList.push({
                            title: file.name
                        });
                        reject(file.name);
                    };
                });
            });
            Promise.all(fileListHandler).then(
                results => {
                    // console.log("图片上传成功");
                    // console.table(results);
                    that.$refs.file_picker.value = "";
                    that.loading = false;
                    that.$emit("update:value", that.imgList);
                },
                results => {
                    // console.log("图片上传异常");
                    // console.table(results);
                    that.loading = false;
                }
            );
        },
        removeImg(param) {
            this.imgList.splice(
                this.imgList.findIndex(o => {
                    return o.title === param.title;
                })
            );
            this.$emit("update:value", this.imgList);
        },
        switchPreview(param) {
            console.log("param:" + param);
            this.previewType = param;
            console.log("this.previewType：" + this.previewType);
        }
    }
};
</script>
<style lang="scss">
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
section {
    display: block;
    box-sizing: border-box;
}
img {
    width: 100%;
    height: 100%;
}
.operate-container {
    width: 100px;
    height: 100px;
    border: 1px black solid;
    overflow: hidden;
    // background: url("./imgs/add.jpg") 0 0 / contain no-repeat;
    .loading-icon {
        animation: loading 2s infinite;
        animation-timing-function: linear;
    }
    input {
        font-size: 100px;
        opacity: 0;
    }
}
.display-container {
    width: 100%;
}
.switch-preview {
    width: 30px;
    height: 30px;
    &-item {
        width: 100%;
        height: 100%;
        border: 1px black solid;
    }
    &:first-child {
        background: url("./imgs/table-icon.jpg") 0 0 / contain no-repeat;
    }
    &:last-child {
        background: url("./imgs/list-icon.png") 0 0 / contain no-repeat;
    }
}

.table-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &-item {
        display: block;
        position: relative;
        width: 120px;
        height: 120px;
        margin: 10px 5px;
        img {
            width: 100%;
            height: 100%;
        }
        img:hover {
            border: 1px red solid;
        }
    }
    .cancel-icon {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 18px;
        height: 18px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.list-container {
    width: 100%;
    &-item {
        line-height: 28px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 28px;
        padding: 0px 10px;
        border-bottom: 1px #e3e3e3 solid;
        p {
            flex: 1;
            white-space: nowrap;
        }
        &-cancel {
            width: 18px;
            height: 18px;
            margin-right: 20px;
            background: url("./imgs/cancel.jpg") 0 0 / contain no-repeat;
        }
    }
}
</style>