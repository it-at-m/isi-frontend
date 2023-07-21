import { Component, Mixins } from "vue-property-decorator";
import {
  SearchForEntitiesRequest,
  SearchForSearchwordSuggestionRequest,
  SearchQueryForEntitiesDto,
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

  searchForSearchwordSuggestion(singleWordQuery: string): Promise<SuchwortSuggestionsDto> {
    const requestParameters = {
      singleWordQuery: singleWordQuery,
    } as SearchForSearchwordSuggestionRequest;
    return this.sucheApi
      .searchForSearchwordSuggestion(requestParameters, RequestUtils.getGETConfig())
      .then((response) => response)
      .catch((error) => {
        throw this.handleError(false, error);
      });
  }

  searchForEntities(searchQueryForEntitiesDto: SearchQueryForEntitiesDto): Promise<SearchResultsDto> {
    const requestParameters = {
      searchQueryForEntitiesDto: searchQueryForEntitiesDto,
    } as SearchForEntitiesRequest;

    return this.sucheApi
      .searchForEntities(requestParameters, RequestUtils.getGETConfig())
      .then((response) => response)
      .catch((error) => {
        throw this.handleError(false, error);
      });
  }
}
