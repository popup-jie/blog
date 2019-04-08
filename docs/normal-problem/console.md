---
pageClass: custom-page-class
---

# 你所不知道的console
`console`的基本用法，可以查看以下这篇文章 [九个Console命令，让js调试更简单](https://github.com/dwqs/blog/issues/32)，小编我就不做任何陈诉了。

> 接下来介绍一下，如何在`vue`项目中扩展`console`并快速定位问题

新建一个**console**类文件
```js
// console.js
const debug = process.env.NODE_ENV !== 'production' // 非正式环境
class consoleClass {
    constructor(type, text) {
        this.type = type
        this.text = text
    }
    print() {
        return (...args) => {
            if (debug) {
                let caller = null
                try {
                    throw new Error();
                } catch (e) {
                    const m = e.stack.split('\n')
                    caller = m.length > 2 ? (m[2].replace(/\s+at /, '')) : 'null'
                }
                console[this.type].apply(0, [
                    `[${this.text}][${new Date().toLocaleString()}]`,
                    `[调用位置：${caller}]\n`, ...args
                ])
            }
        }
    }
}
export default {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install(Vue) {
      Vue.prototype.$log = new consoleClass('log', '日志')
      Vue.prototype.$warn = new consoleClass('warn', '日志')
      Vue.prototype.$error = new consoleClass('error', '日志')
    }
}
```
接下来在`main.js`中引入`console.js`并加载它
```js
// main.js
import Vue from 'vue'
import Console from '@/utils/console.js' 
Vue.use(Console)
```
然后在我们的`.vue`文件就可以愉快的使用我们自定义的`console`方法了
``` js
// example.vue
export default {
    created() {
        this.$log('这是一段测试')
    }
}
```