<template>
  <div>
    <button @click="setObj.a++">{{setObj.a}}</button>
    <button @click="setObj.b++">{{setObj.b}}</button>
    <div>
      <button @click="lookNowVal()">查看当前a，b的值</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addexample',
  data() {
    return {
      setObj: {}
    }
  },
  created() {
    this.setObj = { a: 0 }
    this.$set(this.setObj, 'b', 0)
  },
  methods: {
    lookNowVal() {
      console.log('a :' + this.setObj.a)
      console.log('b :' + this.setObj.b)
    }
  }
}
</script>