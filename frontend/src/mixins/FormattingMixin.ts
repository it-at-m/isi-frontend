import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormattingMixin extends Vue {
  formatGesammtsumme(summe: number): string {
    return summe.toFixed(2).toString().replace(".", ",");
  }
}
