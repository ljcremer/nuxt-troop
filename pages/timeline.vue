<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="text-gray-800 font-semibold troop">Timeline</div>
    <div ref="timelineRef">Some text</div>
    <div>{{ refItems }}</div>
    <client-only>
      <mapbox-map
        accessToken="pk.eyJ1Ijoiam9zaG1jZCIsImEiOiJja3NqMmtydmwwaGZ5MnlveDh0MjZpZHpmIn0.EzFXQaLlJrjaJGhKVH-HgA"
      >
      </mapbox-map>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data/standalone"; //https://visjs.github.io/vis-data/data/dataset.html
import { ref, onMounted, computed, watch, watchEffect } from "vue";
import { MapboxMap } from "vue-mapbox-ts";

const timelineRef = ref(null);
const itemRef = ref([
  {
    id: 1,
    content: "",
    start: "2014-04-10",
    end: "2014-04-19",
    className: "troop",
    editable: {
      add: true, // add new items by double tapping
      updateTime: true, // drag items horizontally
      updateGroup: true, // drag items from one group to another
      remove: true, // delete an item by tapping the delete button top right
      overrideItems: false, // allow these options to override item.editable
    },
  },
  { id: 2, content: "item 2", start: "2014-04-14" },
  { id: 3, content: "item 3", start: "2014-04-18" },
  { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
  { id: 5, content: "item 5", start: "2014-04-25" },
  { id: 6, content: "item 6", start: "2014-04-27", type: "point" },
]);
// Create a DataSet (allows two way data-binding)
var items2 = new DataSet(itemRef.value);
var items: any = ref(
  new DataSet([
    {
      id: 1,
      content: "",
      start: "2014-04-10",
      end: "2014-04-19",
      className: "troop",
      editable: {
        add: true, // add new items by double tapping
        updateTime: true, // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: true, // delete an item by tapping the delete button top right
        overrideItems: false, // allow these options to override item.editable
      },
    },
    { id: 2, content: "item 2", start: "2014-04-14" },
    { id: 3, content: "item 3", start: "2014-04-18" },
    { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
  ])
);

// Configuration for the Timeline
var options = {};

const refItems = computed(() => {
  return items.value.get();
});

watchEffect(() => console.log(items.value.get()));

watch(refItems, (value) => {
  console.log(refItems.value);
  items.value.remove(5);
  items.value.remove(6);
  items.value.add([
    { id: 5, content: "item 5", start: "2014-04-25" },
    { id: 6, content: "item 6", start: "2014-04-27", type: "point" },
  ]);
});

onMounted(() => {
  // Create a Timeline
  var timeline = new Timeline(timelineRef.value, items.value, options);
  timeline.on("select", function (properties) {
    console.log("selected items: " + properties.items);
    console.log(items.value.get(1));
  });
});
</script>
