import { SearchQueryAndSortingDtoSortByEnum } from "@/api/api-client/isi-backend/models/SearchQueryAndSortingDto";
import { useSearchApi } from "@/composables/requests/search/SearchApi";
import { useSearchStore } from "@/stores/SearchStore";
import _ from "lodash";

export async function setSearchResultList(): Promise<void> {
  const searchStore = useSearchStore();
  const { searchForEntities } = useSearchApi();

  setTimeout(() => {
    const searchQueryAndSorting = searchStore.requestSearchQueryAndSorting;
    searchQueryAndSorting.page = 1;
    searchQueryAndSorting.pageSize = 20;
    searchForEntities(searchQueryAndSorting).then((searchResults) => {
      searchStore.setSearchResults(_.cloneDeep(searchResults));
    });
  }, 500);
}
