import _ from "lodash";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";
import { mapBackendFilterToFrontend } from "@/composables/requests/filter/useFilterMapping";
import { useSearchStore } from "@/stores/SearchStore";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";

/**
 * Übernimmt den in den Profileinstellungen gewählten Standard-Filter in die Such- und Filtereinstellungen.
 *
 * Es wird bewusst keine Suche ausgelöst. Diese startet der Nutzer per Enter in der Suchzeile
 * oder über "Übernehmen" im Filtermenü.
 */
export function useStandardFilter() {
  const searchStore = useSearchStore();
  const { getStartseitenEinstellung } = useStartseitenEinstellungApi();
  const { savedFilters, loadFilters } = useFilterPersistence();

  async function applyStandardFilter(): Promise<void> {
    try {
      const { standardFilterId } = await getStartseitenEinstellung();
      if (_.isNil(standardFilterId)) {
        return;
      }
      await loadFilters();
      const standardFilter = savedFilters.value.find((filter) => filter.id === standardFilterId);
      if (_.isNil(standardFilter)) {
        return;
      }
      const vorlage = createSearchQueryAndSortingModel();
      const filterEinstellungen = _.defaults(
        mapBackendFilterToFrontend(standardFilter.filterSettings, vorlage),
        vorlage,
      );
      searchStore.setRequestSearchQueryAndSorting(new SearchQueryAndSortingModel(filterEinstellungen));
      searchStore.setFilterActive(true);
      searchStore.setActiveFilterId(standardFilter.id);
    } catch {
      // handleError informiert den Nutzer bereits. Ohne Standard-Filter gilt die Standardeinstellung.
    }
  }

  return { applyStandardFilter };
}
