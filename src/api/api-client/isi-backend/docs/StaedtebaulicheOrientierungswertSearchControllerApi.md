# StaedtebaulicheOrientierungswertSearchControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchStaedtebaulicheorientierungswertGet**](StaedtebaulicheOrientierungswertSearchControllerApi.md#executesearchstaedtebaulicheorientierungswertget) | **GET** /staedtebaulicheOrientierungswerts/search/findFirstByFoerderartBezeichnungAndGueltigAbIsLessThanEqualOrderByGueltigAbDesc |  |



## executeSearchStaedtebaulicheorientierungswertGet

> EntityModelStaedtebaulicheOrientierungswert executeSearchStaedtebaulicheorientierungswertGet(foerderartBezeichnung, gueltigAb)



### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertSearchControllerApi,
} from '';
import type { ExecuteSearchStaedtebaulicheorientierungswertGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertSearchControllerApi();

  const body = {
    // string (optional)
    foerderartBezeichnung: foerderartBezeichnung_example,
    // Date (optional)
    gueltigAb: 2013-10-20,
  } satisfies ExecuteSearchStaedtebaulicheorientierungswertGetRequest;

  try {
    const data = await api.executeSearchStaedtebaulicheorientierungswertGet(body);
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
| **foerderartBezeichnung** | `string` |  | [Optional] [Defaults to `undefined`] |
| **gueltigAb** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelStaedtebaulicheOrientierungswert**](EntityModelStaedtebaulicheOrientierungswert.md)

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

