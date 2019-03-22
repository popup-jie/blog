# vue常见问题

## 强制刷新当前页面

::: tip 场景
通常我们在处理列表时，常常有一条数据删除或者新增数据后需要刷新当前页面
:::

``` vue
<script>
export default {
  methods: {
    addItem() {
      this.$router.push('')
      // 或者
      this.$router.replace('')
      // 或者
      window.reload()
      // 或者
      this.$router.go(0)
    }
  }
}
</script>
```

* 而如果采用vue-router刷新路由的方法，页面是不会刷新的
* 采用window.reload() 或者 router.go(0)刷新时，整个浏览器进行了重新加载，会闪烁，体验非常不好

而采用的解决办法就是使用：`provide/inject`组合

**App.vue**文件中申明：
```vue 
<template>
  <div id="app">
    <router-view v-if='isRouteAlive'>
    </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouteAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouteAlive = false
      this.$nextTick(() => {
        this.isRouteAlive = true
      })
    }
  }
}
</script>
```

相对应需要刷新的页面则：

**child.vue**

```vue
<script>
export default {
  inject: ['reload'],
  methods: {
    handleSomeFn() {
      // ...othercode
      this.reload() // 这里直接调用就行了
    }
  }
}
</script>
```

## 父子组件通信

**parent.vue**

```vue 
<template>
  <child-component :resoure="resoure" @clickHandle="getChildMsg">
  </child-component>
</template>
<script>
  import childComponent from './child-component'
  export default {
    data() {
      return {
        resoure: []
      }
    },
    methods: {
      getChildMsg() {
        // ...othercode
      }
    },
    components: {
      childComponent
    }
  }
</script>
```

**child-component.vue**

```vue
<template>
  <div @click="clickHandle()"></div>
</template>

<script>
  export default {
    props: {
      resoure: {
        type: Array,
        default: []
      }
    },
    methods: {
      noticeParent() {
        this.$emit('clickHandle')
        // 如果有参数则用以下写法
        this.$emit('clickHandle', params1, params2)
        // 或者
        this.$emit('clickHandle', {
          params1, params2
        })
      }
    }
  }
</script>
```

这里需要注意的是 `@clickHandle="getChildMsg"`中，`getChildMsg`不要带括号，不然子组件传上来的参数会获取不到的

## 兄弟组件通信

### 一.通过一个父组件，使兄弟组件之间处于同一个页面下
**parent.vue**

```vue 
<template>
  <div>
    <first-component @firstEmit='getfirstMsg'></first-component>
    <seconds-component :msg="msg"></seconds-component>
  </div>
</template>
<script>
  import firstComponent from './first-component'
  import secondsComponent from './seconds-component'
  export default {
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      getfirstMsg() {
        // 接收到子组件的信息啦~~
        this.msg = '我接收到第一组件的消息啦'
      }
    },
    components: {
      firstComponent,
      secondsComponent
    }
  }
</script>
```

**first-component.vue**

```vue
<template>
  <div @click="noticeParent()"></div>
</template>

<script>
  export default {
    methods: {
      noticeParent() {
        this.$emit('firstEmit')
      }
    }
  }
</script>
```

**seconds-component.vue**
```vue
<template>
  <div>{{msg}}</div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
  }
</script>
```

### 二.通过vuex处理

