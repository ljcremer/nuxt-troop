<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="h-screen w-screen">
    <div class="text-gray-800 font-semibold">Timeline</div>
    <div ref="timelineRef"></div>



    <client-only>
      <mapbox-map
        accessToken="pk.eyJ1Ijoiam9zaG1jZCIsImEiOiJja3NqMmtydmwwaGZ5MnlveDh0MjZpZHpmIn0.EzFXQaLlJrjaJGhKVH-HgA"
        :zoom="mapZoom" :center="mapCenter" @loaded="mapPromise($event)">
        <div v-for="item in itemRef">
          <mapbox-marker v-if=item.location :lng-lat="[item.location.lat, item.location.lon]">
            <template #icon>
              <slot>
                <div @click="clickMarker(item)" :class="item.active ? 'bg-green-300' : 'bg-red-300'" class="h-10 w-10 rounded-full">
                  {{ item.location.lat }}</div>
              </slot>
            </template>
          </mapbox-marker>
        </div>
      </mapbox-map>

    </client-only>

  </div>
</template>

<script setup lang="ts">

import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data/standalone"; //https://visjs.github.io/vis-data/data/dataset.html
import { ref, onMounted, computed, watch, watchEffect } from "vue";

const mapZoom = ref(0);
const mapCenter = ref([0, 0]);
const timeline = ref();
const map = ref(null);
const mapPromise = async ($map: any) => {
  // console.log($map);
  // map.value = $map;
  // map.value.flyTo({
  //   // These options control the ending camera position: centered at
  //   // the target, at zoom level 9, and north up.
  //   center: [5, 5],
  //   zoom: 9,
  //   bearing: 0,

  //   // These options control the flight curve, making it move
  //   // slowly and zoom out almost completely before starting
  //   // to pan.
  //   speed: 1, // make the flying slow
  //   curve: 1, // change the speed at which it zooms out

  //   // This can be any easing function: it takes a number between
  //   // 0 and 1 and returns another number between 0 and 1.
  //   easing: (t) => t,

  //   // this animation is considered essential with respect to prefers-reduced-motion
  //   essential: true
  // });
}

const timelineRef = ref(null);
const itemRef = ref([
  {
    id: 1,
    content: "111",
    start: "2014-04-10",
    end: "2014-04-11",
    className: "troop",
    active: true,
    location: {
      lat: 0,
      lon: 0
    },
    zoom: 4,

    editable: {
      add: true, // add new items by double tapping
      updateTime: true, // drag items horizontally
      updateGroup: true, // drag items from one group to another
      remove: true, // delete an item by tapping the delete button top right
      overrideItems: false, // allow these options to override item.editable
    },
  },
  {
    id: 2, content: "item 2222", start: "2014-04-12", end: "2014-04-13",
    location: {
      lat: 2,
      lon: 2
    },
    zoom: 6,
  },
  {
    id: 3, content: "item 3a", start: "2014-04-14", end: "2014-04-15", location: {
      lat: 4,
      lon: 4
    },
    zoom: 1,
  },
  {
    id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19",
    location: {
      lat: 6,
      lon: 6
    },
    zoom: 3,
  },
]);
// Create a DataSet (allows two way data-binding)
var items: any = ref(
  new DataSet(itemRef.value)
);

// Configuration for the Timeline
var options = {};

const refItems = computed(() => {
  return items.value.get();
});

watchEffect(() => console.log(items.active));

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
  timeline.value = new Timeline(timelineRef.value, items.value, options);
  timeline.value.on("select", function (properties) {
    console.log("selected item: " + properties.items);
    console.log(properties)
    console.log(items.value.get(properties.items));
    itemRef.value.forEach((item) => {
      if (item.id == properties.items) {
          // mapCenter.value = [item.location.lat, item.location.lon];
         mapZoom.value = item.zoom;

        // console.log("FLYTO");
        // map.value.flyTo({
        //   center: [item.location.lat, item.location.lon],
        //   zoom: item.zoom,
        //   speed: 1, // make the flying slow
        // });

      }
      item.active = item.id === properties.items[0];
      console.log(item.id, item.active, item.id === properties.items);
    });

  });
});

const clickMarker = async ($event: any) => {
  console.log(timelineRef);
  timeline.value.setSelection($event.id);

};


</script>
