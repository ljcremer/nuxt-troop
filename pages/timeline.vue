<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="text-gray-800 font-semibold troop">Timeline</div>
  <div ref="timelineRef">Some text</div>
</template>

<script setup lang="ts">
import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data/standalone";
import { ref, onMounted } from "vue";

const timelineRef = ref(null);

// Create a DataSet (allows two way data-binding)
var items = new DataSet([
  {
    id: 1,
    content: "",
    start: "2014-04-10",
    end: "2014-04-19",
    className: "troop",
    class: "bg-red-500",
  },
  { id: 2, content: "item 2", start: "2014-04-14" },
  { id: 3, content: "item 3", start: "2014-04-18" },
  { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
  { id: 5, content: "item 5", start: "2014-04-25" },
  { id: 6, content: "item 6", start: "2014-04-27", type: "point" },
]);

// Configuration for the Timeline
var options = {};

onMounted(() => {
  // Create a Timeline
  var timeline = new Timeline(timelineRef.value, items, options);
});
</script>
