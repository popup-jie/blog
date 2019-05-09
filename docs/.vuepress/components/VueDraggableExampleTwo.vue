<template>
  <div class="vue-draggable-example-two">
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
  name: "app",
  components: { draggable },
  computed: {
    getOptions() {
      return {
        animation: 0,
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
.vue-draggable-example-two ul li {
  width: 50px;
  height: 50px;
  /* display: inline-block; */
  border: 1px solid #ccc;
  margin-top: 5px;
  list-style-type: none
}
.vue-draggable-example-two .flip-list-move {
  transition: all 0.5s;
}
.vue-draggable-example-two .ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>