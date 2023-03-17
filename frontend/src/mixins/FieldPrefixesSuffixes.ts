import { Component, Vue } from "vue-property-decorator";

@Component
export default class FieldPrefixesSuffixes extends Vue {
  fieldPrefixesSuffixes = {
    squareMeter: "m²",
    percent: "%",
  };
}
