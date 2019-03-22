---
sidebar: auto
sidebarDepth: 2
---

# 前端性能优化

## 为什么要做性能优化呢？

当一个用户访问你的网站的时候： 

* 在**2**秒内得到响应时，会感觉系统响应很快

* 在**2-5**秒之间得到响应时，会感觉系统的响应速度还可以

* 在**5-8**秒以内得到响应时，会感觉系统的响应速度很慢，但可以接受；而超过8秒后仍然无法得到响应时，用户会感觉系统糟透了，进而选择离开这个站点，或者发起第二次请求。


**好不容易来的流量，就这样跑了！**
![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552477266210&di=1fd1aa52494c5dae0cc93490ed76e1bb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F16%2F20180716210219_lsuuk.thumb.224_0.jpg)

## 常见的性能优化

1. **减少http请求：主要以优化js、css和图片资源三个方面**

    * 合并js
    * 合并css
    * 雪碧图的使用(css sprite)
    * 使用base64表示简单的图片

    上述四个方法，前面两者我们可以使用webpack之类的打包工具进行打包；雪碧图的话，也有专门的制作工具；图片的编码是使用base64的，所以，对于一些简单的图片，例如空白图等，可以使用base64直接写入html中。

回到之前网络层面的问题，除了减少请求数量来加快网络加载速度，往往整个资源的体积也是，平时我们会关注的方面。

2. **减少资源体积**

    * gzip压缩
    * js混淆
    * css压缩
    * 图片压缩

    gzip压缩主要是针对html文件来说的，它可以将html中重复的部分进行一个打包，多次复用的过程。js的混淆可以有简单的压缩(将空白字符删除)、丑化(丑化的方法，就是将一些变量缩小)、或者可以使用php对js进行混淆加密。css压缩，就是进行简单的压缩。图片的压缩，主要也是减小体积，在不影响观感的前提下，尽量压缩图片，使用png等图片格式，减少矢量图、高清图等的使用。这样子的做法不仅可以加快网页显示，也能减少流量的损耗。

除了以上两部分的操作之外，在网络层面我们还需要做好缓存工作。真正的性能优化来说，缓存是效率最高的一种，往往缩短的加载时间也是最大的。

3. **缓存利用**

    * DNS缓存
    * CDN部署与缓存
    * css压缩
    * http缓存

    由于浏览器会在DNS解析步骤中消耗一定的时间，所以，对于一些高访问量网站来说，做好DNS的缓存工作，就会一定程度上提升网站效率。CDN缓存，CDN作为静态资源文件的分发网络，本身就已经提升了，网站静态资源的获取速度，加快网站的加载速度，同时也给静态资源做好缓存工作，有效的利用已缓存的静态资源，加快获取速度。http缓存，也是给资源设定缓存时间，防止在有效的缓存时间内对资源进行重复的下载，从而提升整体网页的加载速度。

其实，网络层面的优化还有很多，特别是针对于移动端页面来说。众所周知，移动端对于网络的敏感度更加的高，除了目前的4G和WIFI之外，其他的移动端网络相当于弱网环境，在这种环境下，资源的缓存利用是相当重要的。而且，减少http的请求次数，也是至关重要的，移动端弱网环境下，对于http请求的时间也会增加。所以，我们可以看一下我们在移动端网络方面可以做的优化：


4. **移动端优化**

    * 使用长cache，减少重定向
    * 首屏优化，保证首屏加载数据小于14kb
    * 不滥用web字体

    「使用长cache」，可以使得移动端的部分资源设定长期缓存，这样可以保证资源不用向服务器发送请求，来比较资源是否更新，从而避免304的情况。304重定向，在PC端或许并不会影响网页的加载速度，但是，在移动端网络不稳定的前提下，多一次请求，就多了一部分加载时间。「首屏优化」，对于移动端来说是至关重要的。2s时间是用户的最佳体验，一旦超出这个时间，将会导致用户的流失。所以，针对移动端的网络情况，不可能在这么短时间内加载完成所有的网页资源，所以我们必须保证首屏中的内容被优先显示出来，而且基于TCP的慢启动和拥塞控制，第一个14kb的数据是非常重要的，所以需要保证首部加载数据能够小于14kb。「不滥用web字体」，web字体的好处就是，可以代替某些图片资源，但是，在移动端过多的web字体的使用，会导致页面资源加载的繁重，所以，慎用web字体
  
