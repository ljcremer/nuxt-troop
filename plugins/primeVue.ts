//Create nuxt 3 plugin with Primevue components button and inputbox
import PrimeVue from 'primevue/config';
import ContextMenu from 'primevue/contextmenu';
import Galleria from 'primevue/galleria';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue);
    nuxtApp.vueApp.component('ContextMenu', ContextMenu);
    nuxtApp.vueApp.component('Galleria', Galleria);
});
