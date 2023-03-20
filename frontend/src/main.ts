import Vue, { VNode } from "vue";
import Vuetify from "./plugins/vuetify";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "vue-toastification/dist/index.css";
import { convertDateForBackend, convertDateForFrontend } from "@/utils/Formatter";
import VCalendar from "v-calendar";

Vue.config.productionTip = false;

moment.locale(window.navigator.language);

Vue.use(VCalendar, {
  componentPrefix: "vc",
});

new Vue({
  router,
  store: store,
  vuetify: Vuetify,
  render: (h): VNode => h(App),
}).$mount("#app");

/**
 * Formatierung eines Datums für das Backend in das entsprechende YYYY-MM-DD
 *
 * @param string Datum das zu formatieren ist
 */
Vue.prototype.$convertDateForBackend = convertDateForBackend;

/**
 * Formatierung eines Datums für das Frontend in das entsprechende DD.MM.YYYY
 *
 * @param string Datum das zu formatieren ist
 */
Vue.prototype.$convertDateForFrontend = convertDateForFrontend;
