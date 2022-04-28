<template>
  <div>
    List
    {{ filtersList }}
  </div>
</template>

// components/FilterMenu.vue
<script setup lang="ts">
import { useTemplatesStore } from "~/store/template";

const filtersStore = useTemplatesStore();
const filtersList = filtersStore.getTemplatesList;
</script>
getTemplatesList
