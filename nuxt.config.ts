import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      'graphql-client': {
        silent: false,
        clients: {
          default: {
            host: 'http://localhost:1337/graphql',
            token: '5212101334402fbb18d324b740399b0a25eac97c2e4d34e908b8b36591e4ed452fcd6083ef433bdf9987308ac15f9959abc6ea4c5dc38a1346f23e73aa5fe00676209f23b394484d3b98dd9e12f32ebfba7a21851b302e49084efde34fb9edf9420e3f630a3dde0029b98109c59d2d1d189768f69085ed70394dcf03dced5bee'
          }
        }
      }
    }
  },
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
  modules: ["@pinia/nuxt", "nuxt-graphql-client"],
  css: ["~/assets/css/tailwind.css",
    "primevue/resources/themes/saga-blue/theme.css",        //theme
    "primevue/resources/primevue.min.css",                 //core css
    "primeicons/primeicons.css"],
});
