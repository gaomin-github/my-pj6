<template>
    <section>
        <section class="header">
            <input type="text" />
        </section>
        <section class="wrap">
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
            <h3>js-5：输入表现相关</h3>
            <section class="search_con">
                <label>search :</label>
                <input type="search" @keypress="keyupHandler" @input="inputHandler" />
            </section>
            <section class="click_con" @click="clickHandler">section click响应测试</section>
            <p class="font-enum">横竖屏字体加粗比对</p>
            <p class="font-num">横竖屏字体加粗比对</p>
            <li v-for="(i,key) in 50" :key="key">the ' {{i}}' item display</li>
        </section>
        <section class="bottom">
            <input type="text" />
        </section>
    </section>
</template>
<script>
export default {
    name: "fixedStyleDemo",
    data() {
        return {};
    },
    mounted() {
        console.log("currentTime：" + new Date());
    },
    methods: {
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
        keyupHandler() {
            console.log("keyup handler" + new Date().getTime);
        },
        inputHandler() {
            console.log("input handler" + new Date().getTime);
        },
        clickHandler() {
            console.log("click handler" + new Date().getTime);
        }
    }
};
</script>
<style lang="scss" scoped>
input {
    height: 40px;
    // line-height: 40px;
}
.header,
.bottom {
    position: fixed;
    width: 100%;
    height: 80px;
    border: 1px red solid;
    background: rgb(255, 255, 255);
}
.header {
    top: 0px;
}
.bottom {
    bottom: 0px;
}
.wrap {
    width: 100%;
    height: 100%;
    padding: 80px 0px;
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
    font-weight: bold;
}
.font-num {
    font-weight: 400;
}
</style>