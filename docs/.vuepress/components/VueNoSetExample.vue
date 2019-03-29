<template>
  <div>
    <button @click="obj2.a++">{{obj2.a}}</button>
    <button @click='obj2.b++'>{{obj2.b}}</button>
    <div>
      <button @click='lookNowValNow()'>查看当前a，b的值</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj2: {}
      }
    },
    created() {
      this.obj2 = {a: 0}
      this.obj2.b = 0
    },
    methods: {
      lookNowValNow() {
        console.log('a :' + this.obj2.a)
        console.log('b :' + this.obj2.b)
      }
    }
  }
</script>