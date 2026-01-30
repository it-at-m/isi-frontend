# FoerdermixStammSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchFoerdermixstammGet**](FoerdermixStammSearchControllerApi.md#executesearchfoerdermixstammget) | **GET** /foerdermixStamms/search/findAllByOrderByFoerdermixBezeichnungAsc |  |



## executeSearchFoerdermixstammGet

> EntityModelFoerdermixStamm executeSearchFoerdermixstammGet()



### Example

```ts
import {
  Configuration,
  FoerdermixStammSearchControllerApi,
} from '';
import type { ExecuteSearchFoerdermixstammGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammSearchControllerApi();

  try {
    const data = await api.executeSearchFoerdermixstammGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**EntityModelFoerdermixStamm**](EntityModelFoerdermixStamm.md)

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

