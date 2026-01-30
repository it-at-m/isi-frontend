# LookupApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getLookupLists**](LookupApi.md#getlookuplists) | **GET** /lookup-lists | Gibt die Lookuplisten zurück. |



## getLookupLists

> LookupListsDto getLookupLists()

Gibt die Lookuplisten zurück.

### Example

```ts
import {
  Configuration,
  LookupApi,
} from '';
import type { GetLookupListsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LookupApi();

  try {
    const data = await api.getLookupLists();
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

[**LookupListsDto**](LookupListsDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Lookuplisten wurden erfolgreich zurückgegeben. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