5. **优化网页渲染**

    * css的文件放在头部，js文件放在尾部或者异步
    * 尽量避免內联样式

    css文件放在「头部加载」，可以保证解析DOM的同时，解析css文件。因为，CSS（外链或内联）会阻塞整个DOM的渲染，然而DOM解析会正常进行，所以将css文件放在头部进行解析，可以加快网页的构建速度。假设将其放在尾部，那时DOM树几乎构建，这时就得等到CSSOM树构建完成，才能够继续下面的步骤。「js放在尾部」：js文件不同，将js文件放在尾部或者异步加载的原因是JS（外链或内联）会阻塞后续DOM的解析，后续DOM的渲染也将被阻塞，而且一旦js中遇到DOM元素的操作，很可能会影响。这方面可以推荐一篇文章——<a href='https://harttle.land/2016/05/18/async-javascript-loading.html' target='_blank'>异步脚本载入提高页面性能</a>。「避免使用内联样式」，可以有效的减少html的体积，一般考虑内联样式的时候，往往是样式本身体积比较小，往往加载网络资源的时间会大于它的时候。

除了页面渲染层面的优化，当然最重要的就是DOM操作方面的优化，这部分的优化应该是最多的，而且也是平时开发可以注意的地方。如果开发前期明白这些原理，同时付诸实践的话，就可以在后期的性能完善上面少下很多功夫。那么，接下来我们可以来看一下具体的操作：

6. **DOM操作优化**

    * 避免在document上直接进行频繁的DOM操作
    * 使用classname代替大量的内联样式修改
    * 对于复杂的UI元素，设置position为absolute或fixed
    * 尽量使用css动画
    * 使用requestAnimationFrame代替setInterval操作
    * 适当使用canvas
    * 尽量减少css表达式的使用
    * 使用事件代理

    前面三个操作，其实都是希望『减少回流和重绘』。其实，进行一次DOM操作的代价是非常之大的，以前可以通过网页操作是否卡顿来进行判断，但是，现代浏览器的进步已经大大减少了这方面的影响。但是，我们还是需要清楚，如何去减少回流和重绘的问题。因为这里不想细说这方面的知识，想要了解的话，可以看这篇文章——<a href='https://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/' target="_blank">回流与重绘：CSS性能让JavaScript变慢？</a>。这可是张鑫旭大大的一篇文章呦(^.^)。「尽量使用css动画」，是因为本身css动画比较简单，而且相较于js的复杂动画，浏览器本身对其进行了优化，使用上面不会出现卡顿等问题。「使用requestAnimationFrame代替setInterval操作」，相信大家都有所耳闻，setInterval定时器会有一定的延时，对于变动性高的动画来说，会出现卡顿现象。而requestAnimationFrame正好解决的整个问题。「适当使用canvas」，不得不说canvas是前端的一个进步，出现了它之后，前端界面的复杂性也随之提升了。一些难以完成的动画，都可以使用canvas进行辅助完成。但是，canvas使用频繁的话，会加重浏览器渲染的压力，同时导致性能的下降。所以，适当时候使用canvas是一个不错的建议。「尽量减少css表达式的使用」，这个在YUI规则中也被提到过，往往css的表达式在设计之初都是美好的，但在使用过程中，由于其频繁触发的特性，会拖累网页的性能，出现卡顿。因此在使用过程中尽量减少css表达式的使用，可以改换成js进行操作。「使用事件代理」：往往对于具备冒泡性质的事件来说，使用事件代理不失为一种好的方法。举个例子：一段列表都需要设定点击事件，这时如果你给列表中的每一项设定监听，往往会导致整体的性能下降，但是如果你给整个列表设置一个事件，然后通过点击定位目标来触发相应的操作，往往性能就会得到改善。

