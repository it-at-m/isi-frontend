# IdealtypischeBaurateSearchControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchIdealtypischebaurateGet**](IdealtypischeBaurateSearchControllerApi.md#executesearchidealtypischebaurateget) | **GET** /idealtypischeBaurates/search/findByTypAndVonLessThanEqualAndBisExklusivGreaterThan |  |



## executeSearchIdealtypischebaurateGet

> EntityModelIdealtypischeBaurate executeSearchIdealtypischebaurateGet(typ, von, bisExklusiv)



### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateSearchControllerApi,
} from '';
import type { ExecuteSearchIdealtypischebaurateGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateSearchControllerApi();

  const body = {
    // 'ANZAHL_WOHNEINHEITEN_GESAMT' | 'GESCHOSSFLAECHE_WOHNEN_GESAMT' (optional)
    typ: typ_example,
    // number (optional)
    von: 8.14,
    // number (optional)
    bisExklusiv: 8.14,
  } satisfies ExecuteSearchIdealtypischebaurateGetRequest;

  try {
    const data = await api.executeSearchIdealtypischebaurateGet(body);
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
| **typ** | `ANZAHL_WOHNEINHEITEN_GESAMT`, `GESCHOSSFLAECHE_WOHNEN_GESAMT` |  | [Optional] [Defaults to `undefined`] [Enum: ANZAHL_WOHNEINHEITEN_GESAMT, GESCHOSSFLAECHE_WOHNEN_GESAMT] |
| **von** | `number` |  | [Optional] [Defaults to `undefined`] |
| **bisExklusiv** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelIdealtypischeBaurate**](EntityModelIdealtypischeBaurate.md)

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

