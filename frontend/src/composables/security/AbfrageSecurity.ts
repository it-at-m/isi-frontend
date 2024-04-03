import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import { useSecurity } from "./Security";
import _ from "lodash";
import { useSearchStore } from "@/stores/SearchStore";

// eslint-disable-next-line
export function useAbfrageSecurity() {
  const { isRoleAdminOrAbfrageerstellung, isRoleAdminOrSachbearbeitung } = useSecurity();
  const { selectedAbfrage } = useSearchStore();

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
    if (!_.isNil(selectedAbfrage)) {
      return isRoleAdminOrAbfrageerstellung() && selectedAbfrage.statusAbfrage === StatusAbfrage.Angelegt;
    }
    return false;
  }

  function isEditableBySachbearbeitung(): boolean {
    if (!_.isNil(selectedAbfrage)) {
      return (
        isRoleAdminOrSachbearbeitung() && selectedAbfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      );
    }
    return false;
  }

  return { isEditableWithAnzeigeContextAbfragevariante, isEditableByAbfrageerstellung, isEditableBySachbearbeitung };
}
