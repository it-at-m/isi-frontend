# VersorgungsquoteApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getVersorungsquoteSobonHort**](VersorgungsquoteApi.md#getversorungsquotesobonhort) | **GET** /stammdaten/versorungsquote | Lade alle Versorungsquoten für den Hort |



## getVersorungsquoteSobonHort

> Array&lt;VersorgungsquoteSobonHortDto&gt; getVersorungsquoteSobonHort()

Lade alle Versorungsquoten für den Hort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteApi,
} from '';
import type { GetVersorungsquoteSobonHortRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteApi();

  try {
    const data = await api.getVersorungsquoteSobonHort();
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
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

