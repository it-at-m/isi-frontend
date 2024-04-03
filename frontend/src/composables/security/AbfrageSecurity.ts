import { StatusAbfrage } from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import { useSecurity } from "./Security";
import _ from "lodash";
import { useSearchStore } from "@/stores/SearchStore";

export function useAbfrageSecurity() {
  const { isRoleAdminOrAbfrageerstellung, isRoleAdminOrSachbearbeitung } = useSecurity();
  const searchStore = useSearchStore();
  const abfrage: AbfrageModel | undefined = searchStore.selectedAbfrage;

  function isEditableWithAnzeigeContextAbfragevariante(
    anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante | undefined,
  ): boolean {
    if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
      return isEditableByAbfrageerstellung();
    } else if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
      return isEditableBySachbearbeitung();
    }
    return false;
  }

  function isEditableByAbfrageerstellung(): boolean {
    if (!_.isNil(abfrage)) {
      return isRoleAdminOrAbfrageerstellung() && abfrage.statusAbfrage === StatusAbfrage.Angelegt;
    }
    return false;
  }

  function isEditableBySachbearbeitung(): boolean {
    if (!_.isNil(abfrage)) {
      return isRoleAdminOrSachbearbeitung() && abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung;
    }
    return false;
  }

  return { isEditableWithAnzeigeContextAbfragevariante, isEditableByAbfrageerstellung, isEditableBySachbearbeitung };
}
