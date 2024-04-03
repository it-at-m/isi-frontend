import { StatusAbfrage } from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import { isRoleAdminOrAbfrageerstellung, isRoleAdminOrSachbearbeitung } from "./Security";
import _ from "lodash";
import { useSearchStore } from "@/stores/SearchStore";

export function isEditableWithAnzeigeContextAbfragevariante(
  anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante | undefined,
): boolean {
  let isEditable = false;
  if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
    isEditable = isEditableByAbfrageerstellung();
  } else if (anzeigeContextAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
    isEditable = isEditableBySachbearbeitung();
  }
  return isEditable;
}

export function isEditableByAbfrageerstellung(): boolean {
  const searchStore = useSearchStore();
  const abfrage: AbfrageModel = searchStore.selectedAbfrage!;
  return !_.isNil(abfrage)
    ? isRoleAdminOrAbfrageerstellung() && abfrage.statusAbfrage === StatusAbfrage.Angelegt
    : false;
}

export function isEditableBySachbearbeitung(): boolean {
  const searchStore = useSearchStore();
  const abfrage: AbfrageModel = searchStore.selectedAbfrage!;
  return !_.isNil(abfrage)
    ? isRoleAdminOrSachbearbeitung() && abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
    : false;
}
