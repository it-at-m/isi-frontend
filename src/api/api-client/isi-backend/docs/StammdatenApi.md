# StammdatenApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**importSoBoNOrientierungswerteSozialeInfrastruktur**](StammdatenApi.md#importsobonorientierungswertesozialeinfrastruktur) | **POST** /stammdaten/sobon-orientierungswerte-soziale-infrastruktur/import | Importiert die CSV-Datei und persistiert die Einträge in der Datenbank. |
| [**importStaedtebaulicheOrientierungswerte**](StammdatenApi.md#importstaedtebaulicheorientierungswerte) | **POST** /stammdaten/staedtebauliche-orientierungswerte/import | Importiert die CSV-Datei und persistiert die Einträge in der Datenbank. |



## importSoBoNOrientierungswerteSozialeInfrastruktur

> importSoBoNOrientierungswerteSozialeInfrastruktur(file)

Importiert die CSV-Datei und persistiert die Einträge in der Datenbank.

### Example

```ts
import {
  Configuration,
  StammdatenApi,
} from '';
import type { ImportSoBoNOrientierungswerteSozialeInfrastrukturRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StammdatenApi();

  const body = {
    // Blob
    file: BINARY_DATA_HERE,
  } satisfies ImportSoBoNOrientierungswerteSozialeInfrastrukturRequest;

  try {
    const data = await api.importSoBoNOrientierungswerteSozialeInfrastruktur(body);
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
| **file** | `Blob` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Import konnte erfolgreich durchgeführt werden. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Beim importieren der Datei ist ein serverseitiger Fehler aufgetreten. |  -  |
| **422** | UNPROCESSABLE_ENTITY -&gt; Die CSV-Datei konnte nicht korrekt verarbeitet werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## importStaedtebaulicheOrientierungswerte

> importStaedtebaulicheOrientierungswerte(file)

Importiert die CSV-Datei und persistiert die Einträge in der Datenbank.

### Example

```ts
import {
  Configuration,
  StammdatenApi,
} from '';
import type { ImportStaedtebaulicheOrientierungswerteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StammdatenApi();

  const body = {
    // Blob
    file: BINARY_DATA_HERE,
  } satisfies ImportStaedtebaulicheOrientierungswerteRequest;

  try {
    const data = await api.importStaedtebaulicheOrientierungswerte(body);
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
| **file** | `Blob` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Import konnte erfolgreich durchgeführt werden. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Beim importieren der Datei ist ein serverseitiger Fehler aufgetreten. |  -  |
| **422** | UNPROCESSABLE_ENTITY -&gt; Die CSV-Datei konnte nicht korrekt verarbeitet werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