vuex相关介绍及用法查看：[vuex是什么](https://vuex.vuejs.org/zh/)

## vue $set的用法

::: tip 场景
  当`vue`的`data`里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，如果更新此属性的值，是不会更新视图的。
:::
``` vue
<template>
  <div>
    <button @click="obj.a++">{{obj.a}}</button>
    <button @click='obj.b++'>{{obj.b}}</button>
    <button @click='lookNowVal()'>查看当前a，b的值</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj: {}
      }
    },
    created() {
      this.obj = {
        a: 0
      }
      this.obj.b = 0
    },
    methods: {
      lookNowVal() {
        console.log('a :' + this.obj.a)
        console.log('b :' + this.obj.b)
      }
    }
  }
</script>
```
<template>
  <div>
    <button @click="obj.a++">{{obj.a}}</button>
    <button @click='obj.b++'>{{obj.b}}</button>
    <div>
      <button @click='lookNowVal()'>查看当前a，b的值</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj: {}
      }
    },
    created() {
      this.obj = {
        a: 0
      }
      this.obj.b = 0
    },
    methods: {
      lookNowVal() {
        console.log('a :' + this.obj.a)
        console.log('b :' + this.obj.b)
      }
    }
  }
</script>

分别在`A按钮`和`B按钮`连续点击3次，会看到在`a按钮`的数据在增加，而当点击了`b按钮`的情况下，会看到数据没有实时更新，但是我当我们点击查看时，却可以看到数据，当我们点击`查看`的按钮，控制台会打印出如下信息

``` 
a: 3
b: 3
```
::: tip 原因
由于收现代`javascript`的限制(以及废弃`Object.observe`)，`vue`不能检测对象的属性的添加和删除。由于`vue`会在初始化实例时对属性进行`getter/setter`转化过程，所以属性必须在data对象上存在才能让`vue`对它进行实时响应
:::

而官方也有相对的解决办法：`$set`

`Vue` 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对

以上created初始化的地方进行以下修改

``` js
created() {
  this.obj = {a: 0}
  this.$set(this.obj, 'b', 0)
}
```

<template>
  <div>
    <button @click="obj.a++">{{obj.a}}</button>
    <button @click='obj.b++'>{{obj.b}}</button>
    <div>
      <button @click='lookNowVal()'>查看当前a，b的值</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj: {}
      }
    },
    created() {
      this.obj = {a: 0}
      this.$set(this.obj, 'b', 0)
    },
    methods: {
      lookNowVal() {
        console.log('a :' + this.obj.a)
        console.log('b :' + this.obj.b)
      }
    }
  }
</script>

## 小球动画处理

学习`vue高仿饿了吗`项目，小球掉落动画

``` vue
<div class="ball-container">
  <div v-for="(ball, index) in balls">
    <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
      <div class="ball" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </transition>
  </div>
</div>
```

``` css
.ball {
  position: fixed;
  right: 0;
  top: 56%;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49,-0.29,0.75, 0.14)
}
.ball .inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0, 160, 220);
  transition: all 0.4s linear
}
```
[cubic-bezier](http://cubic-bezier.com/#.17,.67,.83,.67)动画取值

data数据部分

```js
export default {
  data: ()=>({
    balls: [
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      }
    ],
    dropBalls: []
  })
}
```

**鼠标触发事件**--拿到当前被点击的被点击的元素

``` js
function whichTransitionEvent() {
    let el = document.createElement('surface'),
    transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }
  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
}
export default {
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    }
  }
}
```

**动画进入事件**

``` js
export default {
  methods: {
    beforeEnter(el) {
      let count = this.balls.length
      while(count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = -(rect.right - rect.left + 50)
          let y = -(window.innerHeight * 0.6 - rect.top)
          el.style.display = ''
          el.style.transition = 'all 0.4s cubic-bezier(0.49,-0.29,0.75, 0.14)'
          el.style.webkitTransform = `translate3d(0, ${y}px,0)`
          el.style.transform = `translate3d(0, ${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    }
  }
}
```

**动画执行过程事件**
``` js
export default {
  methods: {
    enter(el, done) {
      let rf = el.offsetHeight // 触发浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        let transitionEvent = whichTransitionEvent()
        // whichTransitionEvent 方法是用来判断当前浏览器支持哪一种动画前缀
        transitionEvent && el.addEventListener(transitionEvent, () => {
          done()
        })
      })
    }
  }
}
```

**动画执行结束事件**
``` js
export default {
  methods: {
    afterEnter(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
```
