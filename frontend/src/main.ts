import Vue, { VNode } from "vue";
import Vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "vue-toastification/dist/index.css";
import { convertDateForBackend, convertDateForFrontend } from "@/utils/Formatter";
import VCalendar from "v-calendar";
import { Icon } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import pinia from "./stores";

Vue.config.productionTip = false;

moment.locale(window.navigator.language);

Vue.use(VCalendar, {
  componentPrefix: "vc",
});

new Vue({
  router,
  pinia,
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

// Workaround für einen Bug bei vue2-leaflet, siehe https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing.
delete (Icon.Default.prototype as Icon.Default & { _getIconUrl?: string })._getIconUrl;
Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
