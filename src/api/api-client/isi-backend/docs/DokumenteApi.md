# DokumenteApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getDokumente**](DokumenteApi.md#getdokumente) | **GET** /dokumente | Holen aller in der Anwendung vorhandenen Dokumente |



## getDokumente

> DokumenteDto getDokumente(pageNumber, pageSize)

Holen aller in der Anwendung vorhandenen Dokumente

### Example

```ts
import {
  Configuration,
  DokumenteApi,
} from '';
import type { GetDokumenteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumenteApi();

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
  } satisfies GetDokumenteRequest;

  try {
    const data = await api.getDokumente(body);
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
| **pageNumber** | `number` |  | [Optional] [Defaults to `0`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `100`] |

### Return type

[**DokumenteDto**](DokumenteDto.md)

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

