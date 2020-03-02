import Vue from 'vue'
Vue.directive('lottie', {
    bind: function (el, binding, vnode) {
        let method = binding.value.bind(this)
        let ISIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios
        if (!ISIOS) {
            let intersectionObserver = new IntersectionObserver(function (entries) {
                let rect = el.getBoundingClientRect()
                let win = document.body.clientHeight || document.documentElement.clientHeight
                //   console.log(`rect top:${rect.top},win top:${win}`);
                if (rect.top < win) {
                    method()
                }
            })
            intersectionObserver.observe(el)
        } else {
            console.log('不支持intersectionObserver')
            loadImg()
            window.addEventListener('scroll', loadImg, true)
        }
        function loadImg() {
            let rect = el.getBoundingClientRect()
            let win = document.body.clientHeight || document.documentElement.clientHeight
            if (rect.top < win) {
                console.log('ios 加载图片')
                method()
            }
        }
    }
})
