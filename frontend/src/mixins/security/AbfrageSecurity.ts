import { StatusAbfrage } from "@/api/api-client/isi-backend";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";
import { isRoleAdminOrAbfrageerstellung, isRoleAdminOrSachbearbeitung } from "./Security";
import _ from "lodash";
import store from "@/store/index";

export function isEditableWithAnzeigeContextAbfragevariante(
  anzeigeContextAbfragevariante: AnzeigeContextAbfragevariante | undefined
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
  const abfrage: InfrastrukturabfrageModel = store.getters["search/selectedAbfrage"];
  return !_.isNil(abfrage)
    ? isRoleAdminOrAbfrageerstellung() && abfrage.abfrage?.statusAbfrage === StatusAbfrage.Angelegt
    : false;
}

export function isEditableBySachbearbeitung(): boolean {
  const abfrage: InfrastrukturabfrageModel = store.getters["search/selectedAbfrage"];
  return !_.isNil(abfrage)
    ? isRoleAdminOrSachbearbeitung() && abfrage.abfrage?.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung
    : false;
}
