import _ from "lodash";
import { useToast } from "vue-toastification";
import type { FilterSettingsDto } from "@/api/api-client/isi-backend";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { mapBackendFilterToFrontend } from "@/composables/requests/filter/useFilterMapping";
import { useSearchStore } from "@/stores/SearchStore";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import { createSearchQueryAndSortingModel } from "@/utils/Factories";

export const HINWEIS_KEINE_ENTITAET_MARKIERT =
  "Es wurde keine Entität für die Suche markiert. Bitte wählen Sie in den Such- und Filtereinstellungen mindestens einen Objekttyp aus und klicken Sie auf „Übernehmen“.";
export const HINWEIS_KEINE_SUCHTREFFER = "Es wurden keine Suchtreffer gefunden";

const PAGE_SIZE = 20;

export interface PersoenlicherFilter {
  id: string;
  name: string;
  filterSettings: FilterSettingsDto;
}

export function isKeineEntitaetMarkiert(searchQueryAndSorting: SearchQueryAndSortingModel): boolean {
  return new SearchQueryAndSortingModel(searchQueryAndSorting).allObjectTypesDeselected();
}

/**
 * Führt die Suche der Übersicht aus und übernimmt persönliche Filter in die Such- und Filtereinstellungen.
 *
 * Wird von der Suchleiste und vom Standard-Filter aus den Profileinstellungen genutzt, damit beide
 * dieselben Einstellungen verwenden und den Nutzer gleich informieren.
 */
export function useEntitySearch() {
  const searchStore = useSearchStore();
  const toast = useToast();
  const { searchForEntities } = useSearchApi();

  /**
   * Sucht ab der ersten Seite mit den im Store hinterlegten Such- und Filtereinstellungen.
   *
   * @param searchQuery der in der Suchzeile eingegebene Suchbegriff.
   */
  async function searchEntities(searchQuery: string): Promise<void> {
    const searchQueryAndSorting = _.cloneDeep(searchStore.requestSearchQueryAndSorting);
    searchQueryAndSorting.searchQuery = searchQuery;
    searchQueryAndSorting.page = 1;
    searchQueryAndSorting.pageSize = PAGE_SIZE;
    searchStore.setRequestSearchQueryAndSorting(new SearchQueryAndSortingModel(searchQueryAndSorting));
    if (isKeineEntitaetMarkiert(searchQueryAndSorting)) {
      // Ohne markierte Entität lehnt das Backend die Suche ab. Der Nutzer erhält stattdessen eine Handlungsanweisung.
      searchStore.setSearchResults({ searchResults: [], page: 1, numberOfPages: 0 });
      toast.warning(HINWEIS_KEINE_ENTITAET_MARKIERT);
      return;
    }
    try {
      const searchResults = await searchForEntities(searchQueryAndSorting);
      searchStore.setSearchResults(_.cloneDeep(searchResults));
      if (_.isEmpty(searchResults.searchResults)) {
        toast.info(HINWEIS_KEINE_SUCHTREFFER);
      }
    } catch {
      // handleError informiert den Nutzer bereits.
    }
  }

  /**
   * Übernimmt einen persönlichen Filter in die Such- und Filtereinstellungen, ohne zu suchen.
   * Ohne Filter wird die Standardeinstellung übernommen.
   */
  function applyFilter(filter: PersoenlicherFilter | null): void {
    const vorlage = createSearchQueryAndSortingModel();
    if (_.isNil(filter)) {
      searchStore.setRequestSearchQueryAndSorting(vorlage);
      searchStore.setFilterActive(false);
      searchStore.setActiveFilterId(null);
      return;
    }
    // Nicht im Filter enthaltene Werte entsprechen der Standardeinstellung.
    const filterEinstellungen = _.defaults(mapBackendFilterToFrontend(filter.filterSettings, vorlage), vorlage);
    searchStore.setRequestSearchQueryAndSorting(new SearchQueryAndSortingModel(filterEinstellungen));
    searchStore.setFilterActive(true);
    searchStore.setActiveFilterId(filter.id);
  }

  return { searchEntities, applyFilter };
}
