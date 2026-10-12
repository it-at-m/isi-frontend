import { SearchQueryAndSortingDtoSortByEnum } from "@/api/api-client/isi-backend/models/SearchQueryAndSortingDto";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useSearchStore } from "@/stores/SearchStore";
import SearchQueryAndSortingModel from "@/types/model/search/SearchQueryAndSortingModel";
import _ from "lodash";

/**
 * Aktualisiert beim Betreten der Startseite die Suchergebnisse der zuletzt ausgeführten Suche,
 * damit z.B. Änderungen an einem zuvor geöffneten Objekt in der Übersicht sichtbar werden.
 *
 * Beim Laden der Anwendung wurde noch keine Suche ausgeführt. Die Übersicht bleibt dann leer,
 * bis der Nutzer die Suche aktiv auslöst.
 */
export async function setSearchResultList(): Promise<void> {
  const searchStore = useSearchStore();
  const { searchForEntities } = useSearchApi();

  if (
    _.isNil(searchStore.searchResults.searchResults) ||
    new SearchQueryAndSortingModel(searchStore.requestSearchQueryAndSorting).allObjectTypesDeselected()
  ) {
    return;
  }

  setTimeout(() => {
    const searchQueryAndSorting = searchStore.requestSearchQueryAndSorting;
    searchQueryAndSorting.page = 1;
    searchQueryAndSorting.pageSize = 20;
    searchForEntities(searchQueryAndSorting).then((searchResults) => {
      searchStore.setSearchResults(_.cloneDeep(searchResults));
    });
  }, 500);
}
