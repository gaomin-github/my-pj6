Vue.directive("lottie", {
  bind: function(el, binding, vnode) {
    // console.log(`binding.value：` + binding.value);
    // console.log(el);
    binding.value.bind(this)();
    let intersectionObserver = new IntersectionObserver(function(entries) {
      // If intersectionRatio is 0, the target is out of view
      // and we do not need to do anything.
      //   if (entries[0].intersectionRatio <= 0) return;

      //   loadItems(10);
      let rect = el.getBoundingClientRect();
      let win =
        document.body.clientHeight || document.documentElement.clientHeight;
      console.log(`rect top:${rect.top},win top:${win}`);
      //   console.log(
      //     `entries[0].intersectionRatio:${entries[0].intersectionRatio}`
      //   );
      //   console.log("Loaded new items");
    });
    intersectionObserver.observe(el);
  }
});