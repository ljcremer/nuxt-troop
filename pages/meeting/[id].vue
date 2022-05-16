<script setup lang="ts">
  import { Timeline } from "vis-timeline/standalone";
  import { DataSet } from "vis-data/standalone";
  const route = useRoute()

  const { data } = await useAsyncData('meetingTimeline', () => GqlGetMeetingTemplate({
    meetingTemplateId: route.params.id
  }))


  const videoRef = ref(null);
  const videoEvents = ref({});

  const mapRef = ref(null);

  const timelineRef = ref(null);
  const timeline = ref(null);
  const timelineEvents = ref([]);
  const mapOptions = ref({
    center: [data.value.meetingTemplate.data.attributes.initialLongitude, data.value.meetingTemplate.data.attributes.initialLatitude],
    zoom: data.value.meetingTemplate.data.attributes.initialZoom,
    flyToOptions: {
      minZoom: 9,
      speed: 1
    }
  });

  for (const singleEvent of data.value.meetingTemplate.data.attributes.timeline) {

    // Timeline items
    const timelineObj = {
      id: singleEvent.id,
      content: singleEvent.description,
      start: new Date(singleEvent.startAt),
      end: singleEvent.startAt === singleEvent.endAt ? null : new Date(singleEvent.endAt),
      active: false,
      location: {}
    }
    if (singleEvent.meeting_place) {
      timelineObj.location = {
        lat: singleEvent.meeting_place.data.attributes.latitude,
        lon: singleEvent.meeting_place.data.attributes.longitude,
        ...singleEvent.meeting_place.data.attributes,
      }
    }
    timelineEvents.value.push(timelineObj)

    // Video Events
    if (singleEvent.videoTriggers) {
      for (const trigger of singleEvent.videoTriggers) {
        videoEvents.value[trigger.seconds.toString()] = {
          action: trigger.event,
          itemId: singleEvent.id
        }
      }
    }
  }

  const videoActions = {
    "map_zoom": ({ itemId }) => {
      timelineEvents.value.forEach((item) => {
        // FlyTo
        mapOptions.value.center = [item.location.lon, item.location.lat]
        mapOptions.value.zoom = 3 // NOT WORKING :(
        item.active = item.id === itemId;
      });
      timeline.value.setSelection(itemId);
      alert('map_zoom action')
    },
    "gallery_popup": () => { alert('gallery_popup action') }
  }

  onMounted(() => {
    timeline.value = new Timeline(timelineRef.value, timelineEvents.value);

    videoRef.value.ontimeupdate = () => {
      const seconds = parseInt(videoRef.value.currentTime, 10)
      const singleEvent = videoEvents.value[seconds]
      if (singleEvent && !singleEvent.triggered) {
        timeline.value.setSelection([]);
        videoActions[singleEvent.action](singleEvent)
      }
    }
    })
</script>

<template>
<div class="h-screen w-screen">
  <div class="text-gray-800 font-semibold">{{ data.meetingTemplate.data.attributes.name }}</div>
  <p>
    {{ data.meetingTemplate.data.attributes.description }}
  </p>
  <div id="timeline" ref="timelineRef"></div>
    <div class="flex flex-row h-screen">
      <div class="w-2/3">
        <client-only>
        <mapbox-map 
          ref="mapRef"
          accessToken="pk.eyJ1Ijoiam9zaG1jZCIsImEiOiJja3NqMmtydmwwaGZ5MnlveDh0MjZpZHpmIn0.EzFXQaLlJrjaJGhKVH-HgA"
          mapStyle="mapbox://styles/joshmcd/cksj2p8p6hfa118qqqdq59lbb"
          :zoom="mapOptions.zoom" 
          :center="mapOptions.center"
          :flyToOptions="mapOptions.flyToOptions"
          >
          <div v-for="item in timelineEvents">
            <mapbox-marker v-if="item.location && item.location.lon && item.location.lat" :lngLat="[item.location.lon, item.location.lat]" close-on-click="false">
              <mapbox-popup>{{ item.location.name }}</mapbox-popup>>
            </mapbox-marker>
          </div>
        </mapbox-map>
        </client-only>
      </div>
      <div class="w-1/3">
        <div v-if="data.meetingTemplate.data.attributes.video">
          <video class="h-72 py-10 mx-auto" ref="videoRef" controls>
            <source :src="data.meetingTemplate.data.attributes.video.data.attributes.url" />
          </video>
        </div>
      </div>
    </div>
  

  
</div>

</template>