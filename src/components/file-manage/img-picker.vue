<template>
    <section>
        <!-- <section
            class="operate-container"
            ref="file_picker_container"
            :style="{background:`url(${upLoadIcon})  0 0 / contain no-repeat`}"
        >-->
        <section class="operate-container" ref="file_picker_container">
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
                        <!-- <img src="./imgs/cancel.jpg" /> -->
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
<script src="./img-picker.js"></script>
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
            // background: url("./imgs/cancel.jpg") 0 0 / contain no-repeat;
        }
    }
}
</style>