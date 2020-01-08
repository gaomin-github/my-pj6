Vue.directive("lottie", {
  bind: function(el, binding, vnode) {
    let method = binding.value.bind(this);
    console.log(this.hasImg);
    let intersectionObserver = new IntersectionObserver(function(entries) {
      let rect = el.getBoundingClientRect();
      let win =
        document.body.clientHeight || document.documentElement.clientHeight;
      //   console.log(`rect top:${rect.top},win top:${win}`);
      if (rect.top < win) {
        method();
      }
      //   console.log(
      //     `entries[0].intersectionRatio:${entries[0].intersectionRatio}`
      //   );
      //   console.log("Loaded new items");
    });
    intersectionObserver.observe(el);
  }
});
