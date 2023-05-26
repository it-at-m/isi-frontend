import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";

@Component
export default class AbfrageSecurityMixin extends Vue {
  public isEditableByAbfrageerstellung(): boolean {
    const abfrage: InfrastrukturabfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? (this.$store.getters["userinfo/hasRoleAdmin"] || this.$store.getters["userinfo/hasRoleAbfrageerstellung"]) &&
          abfrage.abfrage.statusAbfrage === StatusAbfrage.Angelegt
      : false;
  }

  public isEditableBySachbearbeitung(): boolean {
    const abfrage: InfrastrukturabfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? (this.$store.getters["userinfo/hasRoleAdmin"] || this.$store.getters["userinfo/hasRoleSachbearbeitung"]) &&
          abfrage.abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      : false;
  }
}
