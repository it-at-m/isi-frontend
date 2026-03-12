# UmlegungFoerderartenSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchUmlegungfoerderartenGet**](UmlegungFoerderartenSearchControllerApi.md#executesearchumlegungfoerderartenget) | **GET** /umlegungFoerderartens/search/findFirstByBezeichnungAndGueltigAbIsLessThanEqualOrderByGueltigAbDesc |  |



## executeSearchUmlegungfoerderartenGet

> EntityModelUmlegungFoerderarten executeSearchUmlegungfoerderartenGet(bezeichnung, datum)



### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenSearchControllerApi,
} from '';
import type { ExecuteSearchUmlegungfoerderartenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenSearchControllerApi();

  const body = {
    // string (optional)
    bezeichnung: bezeichnung_example,
    // Date (optional)
    datum: 2013-10-20,
  } satisfies ExecuteSearchUmlegungfoerderartenGetRequest;

  try {
    const data = await api.executeSearchUmlegungfoerderartenGet(body);
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
| **bezeichnung** | `string` |  | [Optional] [Defaults to `undefined`] |
| **datum** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelUmlegungFoerderarten**](EntityModelUmlegungFoerderarten.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

