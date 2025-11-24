import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";
import { toast, options } from "./plugins/toast";

createApp(App).use(vuetify).use(router).use(pinia).use(toast, options).mount("#app");
