<script setup lang="ts">
  import * as dayjs from 'dayjs'
  import { Timeline } from "vis-timeline/standalone";
  import { DataSet } from "vis-data/standalone";

  const timelineRef = ref(null);
  const timeline = ref(null);
  const timelineEvents = ref(null);
  const map = ref({
    center: [-3.703790, 40.416775],
    zoom: 6,
  });

  const { data } = await useAsyncData('meetingTimeline', () => GqlMeetingTimeline({
    meetingTimelineId: "2"
  }))

  timelineEvents.value = data.value.meetingTimeline.data.attributes.eventsList.map(singleEvent => {
    const obj = {
      id: singleEvent.id,
      content: singleEvent.description,
      start: new Date(singleEvent.startAt),
      end: new Date(singleEvent.endAt),
      active: false,
    }
    if (singleEvent.place) {
      obj.location = {
        lat: singleEvent.place.data.attributes.latitude,
        lon: singleEvent.place.data.attributes.longitude,
        ...singleEvent.place.data.attributes,
      }
    }
    return obj
  })

  onMounted(() => {
    timeline.value = new Timeline(timelineRef.value, timelineEvents.value);

    timeline.value.on('select', function ({ items }) {
      const itemId = items[0]
      const event = timelineEvents.value.find(item => item.id === itemId)
      map.value.center = [event.location.lon, event.location.lat]
      map.value.zoom = 10
    });
  })
</script>

<template>
<div class="h-screen w-screen">
  <div class="text-gray-800 font-semibold">{{ data.meetingTimeline.data.attributes.name }}</div>
  <div ref="timelineRef"></div>
  <client-only>
    <mapbox-map ref="mapRef"
    accessToken="pk.eyJ1Ijoiam9zaG1jZCIsImEiOiJja3NqMmtydmwwaGZ5MnlveDh0MjZpZHpmIn0.EzFXQaLlJrjaJGhKVH-HgA"
  mapStyle="mapbox://styles/joshmcd/cksj2p8p6hfa118qqqdq59lbb"
    :zoom="map.zoom" :center="map.center">
      <div v-for="item in timelineEvents">
        <mapbox-popup v-if=item.location :lng-lat="[item.location.lon, item.location.lat]" close-on-click="false">
          <div>{{ item.location.name }}</div>
        </mapbox-popup>
      </div>
    </mapbox-map>
  </client-only>
</div>

</template>