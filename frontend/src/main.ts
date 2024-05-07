import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import pinia from "./plugins/pinia";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  locale: {
    locale: "de",
  },
});

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
