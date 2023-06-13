import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import _ from "lodash";
import SecurityMixin from "@/mixins/security/SecurityMixin";

@Component
export default class AbfrageSecurityMixin extends Mixins(SecurityMixin) {
  public isEditableByAbfrageerstellung(): boolean {
    const abfrage: InfrastrukturabfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrAbfrageerstellung() && abfrage.abfrage?.statusAbfrage === StatusAbfrage.Angelegt
      : false;
  }

  public isEditableBySachbearbeitung(): boolean {
    const abfrage: InfrastrukturabfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrSachbearbeitung() &&
          abfrage.abfrage?.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      : false;
  }
}
