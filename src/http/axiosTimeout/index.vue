<template>
    <section class="wrapper">
        <!-- <section>this is jsonAxios test</section> -->
        <section @click="httpRequestHandler">httpRequestHandler</section>
    </section>
</template>
<script>
import axios from "axios";
export default {
    methods: {
        httpRequestHandler() {
            console.log("test");
            let jsonAxios = axios.create({
                timeout: 3000
            });
            jsonAxios.defaults.retry = 3;
            jsonAxios.defaults.retryDelay = 1000;

            jsonAxios.interceptors.response.use(
                success => {
                    console.log(`success`, 23);
                    return success();
                },
                err => {
                    console.log(`err:${err}`, 23);
                    let config = err.config;
                    // console.log(config, 25);
                    if (!config || !config.retry) return Promise.reject(err);
                    config._retryCount = config._retryCount || 0;
                    if (config._retryCount >= config.retry) {
                        return Promise.reject(err);
                    }

                    config._retryCount++;
                    let delayHandler = new Promise(resolve => {
                        setTimeout(() => {
                            console.log(`retry:${new Date().getTime()}`);
                            resolve();
                        }, 1000);
                    });
                    return delayHandler.then(() => {
                        return jsonAxios(config);
                    });
                }
            );
            jsonAxios
                .get("/axios-time-out", { retry: 3, retryDelay: 1000 })
                .then(res => {
                    console.log(res, 48);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.wrapper {
    border: 1px black solid;
    height: 100px;
}
</style>