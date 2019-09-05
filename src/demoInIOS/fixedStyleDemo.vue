<template>
    <section class="js-con" @scroll="jsConScrollHandler">
        <section class="header">
            <input type="text" placeholder="top input" />
        </section>
        <section class="wrap">
            <h3>js-2：srcoll低频触发</h3>
            <h3>js-3:Date相关</h3>
            <p>date test1（2019-09-09 12:13:14）：{{new Date('2019-09-09 12:13:14')}}</p>
            <p>date test2（2019-09-09 12:13:14.）：{{new Date('2019-09-09 12:13:14.')}}</p>
            <p>date test3（2019/09/09 12:13:14）：{{new Date('2019/09/09 12:13:14.')}}</p>
            <h3>js-4：cookie/storage中文相关</h3>
            <section>
                <button @click="setCookie">setCookie</button>
                <button @click="setEncodeCookie">setEncodeCookie</button>
                <button @click="getCookie">getCookie</button>
                <button @click="getDecodeCookie">getDecodeCookie</button>
            </section>
            <section>
                <button @click="setStorage">setStorage</button>
                <button @click="getStorage">getStorage</button>
            </section>
            <hr />
            <h3>js-5：输入表现相关</h3>
            <section class="search_con">
                <label>keyup/input event :</label>
                <input
                    type="search"
                    @keypress="keypressHandler"
                    @keydown="keydownHandler"
                    @keyup="keyupHandler"
                    v-on:input="inputHandler"
                    ref="search_con_text"
                />
            </section>
            <section class="search_con">
                <label>v-modal :{{username}}</label>
                <input type="search" v-model="username" />
            </section>
            <div class="click_con" @click="clickHandler">section click响应测试</div>
            <p class="font-enum">横竖屏字体加粗enum</p>
            <p class="font-num">横竖屏字体加粗num</p>
            <h3>js-6：body，html中绑定的事件不能触发</h3>
            <h3>js-7：音视频自动播放</h3>

            <h3>js-8：上传图片重名问题</h3>
            <h3>js-9：上拉/下拉露底</h3>
            <li v-for="(i,key) in 50" :key="key">the ' {{i}}' item display</li>
        </section>
        <section class="bottom">
            <input type="text" autocapitalize="off" placeholder="bottom input" />
        </section>
    </section>
</template>
<script>
export default {
    name: "fixedStyleDemo",
    data() {
        return {
            username: ""
        };
    },
    mounted() {
        // console.log("currentTime：" + new Date());

        window.onscroll = function(e) {
            // console.log("body scroll been touched：" + new Date().getTime());
        };
    },
    methods: {
        jsConScrollHandler() {
            console.log("jsConScrollHandler：" + new Date().getTime());
        },
        setCookie() {
            document.cookie = "username=张三";
        },
        setEncodeCookie() {
            document.cookie = encodeURIComponent("username=张三");
        },
        getCookie() {
            console.log(document.cookie);
        },
        getDecodeCookie() {
            console.log(decodeURIComponent(document.cookie));
        },
        setStorage() {
            localStorage.setItem("username", "张三");
        },
        getStorage() {
            console.log("username:" + localStorage.getItem("username"));
        },
        keypressHandler() {
            console.log("keypress handler" + new Date().getTime());
        },
        keydownHandler() {
            console.log("keydown handler" + new Date().getTime());
        },
        keyupHandler() {
            // console.log("keyup handler");
            console.log("keyup handler" + new Date().getTime());
        },
        inputHandler(e) {
            // console.log("input handler");
            console.log("input handler" + new Date().getTime());
            if (e.data === "a") {
                console.log("blur event touched");
                this.$refs["search_con_text"].blur();
            }
            console.log(e);
        },
        clickHandler() {
            console.log("click handler" + new Date().getTime());
        }
    }
};
</script>
<style lang="scss" scoped>
input {
    height: 30px;
    // line-height: 40px;
}
.js-con {
    border: 2px red solid;
    height: 100%;
    background-attachment: fixed;
    background: url(./img/bg1.jpg) 0 0 /100% auto no-repeat;
    // position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.header,
.bottom {
    position: fixed;
    width: 80%;
    height: 60px;
    margin: 0 10%;
    border: 1px red solid;
}
.header {
    position: fixed;
    top: 0px;
}
.bottom {
    // position: absolute;
    bottom: 0px;
}
.wrap {
    width: 100%;
    height: 100%;
    margin: 80px 0px;
    border: 1px black solid;
    li {
        line-height: 30px;
    }
}
.font-enum,
.font-num {
    font-size: 30px;
}
.font-enum {
    text-size-adjust: 100%;
    font-weight: bold;
}
.font-num {
    font-weight: 600;
}
.click_con {
    display: inline-block;
    border: 1px green solid;
}
</style>