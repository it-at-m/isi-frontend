# BaurateApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**determineBauraten**](BaurateApi.md#determinebauraten) | **GET** /baurate/determine | Ermittelt die Bauraten auf Basis der Stammdaten für idealtypische Bauraten |



## determineBauraten

> Array&lt;BaurateDto&gt; determineBauraten(realisierungsbeginn, wohneinheiten, geschossflaecheWohnen)

Ermittelt die Bauraten auf Basis der Stammdaten für idealtypische Bauraten

### Example

```ts
import {
  Configuration,
  BaurateApi,
} from '';
import type { DetermineBauratenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BaurateApi();

  const body = {
    // number
    realisierungsbeginn: 56,
    // number (optional)
    wohneinheiten: 789,
    // number (optional)
    geschossflaecheWohnen: 8.14,
  } satisfies DetermineBauratenRequest;

  try {
    const data = await api.determineBauraten(body);
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
| **realisierungsbeginn** | `number` |  | [Defaults to `undefined`] |
| **wohneinheiten** | `number` |  | [Optional] [Defaults to `undefined`] |
| **geschossflaecheWohnen** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;BaurateDto&gt;**](BaurateDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | NOT FOUND -&gt; Es konnten keine Bauraten ermittelt werden, da keine idealtypischen Bauraten für die gegebenen Parameter existieren. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

