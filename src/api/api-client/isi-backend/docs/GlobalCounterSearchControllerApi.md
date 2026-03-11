# GlobalCounterSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchGlobalcounterGet**](GlobalCounterSearchControllerApi.md#executesearchglobalcounterget) | **GET** /globalCounters/search/findByCounterType |  |



## executeSearchGlobalcounterGet

> EntityModelGlobalCounter executeSearchGlobalcounterGet(counterType)



### Example

```ts
import {
  Configuration,
  GlobalCounterSearchControllerApi,
} from '';
import type { ExecuteSearchGlobalcounterGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterSearchControllerApi();

  const body = {
    // 'NUMMER_BAUVORHABEN' (optional)
    counterType: counterType_example,
  } satisfies ExecuteSearchGlobalcounterGetRequest;

  try {
    const data = await api.executeSearchGlobalcounterGet(body);
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
| **counterType** | `NUMMER_BAUVORHABEN` |  | [Optional] [Defaults to `undefined`] [Enum: NUMMER_BAUVORHABEN] |

### Return type

[**EntityModelGlobalCounter**](EntityModelGlobalCounter.md)

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

