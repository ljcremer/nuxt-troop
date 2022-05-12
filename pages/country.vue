<template>
  <div>
    Spain

    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
      </template>
    </Galleria>
  </div>
</template>

// components/FilterMenu.vue
<script setup lang="ts">
const images = [
  {
    "itemImageSrc": "https://res.cloudinary.com/trooptravel/image/upload/v1652275990/thumbnail_pexels_felix_mittermeier_957024_300x200_85f5b958f9.jpg",
    "thumbnailImageSrc": "https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/e_sharpen/remote_media/commons/a/ae/Olympic_flag.jpg",
    "alt": "Description for Image 1",
    "title": "Title 1"
  }, {
    "itemImageSrc": "https://res.cloudinary.com/trooptravel/image/upload/v1652275990/thumbnail_pexels_andrea_piacquadio_3791664_300x200_5bccf772a8.jpg",
    "thumbnailImageSrc": "https://res.cloudinary.com/trooptravel/image/upload/v1652275990/thumbnail_pexels_andrea_piacquadio_3791664_300x200_5bccf772a8.jpg",
    "alt": "Description for Image 1",
    "title": "Title 1"
  }, {
    "itemImageSrc": "https://res.cloudinary.com/trooptravel/image/upload/v1652275990/thumbnail_pexels_andrea_piacquadio_3791664_300x200_5bccf772a8.jpg",
    "thumbnailImageSrc": "https://res.cloudinary.com/trooptravel/image/upload/v1652275990/thumbnail_pexels_andrea_piacquadio_3791664_300x200_5bccf772a8.jpg",
    "alt": "Description for Image 1",
    "title": "Title 1"
  },
];

const responsiveOptions=  [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ]
        
</script>
