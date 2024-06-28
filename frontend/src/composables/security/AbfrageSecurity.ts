import { computed } from "vue";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
import { useSecurity } from "./Security";
import _ from "lodash";
import { useSearchStore } from "@/stores/SearchStore";

// eslint-disable-next-line
export function useAbfrageSecurity() {
  const security = useSecurity();
  const searchStore = useSearchStore();

  function isEditableWithAnzeigeContextAbfragevariante(
    anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante | undefined,
  ): boolean {
    if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
      return isEditableByAbfrageerstellung.value;
    } else if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
      return isEditableBySachbearbeitung.value;
    }
    return false;
  }

  const isEditableByAbfrageerstellung = computed(() => {
    if (!_.isNil(searchStore.selectedAbfrage)) {
      return (
        security.isRoleAdminOrAbfrageerstellung.value &&
        searchStore.selectedAbfrage.statusAbfrage === StatusAbfrage.Angelegt
      );
    }
    return false;
  });

  const isBedarfsmeldungEditableByAbfrageerstellung = computed(() => {
    if (!_.isNil(searchStore.selectedAbfrage)) {
      return (
        security.isRoleAdminOrAbfrageerstellung.value &&
        searchStore.selectedAbfrage.statusAbfrage === StatusAbfrage.BedarfsmeldungErfolgt
      );
    }
    return false;
  });

  const isEditableBySachbearbeitung = computed(() => {
    if (!_.isNil(searchStore.selectedAbfrage)) {
      return (
        security.isRoleAdminOrSachbearbeitung.value &&
        searchStore.selectedAbfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
      );
    }
    return false;
  });

  const isEditableByBedarfsmeldung = computed(() => {
    if (!_.isNil(searchStore.selectedAbfrage)) {
      return (
        security.isRoleAdminOrBedarfsmeldung.value &&
        searchStore.selectedAbfrage.statusAbfrage === StatusAbfrage.InBearbeitungFachreferate
      );
    }
    return false;
  });

  const isEditableByAdmin = computed(() => security.isRoleAdmin.value);

  return {
    isEditableWithAnzeigeContextAbfragevariante,
    isEditableByAbfrageerstellung,
    isBedarfsmeldungEditableByAbfrageerstellung,
    isEditableBySachbearbeitung,
    isEditableByBedarfsmeldung,
    isEditableByAdmin,
  };
}
