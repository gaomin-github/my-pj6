Vue.directive("lottie", {
  bind: function(el, binding, vnode) {
    console.log(`binding.value：` + binding.value);
    // console.log(el);
    binding.value.bind(this)();
  }
});
