# StartseitenEinstellungApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getStartseitenEinstellung**](StartseitenEinstellungApi.md#getstartseiteneinstellung) | **GET** /startseiten-einstellung | Lesen der persönlichen Startseiteneinstellungen. Sind keine gespeichert, werden die Standardeinstellungen zurückgegeben. |
| [**saveStartseitenEinstellung**](StartseitenEinstellungApi.md#savestartseiteneinstellung) | **PUT** /startseiten-einstellung | Speichern der persönlichen Startseiteneinstellungen. |



## getStartseitenEinstellung

> StartseitenEinstellungDto getStartseitenEinstellung()

Lesen der persönlichen Startseiteneinstellungen. Sind keine gespeichert, werden die Standardeinstellungen zurückgegeben.

### Example

```ts
import {
  Configuration,
  StartseitenEinstellungApi,
} from '';
import type { GetStartseitenEinstellungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StartseitenEinstellungApi();

  try {
    const data = await api.getStartseitenEinstellung();
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

[**StartseitenEinstellungDto**](StartseitenEinstellungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung, um die Startseiteneinstellungen anzusehen. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## saveStartseitenEinstellung

> StartseitenEinstellungDto saveStartseitenEinstellung(startseitenEinstellungDto)

Speichern der persönlichen Startseiteneinstellungen.

### Example

```ts
import {
  Configuration,
  StartseitenEinstellungApi,
} from '';
import type { SaveStartseitenEinstellungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StartseitenEinstellungApi();

  const body = {
    // StartseitenEinstellungDto
    startseitenEinstellungDto: ...,
  } satisfies SaveStartseitenEinstellungRequest;

  try {
    const data = await api.saveStartseitenEinstellung(body);
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
| **startseitenEinstellungDto** | [StartseitenEinstellungDto](StartseitenEinstellungDto.md) |  | |

### Return type

[**StartseitenEinstellungDto**](StartseitenEinstellungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Einstellungen wurden erfolgreich gespeichert. |  -  |
| **400** | BAD_REQUEST -&gt; Einstellungen konnten nicht gespeichert werden, überprüfen sie die Eingabe. |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung, um die Startseiteneinstellungen zu speichern. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

