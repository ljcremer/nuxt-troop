<template>
  <div>

    <Head>
      <Script src="https://embed.videodelivery.net/embed/sdk.latest.js"></Script>
    </Head>
    <iframe
  src="https://iframe.videodelivery.net/$VIDEOID"
  style="border: none"
  height="720"
  width="1280"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
  id="stream-player"
></iframe>
    <!-- <client-only> -->
    <!-- <vue-plyr>
        <video>
          <source size="720" src="https://www.youtube.com/watch?v=XHvmX3FhTwU" type="video/mp4" />
          <source size="1080" src="https://www.youtube.com/watch?v=XHvmX3FhTwU" type="video/mp4" />
        </video>
      </vue-plyr>
    </client-only> -->
    <!-- <VideoStream controls src="YOUR_VIDEO_ID_OR_SIGNED_URL"></VideoStream> -->
    <client-only>
      <!-- <div ref="plyerRef" src="https://www.youtube.com/watch?v=XHvmX3FhTwU" id="player" controls
        data-plyr-config='{ "title": "Example Title" }'>
        </div> -->
    </client-only>
  </div>
</template>

<script setup lang="ts">
// import Plyr from 'plyr';
// const plyerRef = ref(null);


  const player = Stream(document.getElementById('stream-player'));
  player.addEventListener('play', () => {
    console.log('playing!');
  });
  player.play().catch(() => {
    console.log('playback failed, muting to try again');
    player.muted = true;
    player.play();
  });

onMounted(() => {
  // Create a Timeline
  // const player = new Plyr(plyerRef.value);


});


// import { VideoStream } from 'stream-vue'
// import vuePlyr from '~~/plugins/vuePlyr';
</script>
