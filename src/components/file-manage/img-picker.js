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
            default: "./imgs/cancel.jpg"
            // default: require("./imgs/cancel.jpg")
            // default: () => import("./imgs/cancel.jpg")
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
        console.log("img picker init");
        let file_picker_container = this.$refs.file_picker_container;
        file_picker_container.style.backgroundImage = 'url("./imgs/add.jpg")';
        // `url("` + this.upLoadIcon + `")`;
        file_picker_container.style.backgroundSize = "contain";
        file_picker_container.style.backgroundPositionX = "0px";
        file_picker_container.style.backgroundPositionY = "0";
        file_picker_container.style.backgroundRepeat = "no-repeat";
        // console.log(file_picker_container.style);
    },
    methods: {
        addImg: function (e) {
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
                    reader.onload = function () {
                        // console.table(this);
                        that.imgList.push({
                            title: new Date().getTime() + file.name,
                            result: this.result
                        });
                        setTimeout(() => {
                            resolve(file.name);
                        }, 1000);
                    };
                    reader.onerror = function () {
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