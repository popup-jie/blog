// 数组的方法
  // let arr = Array()

  // arr.push()
  // arr.shift()
  // arr.pop()
  // arr.unshift()
  // arr.sort()
  // arr.filter()
  // arr.map()
  // arr.slice()
  // arr.splice()
  // arr.join()
  // arr.concat()
  // arr.reverse()
  // arr.indexOf()
  // arr.toString()

  // var x = 2
  // if (0 < 100 < 0) {
  //   a();
  // } else {
  //   b()
  // }
  // if (0 < 100 < (0 + 4)) {
  //   a();
  // } else {
  //   b()
  // }

  // function a() {
  //   console.log(x);
  //   var x = 2;
  //   console.log(x)
  // }
  // function b() {
  //   console.log(x);
  //   x++
  //   console.log(x)
  // }

  // string 方法
  // str.split('')
  // str.replace()
  // str.match()
  // str.indexOf()
  // str.charAt()
  // str.substring()
  // str.slice()


  // function f1() {
  //   var n = 10
  //   nAdd = function () {
  //     n += 1
  //   }
  //   function f2() {
  //     alert(n)
  //   }

  //   return f2
  // }

  // var result = f1()

  // result()
  // nAdd()
  // result()

  // var oldArr = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 8]

  // Array.prototype.removal = function () {
  //   let originArr = this
  //   let ptem = []
  //   originArr.forEach(item => {
  //     if (ptem.indexOf(item) === -1) {
  //       ptem.push(item)
  //     }
  //   })
  //   return ptem
  // }

  // console.log(oldArr.removal())

  // function insert(arr, i, j) {
  //   let _tmp = arr[j]

  //   if (i < j) {
  //     for (let idx = j; idx > i; idx--) {
  //       arr[idx] = arr[idx - 1]
  //     }
  //   } else {
  //     for (let idx = j; idx < i; idx++) {
  //       arr[idx] = arr[idx + 1]
  //     }
  //   }
  //   arr[i] = _tmp
  // }

  // insert(oldArr, 4, 1)

  // 常用跨域请求
  // nodejs 中间件proxy代理
  // nginx 反向代理
  // jsonp
  // cors 资源跨域想
  // iframe
  // websocket协议跨域
  // possmessage跨域

  // function getUrlObj(str) {
  //   let obj = {}
  //   var str = str || window.location.href

  //   if (str.indexOf('?') != -1) {
  //     let _parmas = sp[1].split('&')
  //     for (let i = 0; i < _parmas.length; i++) {
  //       let eq = _parmas[i].split('=')
  //       obj[eq[0]] = eq[1]
  //     }
  //   }
  //   return obj
  // }
  // console.log(getUrlObj('http://www.baidu.com/?user=123&id=456&city=789'))

  function fx() { }
  function fn() { }
  fn.prototype = new fx()
  Object.prototype.a = 1
  var f1 = new fn()
  console.log(f1)


::: tip
  ssr是node作为中间层的一个应用，而不是node作为中间层
:::