DOM操作的优化，还有很多，当然也包括移动端的。这个会在之后移动端优化部分被提及，此处先卖个关子。上面我们概述了开始渲染的时候和DOM操作的时候的一些注意事项。接下来要讲的是一些小细节的注意，这些细节可能对于页面影响不大，但是一旦堆积多了，性能也会有所影响。

7. **操作细节注意**

    * 避免图片或者frame使用空src
    * 在css属性为0时，去掉单位
    * 禁止图像缩放
    * 正确的css前缀的使用
    * 移除空的css规则
    * 对于css中可继承的属性，如font-size，尽量使用继承，少一点设置  
    * 缩短css选择器，多使用伪元素等帮助定位

    上述的一些操作细节，是平时在开发中被要求的，更可以理解为开发规范。(基本操作，坐下^_^)

列举完基本操作之后，我们再来聊一下移动端在DOM操作方面的一些优化。

8. **移动端优化：**

    * 长列表滚动优化
    * 函数防抖和函数节流
    * 使用touchstart、touchend代替click
    * HTML的viewport设置
    * 开启GPU渲染加速

    首先，长列表滚动问题，是移动端需要面对的，IOS尽量使用局部滚动，android尽量使用全局滚动。同时，需要给body添加上-webkit-overflow-scrolling: touch来优化移动段的滚动。如果有兴趣的同学，可以去了解一下ios和android滚动操作上的区别以及优化。「防抖和节流」，设计到滚动等会被频繁触发的DOM事件，需要做好防抖和节流的工作。它们都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象。
    ::: tip 介绍
    函数防抖，当调用动作过n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间；函数节流，预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
    :::
    「touchstart、touchend代替click」，也是移动端比较常用的操作。click在移动端会有300ms延时，这应该是一个常识呗。(不知道的小伙伴该收藏一下呦)。这种方法会影响用户的体验。所以做优化时，最简单的方法就是使用touchstart或者touchend代替click。因为它们事件执行顺序是touchstart->touchmove->touchend->click。或者，使用fastclick或者zepto的tap事件代替click事件。「HTML的viewport设置」，可以防止页面的缩放，来优化性能。「开启GPU渲染加速」，小伙伴们一定听过CPU吧，但是这里的GPU不能和CPU混为一谈呦。GPU的全名是Graphics Processing Unit，是一种硬件加速方式。一般的css渲染，浏览器的渲染引擎都不会使用到它。但是，在3D渲染时，计算量较大，繁重，浏览器会开启显卡的硬件加速来帮助完成这些操作。所以，我们这里可以使用css中的translateZ设定，来欺骗浏览器，让其帮忙开启GPU加速，加快渲染进程。
  
DOM部分的优化，更多的是习惯。需要自己强制要求自己在开发过程中去注意这些规范。所以，这部分的内容可以多关注一下，才能够慢慢了解。同时，本人对于上述几点的描述是概括性的。并没有对其进行详细的展开。因此，也要求你去细细的查阅Google呦。

