---
pageClass: custom-page-class
---

# js常见问题

## 对象拷贝
### for...in 简单复制
``` js
function simpleCopy(initObj) {
    let obj = {}
    for (let i in iniObj) {
        obj[i] = iniObj[i;]
    }
    return obj
}
var _obj = { a: 1, b: 2, c: 3 }
var _obj2 = simpleCopy(_obj)
_obj2.a = 2
console.log(_obj)
console.log(_obj2)
// {a: 2, b: 2, c: 3}
```
以上会输出同样的值

### JSON.parse和JSON.stringify

``` js
let normalObj = { a: 1, b: 2, c: 3 }
let newObj = JSON.parse(JSON.stringify(normalObj))
newObj.a = 2
// normalObj = { a: 1, b: 2, c: 3 }
// newObj = { a: 2, b: 2, c: 3 }
```
以上方法缺存在弊端，例如下面这个例子
``` js
let normalObj = { 
    name: 'abc',
    data: function() {
        console.log('this is data')
    },
    b: null,
    c: undefined,
    d: {},
    e: new Date(),
    res: new RegExp('\\w+'),
    error: new Error(),
    num: NaN
}
let newObj = JSON.parse(JSON.stringify(normalObj))
console.log(newObj)
```
* 新拷贝出来的对象会把时间对象直接转换为字符串的形式，
* 将`RegExp`,`Error`直接转换成了对象
* 把`undefined`，`function`丢失或者转换为函数
* 把`NaN`、`Infinity`和`-Infinity`转换为null
* 对象如果存在循环，也无法实现正确的拷贝
* 同时会抛弃对象的constructor

### Object.assign处理
``` js
let normalObj = { a: 1, b: 2, c: 3 }
let newObj = Object.assign(normalObj, {d: 4})
newObj.e = 5
console.log(normalObj)
console.log(newObj)
// {a: 1, b: 2, c: 3, d: 4, e: 5 }
// {a: 1, b: 2, c: 3, d: 4, e: 5 }
```
以上实现的是`浅拷贝`，我们会看到`normalObj`，`newObj`输出的对象是一致的，接下来我们再看一个例子
``` js
let normalObj = { a: 1, b: 2, c: 3 }
let newObj = Object.assign({}, normalObj, {e: 4})
newObj.d = 5
console.log(normalObj)
console.log(newObj)
// {a: 1, b: 2, c: 3}
// {a: 1, b: 2, c: 3, e: 4, d: 5}
```
由于`Object.assign()`第一个参数的不同，我们上面的2个例子得到的结果也不一样，因为`Object.assign`的第一个参数是目标对象，我们将目标对象设置为了一个**空对象**，实际上是重新申请了一块内存的空间，所以这里实现了深度拷贝

在回到我们的例子当中
``` js
let normalObj = { 
    name: 'abc',
    data: function() {
        console.log('this is data')
    },
    b: null,
    c: undefined,
    d: {},
    e: new Date(),
    res: new RegExp('\\w+'),
    error: new Error(),
    num: NaN
}
let newObj = Object.assign({}, normalObj, {text: '新的对象'})
console.log(newObj)
```
我们可以看到由`JSON.parse`转换过的方法，在用`Object.assign`方法进行拷贝时候，解决了`JSON`所带来的问题
::: danger 警告
但是 Object.assign 却只能实现深度为**一层**的对象拷贝
:::
如以下这个例子:
``` js
let normalObj = { body: {a: 1} }
let newObj = Object.assign(normalObj, {b: 4})
newObj.body.a = 2
console.log(normalObj)
console.log(newObj)
// normalObj: { b: 4, body: {a: 2}} 
// newObj: { b: 4, body: {a: 2}} 
```
所以`Object.assign`只能用来实现对象的一层拷贝

### 递归实现深拷贝
``` js
function deepCopy(obj) {
    let _obj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let i in obj) {
            // 这里使用了hasOwnProperty判断当前属性是否为自身属性
            if (obj.hasOwnProperty(i)) {
                // 如果子属性为引用数据，递归复制
                if (obj[i] && typeof obj[i] === 'object') {
                    _obj[i] = deepCopy(obj[i])
                } else {
                // 如果是基本数据类型，直接简单复制
                    _obj[i] = obj[i]
                }
            }
        }
    }
    return _obj
}
```
以上也存在缺陷，但是当遇到两个互相引用的对象，会出现死循环的情况，例如: `obj = {a: 1, b: obj}`
所以我们需要以下处理
``` js
function deepCopy(obj) {
    let _obj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let i in obj) {
            let current = obj[i]
            if (current === obj) {
                continue;
            }
            if (obj.hasOwnProperty(i)) {
                if (typeof obj[i] === 'object') {
                    _obj[i] = deepCopy(obj[i])
                } else {
                    _obj[i] = obj[i]
                }
            }
        }
    }
    return _obj
}
```
> 以上这个方法也是目前较为常用的方法
### lodash
一个非常热门的函数库`lodash`，也有提供`_.cloneDeep`用来做**Deep Copy**
``` js 
var _ = require('lodash')
var obj1 = {
    a: 2,
    b: {f: {g: 1 } },
    c: [1, 2, 3]
}
var obj2 = _.cloneDeep(obj1)
console.log(obj1.b.f === obj2.b.f)
// false
```
这个性能还不错，使用起来也很简单。

> 总结
* 如果是只有一层数据进行拷贝的时候，推荐使用`Object.assign`方法
* 如果在针对`数据`或者不存在`undefied`，`NaN`，`function`，`RegExp`，`Error`等属性值时候，建议用`JSON.parse`和`JSON.stringify`，因为我们都知道`JSON.parse`和`JSON.stringify`是浏览器的内置方法，处理起来肯定是要比`递归`处理数据要快
* 如果实现较为复杂的数据的情况下，就用**深度拷贝**方法
* 如果项目中有引用`lodash`包的话，也可以直接使用它的内置方法`_.cloneDeep`方法

## hasOwnProperty
> hasOwnProperty 用来检测一个对象是否含有特定的自身对象，会忽略掉从原型链上继承到的属性