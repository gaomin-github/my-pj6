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
        let arr = ["a", "b", "c", "d", "e"];
        // while (i < 5) {
        while (i < arr.length) {
          console.log(`for:${i}`);
          (function(param) {
            p = p.then(function() {
              console.log(`promise:${param}`);
              // asyncTask();
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(`then:${param}`);
                  resolve();
                }, 1000);
              });
            });
          })(i);
          i++;
        }
      },
      promiseTest() {}
    }
  };
</script>