8. **图片加载处理**

    * 图片预加载
    * 图片懒加载
    * 首屏加载时进度条的显示

    「图片预加载」，预加载的寓意就是提前加载内容。而图片的预加载往往会被用在图片资源比较大，即时加载时会导致很长的等待过程时，才会被使用的。常见场景：图片漫画展示时。往往会预加载一张到两张的图片。「图片懒加载」，懒加载或许你是第一次听说，但是，这种方式在开发中会被经常使用。首先，我们需要明白一个道理：往往只有看到的资源是必须的，其他资源是可以随着用户的滚动，随即显示的。所以，特别是对于图片资源特别多的网站来说，做好图片的懒加载是可以大大提升网页的载入速度的。

    ::: tip 常见方式
    在最初给图片的src设置一个比较简单的图片，然后将图片的真实地址设置给自定义的属性，做一个占位，然后给图片设置监听事件，一旦图片到达视口范围，从图片的自定义属性中获取出真是地址，然后赋值给src，让其进行加载
    :::

    「首屏进度条的显示」：往往对于首屏优化后的数据量并不满意的话，同时也不能进一步缩短首屏包的长度了，就可以使用进度条的方式，来提醒用户进行等待。

讲完了图片这一块数据资源的处理，往往我们需要去优化一下异步请求这一部分的内容。因为，异步的数据获取也是前端不可分割的。这一部分我们也可以做一定的处理：


9. **异步请求的优化**

    * 使用正常的json数据格式进行交互
    * 部分常用数据的缓存
    * 数据埋点和统计

    「JSON交互」，JSON的数据格式轻巧，结构简单，往往可以大大优化前后端的数据通信。「常用数据的缓存」，可以将一些用户的基本信息等常用的信息做一个缓存，这样可以保证ajax请求的减少。同时，HTML5新增的storage的内容，也不用怕cookie暴露，引起的信息泄漏问题。「数据埋点和统计」，对于资深的程序员来说，比较了解。而且目前的大部分公司也会做这方面的处理。有心的小伙伴可以自行查阅。

最后，还有就是大量数据的运算。对于javascript语言来说，本身的单线程就限制了它并不能计算大量的数据，往往会造成页面的卡顿。而可能业务中有些复杂的UI需要去运行大量的运算，所以，webWorker的使用是至关重要的。或许，前端标准普及的落后，会导致大家对于这些新生事物的短暂缺失吧。

## 骨架屏优化

### 一、何为骨架屏

简单来说，骨架屏就是在页面内容未加载完成的时候，先使用一些图形进行占位，待内容加载完成之后再把它替换掉。

举个:chestnut:：

<p>
<img :src="$withBase('/after-skeleton.jpg')" alt="after-skeleton">
</p>

### 二、在vue中使用骨架屏

因为我们的代码会使用`webpack`打包，所以在我们的`js`下载运行之前，用户是无法在页面上看到信息，所以，我们要把骨架屏相关的代码放到`HTML`里面，当然，可以把代码直接写在html文件的`<div id=’app‘></div>`里面，但是为了维护我们进行开发时的体验，我们在开发时可以使用一个`webpack`插件，来像开发组件一样来开发骨架屏。

#### 1.添加`vue-skeleton-webpack-plugin`插件
```
npm install vue-skeleton-webpack-plugin
```

#### 2.新建我们的骨架组件

首先在我们的项目中新建一个`.vue`文件，用来写我们的骨架屏，我这里是在`app.vue`同级目录下新建了一个`Skeleton.vue`,里面可以写我们的骨架屏代码；

