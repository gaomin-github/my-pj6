<template>
  <section class="asyncContainer">
    async demo test
    <button @click="asyncTest">async demo</button>
    <button @click="promiseTest">promise demo</button>
  </section>
</template>
<script>
  export default {
    data: function() {
      return {};
    },
    methods: {
      asyncTest() {
        function asyncTask() {
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // console.log('')
              resolve();
            }, 1000);
          });
        }
        let p = Promise.resolve();
        var i = 0;
        let arr = ["a", "b", "c"];
        // while (i < 5) {
        while (i < arr.length) {
          console.log(`for:${arr[i]}`);
          (function(param) {
            p = p.then(function() {
              console.log(`promise:${arr[param]}`);
              // asyncTask();
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(`then:${arr[param]}`);
                  //   i++;
                  arr.splice(param, 1);
                  console.table(arr);
                  resolve();
                }, 1000);
              });
            });
          })(i);
          //   i++;
        }
      },
      promiseTest() {}
    }
  };
</script>
