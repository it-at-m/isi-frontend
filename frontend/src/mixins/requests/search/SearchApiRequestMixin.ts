import { Component, Mixins } from "vue-property-decorator";
import {
  SearchForEntitiesRequest,
  SearchForSearchwordSuggestionRequest,
  SearchQueryAndSortingDto,
  SearchQueryDto,
  SearchResultsDto,
  SucheApi,
  SuchwortSuggestionsDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class SearchApiRequestMixin extends Mixins(ErrorHandler) {
  private sucheApi: SucheApi;

  constructor() {
    super();
    this.sucheApi = new SucheApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  public searchForSearchwordSuggestion(searchQueryDto: SearchQueryDto): Promise<SuchwortSuggestionsDto> {
    const requestParameters = {
      searchQueryDto: searchQueryDto,
    } as SearchForSearchwordSuggestionRequest;
    return this.sucheApi
      .searchForSearchwordSuggestion(requestParameters, RequestUtils.getGETConfig())
      .then((response) => response)
      .catch((error) => {
        throw this.handleError(false, error);
      });
  }

  public searchForEntities(searchQueryForEntitiesDto: SearchQueryAndSortingDto): Promise<SearchResultsDto> {
    const requestParameters = {
      searchQueryAndSortingDto: searchQueryForEntitiesDto,
    } as SearchForEntitiesRequest;

    return this.sucheApi
      .searchForEntities(requestParameters, RequestUtils.getGETConfig())
      .then((response) => response)
      .catch((error) => {
        throw this.handleError(false, error);
      });
  }
}
