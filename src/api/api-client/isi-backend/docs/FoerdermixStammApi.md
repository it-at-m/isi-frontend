# FoerdermixStammApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteFoerdermixStammById**](FoerdermixStammApi.md#deletefoerdermixstammbyid) | **DELETE** /stammdaten/foerdermix/{id} | Löschen eines FoerdermixStamm |
| [**getFoerdermixStaemme**](FoerdermixStammApi.md#getfoerdermixstaemme) | **GET** /stammdaten/foerdermix | Lade alle Fördermix Stammdaten |
| [**getFoerdermixStammById**](FoerdermixStammApi.md#getfoerdermixstammbyid) | **GET** /stammdaten/foerdermix/{id} | Lesen eines FoerdermixStamm |
| [**saveFoerdermixStamm**](FoerdermixStammApi.md#savefoerdermixstamm) | **POST** /stammdaten/foerdermix | Anlegen eines FoerdermixStamm |
| [**updateFoerdermixStamm**](FoerdermixStammApi.md#updatefoerdermixstamm) | **PUT** /stammdaten/foerdermix | Aktualisierung eines FoerdermixStamm |



## deleteFoerdermixStammById

> deleteFoerdermixStammById(id)

Löschen eines FoerdermixStamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammApi,
} from '';
import type { DeleteFoerdermixStammByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteFoerdermixStammByIdRequest;

  try {
    const data = await api.deleteFoerdermixStammById(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | NO CONTENT |  -  |
| **404** | NOT FOUND -&gt; FoerdermixStamm mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFoerdermixStaemme

> Array&lt;FoerdermixStammDto&gt; getFoerdermixStaemme()

Lade alle Fördermix Stammdaten

Das Ergebnis wird nach der Bezeichnung aufsteigend sortiert

### Example

```ts
import {
  Configuration,
  FoerdermixStammApi,
} from '';
import type { GetFoerdermixStaemmeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammApi();

  try {
    const data = await api.getFoerdermixStaemme();
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

[**Array&lt;FoerdermixStammDto&gt;**](FoerdermixStammDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFoerdermixStammById

> FoerdermixStammDto getFoerdermixStammById(id)

Lesen eines FoerdermixStamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammApi,
} from '';
import type { GetFoerdermixStammByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetFoerdermixStammByIdRequest;

  try {
    const data = await api.getFoerdermixStammById(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**FoerdermixStammDto**](FoerdermixStammDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | NOT FOUND -&gt; FoerdermixStamm mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## saveFoerdermixStamm

> FoerdermixStammDto saveFoerdermixStamm(foerdermixStammDto)

Anlegen eines FoerdermixStamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammApi,
} from '';
import type { SaveFoerdermixStammRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammApi();

  const body = {
    // FoerdermixStammDto
    foerdermixStammDto: ...,
  } satisfies SaveFoerdermixStammRequest;

  try {
    const data = await api.saveFoerdermixStamm(body);
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
| **foerdermixStammDto** | [FoerdermixStammDto](FoerdermixStammDto.md) |  | |

### Return type

[**FoerdermixStammDto**](FoerdermixStammDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; FoerdermixStamm wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; FoerdermixStamm konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateFoerdermixStamm

> FoerdermixStammDto updateFoerdermixStamm(foerdermixStammDto)

Aktualisierung eines FoerdermixStamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammApi,
} from '';
import type { UpdateFoerdermixStammRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammApi();

  const body = {
    // FoerdermixStammDto
    foerdermixStammDto: ...,
  } satisfies UpdateFoerdermixStammRequest;

  try {
    const data = await api.updateFoerdermixStamm(body);
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
| **foerdermixStammDto** | [FoerdermixStammDto](FoerdermixStammDto.md) |  | |

### Return type

[**FoerdermixStammDto**](FoerdermixStammDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; FoerdermixStamm wurde erfolgreich aktualisiert. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine FoerdermixStamm mit der ID. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