``` vue
<template>
  <div class="skeleton-wrapper">
    <section class="skeleton-block">
      <!-- eslint-disable vue/max-len -->
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTA4MCAyNjEiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDEwODB2MjYwSDB6Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgeD0iLTUwJSIgeT0iLTUwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd09mZnNldE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTMzMzMzMzMzIDAgMCAwIDAgMC45MzMzMzMzMzMgMCAwIDAgMCAwLjkzMzMzMzMzMyAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCA0NGg1MzN2NDZIMjMweiIvPjxyZWN0IHdpZHRoPSIxNzIiIGhlaWdodD0iMTcyIiB4PSIzMCIgeT0iNDQiIGZpbGw9IiNGNkY2RjYiIHJ4PSI0Ii8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCAxMThoMzY5djMwSDIzMHpNMjMwIDE4MmgzMjN2MzBIMjMwek04MTIgMTE1aDIzOHYzOUg4MTJ6TTgwOCAxODRoMjQydjMwSDgwOHpNOTE3IDQ4aDEzM3YzN0g5MTd6Ii8+PC9nPjwvc3ZnPg==">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTA4MCAyNjEiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDEwODB2MjYwSDB6Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgeD0iLTUwJSIgeT0iLTUwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd09mZnNldE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTMzMzMzMzMzIDAgMCAwIDAgMC45MzMzMzMzMzMgMCAwIDAgMCAwLjkzMzMzMzMzMyAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCA0NGg1MzN2NDZIMjMweiIvPjxyZWN0IHdpZHRoPSIxNzIiIGhlaWdodD0iMTcyIiB4PSIzMCIgeT0iNDQiIGZpbGw9IiNGNkY2RjYiIHJ4PSI0Ii8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCAxMThoMzY5djMwSDIzMHpNMjMwIDE4MmgzMjN2MzBIMjMwek04MTIgMTE1aDIzOHYzOUg4MTJ6TTgwOCAxODRoMjQydjMwSDgwOHpNOTE3IDQ4aDEzM3YzN0g5MTd6Ii8+PC9nPjwvc3ZnPg==">
    </section>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
};
</script>

<style scoped>
.skeleton-block {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background:#f7f7f7;
}
</style>
```

在这个页面里面我们可以根据需要来编写代码，最好使用样式或者`base64`的图片，以减少初始的请求。


#### 3.把我们的骨架屏文件引入到`vue`里面

在`main.js`同级新建一个`Skeleton.js`文件引入的`Skeleton.vue`，并把它引入到`vue`；

``` js
// - Skeleton.js
import Vue from 'vue';
import Skeleton from './Skeleton.vue';

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
});
```

#### 4.配置打包方案

在项目根目录新建`vue.config.js`,在里面配置`vue-skeleton-webpack-plugin`插件，并开启`css`分离；

```js
const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

module.exports = {
  configureWebpack: (config)=>{
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton.js'),
        },
      },
      minimize: true,
      quiet: true,
    })) 
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
};
```

#### 5.在浏览器中查看效果

打开chrome的开发者工具，在`Network`里面找到`throttle`功能，调节网速为“Slow 3G”，刷新页面

<p>
<img :src="$withBase('/skeleton-network.webp')" alt="skeleton-network">
</p>

我们会看到骨架屏先被渲染出来，然后才会有我们的页面渲染出来；

<p>
<img :src="$withBase('/sheleton-result.webp')" alt="sheleton-result">
</p>


#### 6.根据路由来渲染不同的骨架

`vue-skeleton-webpack-plugin`框架是支持根据不同路由来渲染不同的骨架屏的，
附上地址：[vue-skeleton-webpack-plugin插件地址](https://github.com/lavas-project/vue-skeleton-webpack-plugin)

::: tip 总结
这种方法相对来说不易维护，因为一旦UI设计师需要修改的情况下，那相对应的`骨架屏`也需要进行修改
:::

###### 文章转载自：[https://www.jianshu.com/p/cb5717c5948f](https://www.jianshu.com/p/cb5717c5948f)

### 三、自动生成骨架屏的工具

由饿了么团队设计的[page-skeleton-webpack-plugin](https://github.com/ElemeFE/page-skeleton-webpack-plugin)

普通使用方法就直接拿examples/sale的例子用就可以，在例子中安装插件及依赖项
```node
npm install --save-dev page-skeleton-webpack-plugin
npm install --save-dev html-webpack-plugin
```

这个例子使用的是基础配置，没有特别需求的话可以直接使用。
插件会根据 node 环境的不同，进行不同的操作，当 NODE_ENV === ‘development’ 时，插件可以执行生成和写入骨架页面的操作。
在目录下的webpack.config.js文件中进行需要生成骨架屏的路由

::: danger todo
笔者暂时没研究个所以然来，到时候补上~~
:::