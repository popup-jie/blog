---
pageClass: custom-page-class
---

# 简介

更多更全更详细的每日一题和答案解析，戳这里查看[(壹题)](https://github.com/Advanced-Frontend/Daily-Interview-Question)

### 1、（滴滴、饿了么）写 React/Vue 项目时为什么要在列表组件中写 key，其作用是什么？

在简单模板下，且不带`key`的情况下`diff`速度会更快，这是`vue`采用的“**就地更新**”的策略，
[`这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出`](https://cn.vuejs.org/v2/guide/list.html#%E7%BB%B4%E6%8A%A4%E7%8A%B6%E6%80%81)

但这并不是`key`的作用，key的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度。

### 2、['1', '2', '3'].map(parseInt) what & why ?

```js
['1', '2', '3'].map(parseInt)
```
因为`Map`函数返回**item, index** 传入`parseInt`函数，依次得到为
``` js
parseInt(1, 0)
parseInt(2, 1)
parseInt(3, 2)
```
`parseInt`第二个参数是转化为几进制，所以得到的答案是`[1,NaN,NaN]`


### 3、什么是防抖和节流？有什么区别？如何实现？
::: tip 防抖
当持续触发事件时，一定时间段内没有再触发事件，事件的处理函数才会执行
:::
防抖的实现方式：
```js 
window.onload = function() {
  function dobouce(fun,wait) {
    let time = null
    return function() {
        let that = this
        let _args = arguments
        clearTimeout(time)
        time = setTimeout(function () {
          fun.call(that, _args)
        }, wait)
    }
  }
  function count(e) {
    console.log(e.target.value)
  }
  window.onscroll = function() {
    dobouce(count, 1000)
  }
}

```
::: tip 节流
当持续触发事件时，保证一段时间内只触发一次事件的处理函数
:::
节流实现如下

```js 
function throttle(func, wait) {
  let previous = 0
  return function() {
    let now = Date.now()
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
    // 也可以改成如下代码
    /*
    let timeout = null
    return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(function() {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
    */
  }
}
function count(e) {
  console.log(e.target.value)
}

window.onload = function() {
  window.onscroll = function() {
    throttle(count, 1000)
  }
}

```

### 4、介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

#### set
* 成员不能重复
* 只有健值，没有键名，有点类似数组
* 可以遍历，方法有add, has, delte

#### weakSet
* 成员都是对象，不能存放值
* 成员都是弱引用， 随时可以消失，不能遍历
* 可以用来保存Dom节点，不容易造成内存泄露

#### Map
* 本质上是键值对的集合
* 可以遍历，方法很多，可以和各种数据格式转换

#### weakMap
* 接受对象作为健名（null除外），不接受其他类型的值作为健名
* 健名所指向的对象，不计入垃圾回收机制
* 不能遍历

> map与其他数据格式相互转换方法

(1)Map 转 Array
```js
const map = new Map([1,1],[2,2],[3,3])
console.log([...map])
```
(2)Array 转 Map
```js 
// 二维数组
const arr = [[1,1], [2,2], [3,3]]
console.log(new Map(arr))
```
(3)Map转 Object
```js 
function maptoObj(map) {
  let obj = Object.crated(null)
  for (let [key, value] of map) {
    obj[key] = value
  }
  return obj
}

const map = new Map().set('name', 'An').set('des', 'JS')
maptoObj(map)
```
(4)Object 转 Map
``` js
function objectToMap(obj) {
  let map = new Map()
  for (let key of Object.keys(obj)) {
    map.set(key, obj[key])
  }
  return map
}

objectToMap({'name': 'An'}) 
```

(5)Map转JSon
``` js
function mapToJson(map) {
  return JSON.stringify([...map])
}

let map = new Map().set('name', 'An').set('des', 'JS')
mapToJson(map)
```

(6)Json转map
``` js
function jsonToMap(json) {
  return objectToMap(JSON.parse(json))
}
jsonToMap('{"name": "An", "des": "JS"}')
```

### 5、介绍下深度优先遍历和广度优先遍历，如何实现？

深入优先遍历，就是遍历一个树目录，从顶点遍历到其子节点，知道它的所有子节点遍历完毕之后在遍历它的兄弟节点，实现的是后进先出（类似堆栈）
> 递归遍历

``` js
function deepFirstSearch(node, nodeList) {
  if (node) {
    nodeList.push(node);
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
      deepFirstSearch(children[i], nodeList)
    }
  }
  return nodeList
}
```
> 非递归遍历

```js
function deepFirstSearch(node) {
  let nodes = []
  if (node !== null) {
    var stack = []
    stack.push(node)
    while (stack.length != 0) {
      let _item = stack.pop()
      nodes.push(_item)
      var children = _item.children;
      for (let i = children.length - 1; i >= 0 ; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
```

广度优先遍历，就是遍历一个树目录，从顶点开始遍历，先遍历其所有兄弟节点，再遍历第一个节点的子节点，完成该遍历后，暂不深入，开始遍历其兄弟节点的子节点，实现的是先进先出（类似队列）

> 递归遍历

``` js
function widthFirstSearch(node) {
  var nodes = []
  var i = 0
  while (!(node === null)) {
    nodes.push(node)
    widthFirstSearch(node.nextElementSibling)
    node = nodes[i++]
    widthFirstSearch(node.firstElementChild)
  }
  return nodes
}
```

> 非递归遍历

``` js
function widthFirstSearch(node) {
  let nodes = []
  if (node !== null) {
    var stack = []
    stack.push(node)
    while(stack.length != 0) {
      let _item = stack.shift()
      nodes.push(_item)
      var children = _item.children;
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}

```