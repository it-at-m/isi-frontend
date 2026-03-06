# ControllerFrDasLesenVonLayernApi

All URIs are relative to *http://localhost:8085*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getLayer**](ControllerFrDasLesenVonLayernApi.md#getlayer) | **GET** /layer | Ermittelt einen Layer |



## getLayer

> string getLayer(arg0)

Ermittelt einen Layer

### Example

```ts
import {
  Configuration,
  ControllerFrDasLesenVonLayernApi,
} from '';
import type { GetLayerRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerFrDasLesenVonLayernApi();

  const body = {
    // { [key: string]: string; }
    arg0: ...,
  } satisfies GetLayerRequest;

  try {
    const data = await api.getLayer(body);
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
| **arg0** | `{ [key: string]: string; }` |  | |

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `image/png`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Das Lesen des Layers war erfolgreich |  -  |
| **500** | Beim Lesen des Layers ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

