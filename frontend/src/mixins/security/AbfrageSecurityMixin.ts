import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import _ from "lodash";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";

@Component
export default class AbfrageSecurityMixin extends Mixins(SecurityMixin) {
  public isEditableWithAnzeigeContextAbfragevariante(
    anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante | undefined,
  ): boolean {
    let isEditable = false;
    if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
      isEditable = this.isEditableByAbfrageerstellung();
    } else if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
      isEditable = this.isEditableBySachbearbeitung();
    }
    return isEditable;
  }

  public isEditableByAbfrageerstellung(): boolean {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrAbfrageerstellung() && abfrage.statusAbfrage === StatusAbfrage.Angelegt
      : false;
  }

  public isEditableBySachbearbeitung(): boolean {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrSachbearbeitung() && abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      : false;
  }

  public isEditableByBedarfsmeldung(): boolean {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrBedarfsmeldung() && abfrage.statusAbfrage === StatusAbfrage.InBearbeitungFachreferate
      : false;
  }

  public isEditableByAdmin(): boolean {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    return !_.isNil(abfrage) ? this.isRoleAdmin() : false;
  }
}
