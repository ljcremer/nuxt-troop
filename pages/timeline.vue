<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="h-screen w-screen">
    <div class="text-gray-800 font-semibold">Timeline</div>
    <div ref="timelineRef"></div>

        <!-- mapStyle="mapbox://styles/joshmcd/cksj2p8p6hfa118qqqdq59lbb" -->

    <client-only>
      <mapbox-map
        accessToken="pk.eyJ1Ijoiam9zaG1jZCIsImEiOiJja3NqMmtydmwwaGZ5MnlveDh0MjZpZHpmIn0.EzFXQaLlJrjaJGhKVH-HgA"
mapStyle="mapbox://styles/joshmcd/cksj2p8p6hfa118qqqdq59lbb"
        :zoom="mapZoom" :center="mapCenter" @loaded="mapPromise($event)">
        <div v-for="item in itemRef">
          <mapbox-marker v-if=item.location :lng-lat="[item.location.lon, item.location.lat]">
            <template #icon>
              <slot>
                <div @click="clickMarker(item)" :class="item.active ? 'bg-green-500' : 'bg-blue-500'"
                  class="h-5 w-5 rounded-full">
                  {{ item.location.lat }}</div>
              </slot>
            </template>
          </mapbox-marker>
          <div v-if="item.bookmarks && item.active">
            <div v-for="bookmark in item.bookmarks">
              <mapbox-marker v-if=item.bookmarks :lng-lat="[bookmark.location.lon, bookmark.location.lat]">
                <template #icon>
                  <slot>
                    <div class="bg-red-800 h-4 w-4 rounded-full">
                    </div>
                  </slot>
                </template>
              </mapbox-marker>
            </div>
          </div>
        </div>
      </mapbox-map>

    </client-only>

  </div>
</template>

<script setup lang="ts">

import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data/standalone"; //https://visjs.github.io/vis-data/data/dataset.html`;
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from 'mapbox-gl';
// import {MapboxDirections} from '@mapbox/mapbox-gl-directions';
import { ref, onMounted, computed, watch, watchEffect } from "vue";

// var directions = new MapboxDirections({
//   accessToken: 'YOUR-MAPBOX-ACCESS-TOKEN',
//   unit: 'metric',
//   profile: 'mapbox/cycling'
// });


const mapZoom = ref(10);

const mapCenter = ref([-3.703790, 40.416775]);
// const mapCenter = ref([40.816775, -3.703790]);
const timeline = ref();
const map = ref(null);
const mapPromise = async ($map: any) => {
  $map.addSource("iso", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  $map.addLayer(
    {
      id: "isoLayer",
      type: "fill",
      source: "iso",
      layout: {},
      paint: {
        "fill-color": "#5a3fc0",
        "fill-opacity": 0.3,
      },
    },
    "poi-label"
  );



  // console.log($map);
  map.value = $map;
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
    active: false,
    location: {
      lat: 40.416775,
      lon: -3.703790
    },
    zoom: 12,

    editable: {
      add: true, // add new items by double tapping
      updateTime: true, // drag items horizontally
      updateGroup: true, // drag items from one group to another
      remove: true, // delete an item by tapping the delete button top right
      overrideItems: false, // allow these options to override item.editable
    },
    bookmarks: [
      {
        id: "b1",
        location: {
          lat: 40.436775,
          lon: -3.703790
        },
      },
      {
        id: "b2",
        location: {
          lat: 40.426775,
          lon: -3.733790
        },
      },
      {
        id: "b3",
        location: {
          lat: 40.406775,
          lon: -3.683790
        },
      },
    ],
  },
  {
    id: 2, content: "item 2222", start: "2014-04-12", end: "2014-04-13",
    location: {
      lat: 41.416775,
      lon: -3.703790
    },
    zoom: 9,
  },
  {
    id: 3, content: "item 3a", start: "2014-04-14", end: "2014-04-15", location: {
      lat: 40.416775,
      lon: -2.703790
    },
    zoom: 13,
  },
  {
    id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19",
    location: {
      lat: 40.816775,
      lon: -3.703790
    },
    zoom: 11,
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
  $event.active = true;
  console.log(timelineRef);
  timeline.value.setSelection($event.id);

  itemRef.value.forEach((item) => {
    item.active = item.id === $event.id;
  });

  getIso(map.value, $event.location.lat, $event.location.lon, 20)

};

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lhcyIsImEiOiJja3ppZGRlYmIzbTJ5MnZuOXJtbzlmODMwIn0.Ce4bOkoz_VcMEiDXZ5GFTA";
const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
let profile = "cycling";


async function getIso($map: any, lat: number, lon: number, minutes: 200) {
  console.log("getIso")

  const query = await fetch(
    `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
    { method: "GET" }
  );
  const data = await query.json();
  var isoBuffA = data;

  console.log(data);
  console.log(isoBuffA);
  // Set the 'iso' source's data to what's returned by the API query
  $map.getSource("iso").setData(data);
}

</script>
