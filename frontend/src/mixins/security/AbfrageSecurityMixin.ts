import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";

@Component
export default class AbfrageSecurityMixin extends Vue {
  public abfrageEditable(): boolean {
    const abfrage: InfrastrukturabfrageModel = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrage) && !_.isNil(abfrage.abfrage.statusAbfrage)) {
      return (
        (this.$store.getters["userinfo/hasRoleAdmin"] || this.$store.getters["userinfo/hasRoleAbfrageerstellung"]) &&
        abfrage.abfrage.statusAbfrage === StatusAbfrage.Angelegt
      );
    }
    return false;
  }
}
