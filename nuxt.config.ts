import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  // plugins: [{ src: '~/plugins/vue-plyr', mode: 'client' }],
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/tailwind.css",
    "primevue/resources/themes/saga-blue/theme.css",        //theme
    "primevue/resources/primevue.min.css",                 //core css
    "primeicons/primeicons.css"],
});
