import Vue from "vue";
import Toast from "vue-toastification";

Vue.use(Toast, {
  position: "bottom-left",
  transition: "Vue-Toastification__fade",
  closeOnClick: false,
});

export default class Toaster {
  /**
   *
   * @param message übergibt die nachricht an den toast
   * @param type optional wenn er nicht übergeben wird, wird ein toast des typs info erzeugt
   */
  static toast(message: string, type: "success" | "info" | "error" | "warning" = "info"): void {
    Vue.$toast[type](message);
  }
}
