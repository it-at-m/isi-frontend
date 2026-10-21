import { onUnmounted, ref, watch, watchEffect, type Ref } from "vue";
import _ from "lodash";

/**
 * Titel des Browsertabs, wenn kein Objekt geöffnet ist. Entspricht dem Titel in der index.html.
 */
export const DEFAULT_TAB_TITLE = "ISI";

export interface TabTitleBezeichnung {
  /**
   * Titel für ein noch nicht gespeichertes Objekt, z.B. "Neue Abfrage".
   */
  neu: string;
  /**
   * Art des Objekts, die dem Namen eines gespeicherten Objekts vorangestellt wird, z.B. "Abfrage".
   */
  praefix: string;
}

export const TAB_TITLE_ABFRAGE: TabTitleBezeichnung = { neu: "Neue Abfrage", praefix: "Abfrage" };
export const TAB_TITLE_BAUVORHABEN: TabTitleBezeichnung = { neu: "Neues Bauvorhaben", praefix: "Vorhaben" };
export const TAB_TITLE_INFRASTRUKTUREINRICHTUNG: TabTitleBezeichnung = {
  neu: "Neue Infrastruktureinrichtung",
  praefix: "Einrichtung",
};

/**
 * Ermittelt den Titel des Browsertabs für ein Objekt.
 *
 * Solange der Name eines gespeicherten Objekts noch nicht geladen ist, wird der Standardtitel verwendet.
 */
export function createTabTitle(bezeichnung: TabTitleBezeichnung, name: string | undefined, isNew: boolean): string {
  if (isNew) {
    return bezeichnung.neu;
  }
  const trimmedName = _.trim(name);
  return _.isEmpty(trimmedName) ? DEFAULT_TAB_TITLE : `${bezeichnung.praefix}: ${trimmedName}`;
}

/**
 * Zeigt das geöffnete Objekt im Titel des Browsertabs an und setzt beim Verlassen den Standardtitel.
 *
 * Der Name wird nur übernommen, wenn das Objekt ausgetauscht wird, also beim Laden und Speichern.
 * Die Formulare ändern das Objekt dagegen direkt, weshalb Eingaben erst nach dem Speichern im Titel erscheinen.
 *
 * @param objekt das in der View geöffnete Objekt.
 * @param getName liefert den Namen des Objekts.
 * @param isNew kennzeichnet ein noch nicht gespeichertes Objekt.
 * @param bezeichnung Texte für die Art des Objekts.
 */
export function useTabTitle<T>(
  objekt: Ref<T>,
  getName: (objekt: T) => string | undefined,
  isNew: Ref<boolean>,
  bezeichnung: TabTitleBezeichnung,
): void {
  const gespeicherterName = ref<string | undefined>();

  watch(objekt, (neuesObjekt) => (gespeicherterName.value = getName(neuesObjekt)), { immediate: true });

  watchEffect(() => {
    document.title = createTabTitle(bezeichnung, gespeicherterName.value, isNew.value);
  });

  onUnmounted(() => {
    document.title = DEFAULT_TAB_TITLE;
  });
}
