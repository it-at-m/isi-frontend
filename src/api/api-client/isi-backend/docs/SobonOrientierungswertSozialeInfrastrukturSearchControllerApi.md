# SobonOrientierungswertSozialeInfrastrukturSearchControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchSobonorientierungswertsozialeinfrastrukturGet**](SobonOrientierungswertSozialeInfrastrukturSearchControllerApi.md#executesearchsobonorientierungswertsozialeinfrastrukturget) | **GET** /sobonOrientierungswertSozialeInfrastrukturs/search/findFirstByEinrichtungstypAndFoerderartBezeichnungAndGueltigAbIsLessThanEqualOrderByGueltigAbDesc |  |
| [**executeSearchSobonorientierungswertsozialeinfrastrukturGet1**](SobonOrientierungswertSozialeInfrastrukturSearchControllerApi.md#executesearchsobonorientierungswertsozialeinfrastrukturget1) | **GET** /sobonOrientierungswertSozialeInfrastrukturs/search/findFirstByEinrichtungstypAndFoerderartBezeichnungAndJahrBezeichnung |  |



## executeSearchSobonorientierungswertsozialeinfrastrukturGet

> EntityModelSobonOrientierungswertSozialeInfrastruktur executeSearchSobonorientierungswertsozialeinfrastrukturGet(einrichtungstyp, foerderartBezeichnung, gueltigAb)



### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturSearchControllerApi,
} from '';
import type { ExecuteSearchSobonorientierungswertsozialeinfrastrukturGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturSearchControllerApi();

  const body = {
    // 'UNSPECIFIED' | 'KINDERKRIPPE' | 'KINDERGARTEN' | 'GS_NACHMITTAG_BETREUUNG' | 'HAUS_FUER_KINDER' | 'GRUNDSCHULE' | 'MITTELSCHULE' (optional)
    einrichtungstyp: einrichtungstyp_example,
    // string (optional)
    foerderartBezeichnung: foerderartBezeichnung_example,
    // Date (optional)
    gueltigAb: 2013-10-20,
  } satisfies ExecuteSearchSobonorientierungswertsozialeinfrastrukturGetRequest;

  try {
    const data = await api.executeSearchSobonorientierungswertsozialeinfrastrukturGet(body);
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
| **einrichtungstyp** | `UNSPECIFIED`, `KINDERKRIPPE`, `KINDERGARTEN`, `GS_NACHMITTAG_BETREUUNG`, `HAUS_FUER_KINDER`, `GRUNDSCHULE`, `MITTELSCHULE` |  | [Optional] [Defaults to `undefined`] [Enum: UNSPECIFIED, KINDERKRIPPE, KINDERGARTEN, GS_NACHMITTAG_BETREUUNG, HAUS_FUER_KINDER, GRUNDSCHULE, MITTELSCHULE] |
| **foerderartBezeichnung** | `string` |  | [Optional] [Defaults to `undefined`] |
| **gueltigAb** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelSobonOrientierungswertSozialeInfrastruktur**](EntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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


## executeSearchSobonorientierungswertsozialeinfrastrukturGet1

> EntityModelSobonOrientierungswertSozialeInfrastruktur executeSearchSobonorientierungswertsozialeinfrastrukturGet1(einrichtungstyp, foerderartBezeichnung, jahrBezeichnung)



### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturSearchControllerApi,
} from '';
import type { ExecuteSearchSobonorientierungswertsozialeinfrastrukturGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturSearchControllerApi();

  const body = {
    // 'UNSPECIFIED' | 'KINDERKRIPPE' | 'KINDERGARTEN' | 'GS_NACHMITTAG_BETREUUNG' | 'HAUS_FUER_KINDER' | 'GRUNDSCHULE' | 'MITTELSCHULE' (optional)
    einrichtungstyp: einrichtungstyp_example,
    // string (optional)
    foerderartBezeichnung: foerderartBezeichnung_example,
    // string (optional)
    jahrBezeichnung: jahrBezeichnung_example,
  } satisfies ExecuteSearchSobonorientierungswertsozialeinfrastrukturGet1Request;

  try {
    const data = await api.executeSearchSobonorientierungswertsozialeinfrastrukturGet1(body);
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
| **einrichtungstyp** | `UNSPECIFIED`, `KINDERKRIPPE`, `KINDERGARTEN`, `GS_NACHMITTAG_BETREUUNG`, `HAUS_FUER_KINDER`, `GRUNDSCHULE`, `MITTELSCHULE` |  | [Optional] [Defaults to `undefined`] [Enum: UNSPECIFIED, KINDERKRIPPE, KINDERGARTEN, GS_NACHMITTAG_BETREUUNG, HAUS_FUER_KINDER, GRUNDSCHULE, MITTELSCHULE] |
| **foerderartBezeichnung** | `string` |  | [Optional] [Defaults to `undefined`] |
| **jahrBezeichnung** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelSobonOrientierungswertSozialeInfrastruktur**](EntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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

