# MasterEaiApi

All URIs are relative to *http://localhost:8086*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAdressen**](MasterEaiApi.md#getadressen) | **POST** /adresse/search | Holt die Adressen bei denen die Suchkriterien übereinstimmen. |



## getAdressen

> MuenchenAdressenDto getAdressen(adressSucheDto)

Holt die Adressen bei denen die Suchkriterien übereinstimmen.

### Example

```ts
import {
  Configuration,
  MasterEaiApi,
} from '';
import type { GetAdressenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MasterEaiApi();

  const body = {
    // AdressSucheDto
    adressSucheDto: ...,
  } satisfies GetAdressenRequest;

  try {
    const data = await api.getAdressen(body);
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
| **adressSucheDto** | [AdressSucheDto](AdressSucheDto.md) |  | |

### Return type

[**MuenchenAdressenDto**](MuenchenAdressenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Adressen erfolgreich abgefragt. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Bei der Ausführung des MAstER-Requests ist ein serverseitiger Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

