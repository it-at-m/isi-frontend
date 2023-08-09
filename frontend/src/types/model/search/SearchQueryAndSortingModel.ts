import { SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchQueryAndSortingModel extends SearchQueryAndSortingDto {}
class SearchQueryAndSortingModel {
  constructor(searchQueryAndSortingDto: SearchQueryAndSortingDto) {
    Object.assign(this, searchQueryAndSortingDto, {});
  }
}
export { SearchQueryAndSortingModel as default };
