# VersorgungsquoteGruppenstaerkeSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchVersorgungsquotegruppenstaerkeGet**](VersorgungsquoteGruppenstaerkeSearchControllerApi.md#executesearchversorgungsquotegruppenstaerkeget) | **GET** /versorgungsquoteGruppenstaerkes/search/findFirstByInfrastruktureinrichtungTypAndGueltigAbIsLessThanEqualOrderByGueltigAbDesc |  |



## executeSearchVersorgungsquotegruppenstaerkeGet

> EntityModelVersorgungsquoteGruppenstaerke executeSearchVersorgungsquotegruppenstaerkeGet(infrastruktureinrichtungTyp, gueltigAb)



### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeSearchControllerApi,
} from '';
import type { ExecuteSearchVersorgungsquotegruppenstaerkeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeSearchControllerApi();

  const body = {
    // 'UNSPECIFIED' | 'KINDERKRIPPE' | 'KINDERGARTEN' | 'GS_NACHMITTAG_BETREUUNG' | 'HAUS_FUER_KINDER' | 'GRUNDSCHULE' | 'MITTELSCHULE' (optional)
    infrastruktureinrichtungTyp: infrastruktureinrichtungTyp_example,
    // Date (optional)
    gueltigAb: 2013-10-20,
  } satisfies ExecuteSearchVersorgungsquotegruppenstaerkeGetRequest;

  try {
    const data = await api.executeSearchVersorgungsquotegruppenstaerkeGet(body);
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
| **infrastruktureinrichtungTyp** | `UNSPECIFIED`, `KINDERKRIPPE`, `KINDERGARTEN`, `GS_NACHMITTAG_BETREUUNG`, `HAUS_FUER_KINDER`, `GRUNDSCHULE`, `MITTELSCHULE` |  | [Optional] [Defaults to `undefined`] [Enum: UNSPECIFIED, KINDERKRIPPE, KINDERGARTEN, GS_NACHMITTAG_BETREUUNG, HAUS_FUER_KINDER, GRUNDSCHULE, MITTELSCHULE] |
| **gueltigAb** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelVersorgungsquoteGruppenstaerke**](EntityModelVersorgungsquoteGruppenstaerke.md)

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

