import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import _ from "lodash";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
import { useSearchStore } from "@/stores/SearchStore";

@Component
export default class AbfrageSecurityMixin extends Mixins(SecurityMixin) {
  private searchStore = useSearchStore();

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
    this.searchStore.selectedAbfrage;
    const abfrage: AbfrageModel = this.searchStore.selectedAbfrage!;
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrAbfrageerstellung() && abfrage.statusAbfrage === StatusAbfrage.Angelegt
      : false;
  }

  public isBedarfsmeldungEditableByAbfrageerstellung(): boolean {
    const abfrage: AbfrageModel = this.searchStore.selectedAbfrage!;
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrAbfrageerstellung() && abfrage.statusAbfrage === StatusAbfrage.BedarfsmeldungErfolgt
      : false;
  }

  public isEditableBySachbearbeitung(): boolean {
    const abfrage: AbfrageModel = this.searchStore.selectedAbfrage!;
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrSachbearbeitung() && abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      : false;
  }

  public isEditableByBedarfsmeldung(): boolean {
    const abfrage: AbfrageModel = this.searchStore.selectedAbfrage!;
    return !_.isNil(abfrage)
      ? this.isRoleAdminOrBedarfsmeldung() && abfrage.statusAbfrage === StatusAbfrage.InBearbeitungFachreferate
      : false;
  }

  public isEditableByAdmin(): boolean {
    const abfrage: AbfrageModel = this.searchStore.selectedAbfrage!;
    return !_.isNil(abfrage) ? this.isRoleAdmin() : false;
  }
}
