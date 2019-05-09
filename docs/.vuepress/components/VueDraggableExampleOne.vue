<template>
  <div class="vue-draggable-example-one">
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
        animation: 200,
        ghostClass: 'ghost'
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
.vue-draggable-example-one ul li {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 1px solid #ccc;
  margin-right: 5px;
}
.vue-draggable-example-one .ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

</style>