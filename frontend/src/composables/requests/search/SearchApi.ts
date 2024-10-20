import {
  type SearchQueryAndSortingDto,
  type SearchQueryDto,
  type SearchResultsDto,
  type SuchwortSuggestionsDto,
  SucheApi,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "../ErrorHandler";

// eslint-disable-next-line
export function useSearchApi() {
  const sucheApi = new SucheApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function searchForSearchwordSuggestion(searchQueryDto: SearchQueryDto): Promise<SuchwortSuggestionsDto> {
    const requestParameters = {
      searchQueryDto: searchQueryDto,
    };
    try {
      const response = await sucheApi.searchForSearchwordSuggestion(requestParameters, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function searchForEntities(searchQueryForEntitiesDto: SearchQueryAndSortingDto): Promise<SearchResultsDto> {
    const requestParameters = {
      searchQueryAndSortingDto: searchQueryForEntitiesDto,
    };
    try {
      const response = await sucheApi.searchForEntities(requestParameters, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  return { searchForSearchwordSuggestion, searchForEntities };
}
