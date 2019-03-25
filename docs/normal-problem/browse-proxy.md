# 浏览器常见问题

## window.open被拦截
::: tip 场景
 在开发过程，我们有时候需要在发起`ajax`请求后，得到的结果值，进行页面跳转，而这个时候就会出现浏览器拦截
:::

通常这个时候`测试人员`或者`产品人员`在进行产品浏览的时候，发现没有反应，他们内心肯定是咋想：你是不是又有bug啊！！！
<p style='text-align:center'>
<img :src="$withBase('/timg.gif')" alt="after-skeleton">
</p>

此时我的内心是这样的，要爆炸了。明明很完美的东西，为什么会这样！

通过网上找资料以及本小编的验证，有如下几个方法进行解决：


### 当前窗口打开
1、**a标签**打开

``` js
let a = document.createElement('a')
a.href = url
// 如果此处将 a.target = '_blank' 依然会被拦截
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
```

2、**window.location.href方法**
``` js
window.location.href = url
```

### 新开页打开
定义一个全局变量 `temp`，然后再发起`ajax`请求的后，给予变量temp打开一个新窗口 `temp = window.open('_blank')`，在`ajax`请求完毕后，在`重定向temp`的路径，这样就能完美新开页面了

``` js
var temp = null
function getRource() {
  temp  = window.open('_blank')
  $.ajax({
    url: '',
    type: '',
    data: {},
    success: () => {
      temp.location = url
    },
    error: () => {
      temp.close()
    }
  })
}
```

### 一种取巧的方法，使用弹窗

非用户操作的打开窗口被禁止的，所以我们可以在html里写一个弹窗，回调函数里把弹窗显示，然后点击弹窗的确定按钮执行打开新窗口的操作，不会被拦截。



