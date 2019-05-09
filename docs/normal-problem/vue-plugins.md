---
pageClass: custom-page-class
---

# vue插件扩展

## vuedraggable的使用
在开发项目项目时候，遇到需要可配置的表单系统，针对不同类型的选项，展示不一样的表单，进行数据编辑。经了解后采用了`vuedraggable`组件

**简介**
<p></p>

`draggable`是基于`Sortable.js`的vue组件，用以实现拖拽功能，可以快速通过该组件实现`元素`之间的拖动，不同列表之间的拖拽联动，支持vue2的过渡动画，可以与项目原来的ui组件相兼容

官网也提供了各种各样的例子：[vuedraggable](https://www.npmjs.com/package/vuedraggable)

感谢[Clew123网友的讲解和介绍](https://blog.csdn.net/zjiang1994/article/details/79809687)

**安装**
``` sh
npm install vuedraggable --save

# yarn add vuedraggable
```

**拖拽例子**
``` vue
<template>
  <div id="app">
    <draggable
      tag="ul"
      v-model="list"
      v-bind="getOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
const list = ["seet you", "good bye", "mock bye"];
export default {
  components: { draggable },
  computed: {
    getOptions() {
      return {
        animation: 200
      };
    }
  },
  data: () => ({
    list: list.map((item, index) => {
      return { name: item, id: index + 1 };
    })
  })
};
</script>

<style>
ul li {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 1px solid #ccc;
  margin-right: 5px;
}
</style>
```
<VueDraggableExampleOne/>
**结合transtion-group**
``` vue
<template>
  <div id="app">
    <draggable
      tag="ul"
      v-model="list"
      v-bind="getOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" name="flip-list">
        <li v-for="item in list" :key="item.id">{{item.name}}</li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
const list = ["seet you", "good bye", "mock bye"];
export default {
  components: { draggable },
  computed: {
    getOptions() {
      return {
        animation: 0
      };
    }
  },
  data: () => ({
    list: list.map((item, index) => {
      return { name: item, id: index + 1 };
    })
  })
};
</script>

<style>
ul li {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 1px solid #ccc;
  margin-right: 5px;
}
.flip-list-move {
  transition: all 0.5s;
}
</style>
```
<VueDraggableExampleTwo/>
