import _ from "lodash";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";
import { useEntitySearch } from "@/composables/requests/search/useEntitySearch";

/**
 * Übernimmt den in den Profileinstellungen gewählten Standard-Filter in die Übersicht.
 *
 * Ist ein persönlicher Filter als Standard-Filter gewählt, wird mit diesem direkt gesucht. Bei der
 * Standardeinstellung wird nicht gesucht, damit die Übersicht ohne Filterung leer bleibt.
 */
export function useStandardFilter() {
  const { getStartseitenEinstellung } = useStartseitenEinstellungApi();
  const { savedFilters, loadFilters } = useFilterPersistence();
  const { searchEntities, applyFilter } = useEntitySearch();

  /**
   * Übernimmt beim Laden der Anwendung den gespeicherten Standard-Filter.
   */
  async function applyStandardFilter(): Promise<void> {
    try {
      const { standardFilterId } = await getStartseitenEinstellung();
      if (!_.isNil(standardFilterId)) {
        await uebernehmeStandardFilter(standardFilterId);
      }
    } catch {
      // handleError informiert den Nutzer bereits. Ohne Standard-Filter gilt die Standardeinstellung.
    }
  }

  /**
   * Übernimmt den Standard-Filter mit der gegebenen ID und sucht mit ihm.
   * Ohne ID wird ohne Suche die Standardeinstellung übernommen.
   */
  async function uebernehmeStandardFilter(standardFilterId: string | null): Promise<void> {
    if (_.isNil(standardFilterId)) {
      applyFilter(null);
      return;
    }
    try {
      await loadFilters();
    } catch {
      // handleError informiert den Nutzer bereits.
      return;
    }
    const standardFilter = savedFilters.value.find((filter) => filter.id === standardFilterId);
    if (_.isNil(standardFilter)) {
      return;
    }
    applyFilter(standardFilter);
    await searchEntities("");
  }

  return { applyStandardFilter, uebernehmeStandardFilter };
}
