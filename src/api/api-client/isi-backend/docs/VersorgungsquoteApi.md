# VersorgungsquoteApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getVersorgungsquoteSobonHort**](VersorgungsquoteApi.md#getversorgungsquotesobonhort) | **GET** /stammdaten/versorgungsquote | Lade alle Sobon Versorgungsquoten für den Hort |



## getVersorgungsquoteSobonHort

> Array&lt;VersorgungsquoteSobonHortDto&gt; getVersorgungsquoteSobonHort()

Lade alle Sobon Versorgungsquoten für den Hort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteApi,
} from '';
import type { GetVersorgungsquoteSobonHortRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteApi();

  try {
    const data = await api.getVersorgungsquoteSobonHort();
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

[**Array&lt;VersorgungsquoteSobonHortDto&gt;**](VersorgungsquoteSobonHortDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

