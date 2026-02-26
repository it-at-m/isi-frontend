# SucheApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**searchForEntities**](SucheApi.md#searchforentities) | **POST** /search/entities | Suche nach Entitäten für die im Request-Body gegebene Suchanfrage. |
| [**searchForSearchwordSuggestion**](SucheApi.md#searchforsearchwordsuggestion) | **POST** /search/searchword-suggestion | Suche nach Suchwortvorschläge für das im Request-Body gegebene Suchanfrage. |



## searchForEntities

> SearchResultsDto searchForEntities(searchQueryAndSortingDto)

Suche nach Entitäten für die im Request-Body gegebene Suchanfrage.

### Example

```ts
import {
  Configuration,
  SucheApi,
} from '';
import type { SearchForEntitiesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SucheApi();

  const body = {
    // SearchQueryAndSortingDto
    searchQueryAndSortingDto: ...,
  } satisfies SearchForEntitiesRequest;

  try {
    const data = await api.searchForEntities(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **searchQueryAndSortingDto** | [SearchQueryAndSortingDto](SearchQueryAndSortingDto.md) |  | |

### Return type

[**SearchResultsDto**](SearchResultsDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Es wurde eine erfolgreiche Enititätssuche durchgeführt. |  -  |
| **404** | NOT_FOUND -&gt; Im Requestbody wurde kein zu durchsuchender Entitätstyp gewählt. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchForSearchwordSuggestion

> SuchwortSuggestionsDto searchForSearchwordSuggestion(searchQueryDto)

Suche nach Suchwortvorschläge für das im Request-Body gegebene Suchanfrage.

### Example

```ts
import {
  Configuration,
  SucheApi,
} from '';
import type { SearchForSearchwordSuggestionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SucheApi();

  const body = {
    // SearchQueryDto
    searchQueryDto: ...,
  } satisfies SearchForSearchwordSuggestionRequest;

  try {
    const data = await api.searchForSearchwordSuggestion(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **searchQueryDto** | [SearchQueryDto](SearchQueryDto.md) |  | |

### Return type

[**SuchwortSuggestionsDto**](SuchwortSuggestionsDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Es wurde eine erfolgreiche Suche nach Suchwortvorschlägen durchgeführt. |  -  |
| **404** | NOT_FOUND -&gt; Im Requestbody wurde kein zu durchsuchender Entitätstyp gewählt. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

