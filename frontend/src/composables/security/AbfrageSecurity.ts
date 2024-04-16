import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
import { useSecurity } from "./Security";
import _ from "lodash";
import { useSearchStore } from "@/stores/SearchStore";

// eslint-disable-next-line
export function useAbfrageSecurity() {
  const security = useSecurity();
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
      return security.isRoleAdminOrAbfrageerstellung() && selectedAbfrage.statusAbfrage === StatusAbfrage.Angelegt;
    }
    return false;
  }

  function isBedarfsmeldungEditableByAbfrageerstellung(): boolean {
    if (!_.isNil(selectedAbfrage)) {
      return (
        security.isRoleAdminOrAbfrageerstellung() &&
        selectedAbfrage.statusAbfrage === StatusAbfrage.BedarfsmeldungErfolgt
      );
    }
    return false;
  }

  function isEditableBySachbearbeitung(): boolean {
    if (!_.isNil(selectedAbfrage)) {
      return (
        security.isRoleAdminOrSachbearbeitung() &&
        selectedAbfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      );
    }
    return false;
  }

  function isEditableByBedarfsmeldung(): boolean {
    if (!_.isNil(selectedAbfrage)) {
      return (
        security.isRoleAdminOrBedarfsmeldung() &&
        selectedAbfrage.statusAbfrage === StatusAbfrage.InBearbeitungFachreferate
      );
    }
    return false;
  }

  function isEditableByAdmin(): boolean {
    return security.isRoleAdmin();
  }

  return {
    isEditableWithAnzeigeContextAbfragevariante,
    isEditableByAbfrageerstellung,
    isBedarfsmeldungEditableByAbfrageerstellung,
    isEditableBySachbearbeitung,
    isEditableByBedarfsmeldung,
    isEditableByAdmin,
  };
}
