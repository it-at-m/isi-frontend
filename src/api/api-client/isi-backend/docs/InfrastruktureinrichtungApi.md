# InfrastruktureinrichtungApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createInfrastruktureinrichtung**](InfrastruktureinrichtungApi.md#createinfrastruktureinrichtung) | **POST** /infrastruktureinrichtung | Anlegen einer neuen Infrastruktureinrichtung |
| [**createInfrastruktureinrichtungBedarfsmeldungSozialplanung**](InfrastruktureinrichtungApi.md#createinfrastruktureinrichtungbedarfsmeldungsozialplanung) | **POST** /infrastruktureinrichtung/bedarfsmeldung_sozialplanung | Anlegen einer neuen Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung |
| [**deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById**](InfrastruktureinrichtungApi.md#deleteinfrastruktureinrichtungbedarfsmeldungsozialplanungbyid) | **DELETE** /infrastruktureinrichtung/bedarfsmeldung_sozialplanung/{id} | Löschen einer Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung |
| [**deleteInfrastruktureinrichtungById**](InfrastruktureinrichtungApi.md#deleteinfrastruktureinrichtungbyid) | **DELETE** /infrastruktureinrichtung/{id} | Löschen einer Infrastruktureinrichtung |
| [**getInfrastruktureinrichtungById**](InfrastruktureinrichtungApi.md#getinfrastruktureinrichtungbyid) | **GET** /infrastruktureinrichtung/{id} | Lesen einer Infrastruktureinrichtung |
| [**updateInfrastruktureinrichtung**](InfrastruktureinrichtungApi.md#updateinfrastruktureinrichtungoperation) | **PUT** /infrastruktureinrichtung | Aktualisierung einer Infrastruktureinrichtung |
| [**updateInfrastruktureinrichtungBedarfsmeldungSozialplanung**](InfrastruktureinrichtungApi.md#updateinfrastruktureinrichtungbedarfsmeldungsozialplanung) | **PUT** /infrastruktureinrichtung/bedarfsmeldung_sozialplanung | Aktualisierung einer Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung |



## createInfrastruktureinrichtung

> UpdateInfrastruktureinrichtungRequest createInfrastruktureinrichtung(updateInfrastruktureinrichtungRequest)

Anlegen einer neuen Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { CreateInfrastruktureinrichtungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // UpdateInfrastruktureinrichtungRequest
    updateInfrastruktureinrichtungRequest: ...,
  } satisfies CreateInfrastruktureinrichtungRequest;

  try {
    const data = await api.createInfrastruktureinrichtung(body);
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
| **updateInfrastruktureinrichtungRequest** | [UpdateInfrastruktureinrichtungRequest](UpdateInfrastruktureinrichtungRequest.md) |  | |

### Return type

[**UpdateInfrastruktureinrichtungRequest**](UpdateInfrastruktureinrichtungRequest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Infrastruktureinrichtung wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Infrastruktureinrichtung konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createInfrastruktureinrichtungBedarfsmeldungSozialplanung

> UpdateInfrastruktureinrichtungRequest createInfrastruktureinrichtungBedarfsmeldungSozialplanung(updateInfrastruktureinrichtungRequest)

Anlegen einer neuen Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { CreateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // UpdateInfrastruktureinrichtungRequest
    updateInfrastruktureinrichtungRequest: ...,
  } satisfies CreateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest;

  try {
    const data = await api.createInfrastruktureinrichtungBedarfsmeldungSozialplanung(body);
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
| **updateInfrastruktureinrichtungRequest** | [UpdateInfrastruktureinrichtungRequest](UpdateInfrastruktureinrichtungRequest.md) |  | |

### Return type

[**UpdateInfrastruktureinrichtungRequest**](UpdateInfrastruktureinrichtungRequest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Infrastruktureinrichtung wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Infrastruktureinrichtung konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById

> deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById(id)

Löschen einer Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { DeleteInfrastruktureinrichtungBedarfsmeldungSozialplanungByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteInfrastruktureinrichtungBedarfsmeldungSozialplanungByIdRequest;

  try {
    const data = await api.deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById(body);
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
| **404** | NOT FOUND -&gt; Infrastruktureinrichtung mit dieser ID nicht vorhanden. |  -  |
| **409** | CONFLICT -&gt; Die Infrastruktureinrichtung referenziert ein Bauvorhaben. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteInfrastruktureinrichtungById

> deleteInfrastruktureinrichtungById(id)

Löschen einer Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { DeleteInfrastruktureinrichtungByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteInfrastruktureinrichtungByIdRequest;

  try {
    const data = await api.deleteInfrastruktureinrichtungById(body);
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
| **404** | NOT FOUND -&gt; Infrastruktureinrichtung mit dieser ID nicht vorhanden. |  -  |
| **409** | CONFLICT -&gt; Die Infrastruktureinrichtung referenziert ein Bauvorhaben. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getInfrastruktureinrichtungById

> UpdateInfrastruktureinrichtungRequest getInfrastruktureinrichtungById(id)

Lesen einer Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { GetInfrastruktureinrichtungByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetInfrastruktureinrichtungByIdRequest;

  try {
    const data = await api.getInfrastruktureinrichtungById(body);
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

[**UpdateInfrastruktureinrichtungRequest**](UpdateInfrastruktureinrichtungRequest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | NOT FOUND -&gt; Grundschule mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateInfrastruktureinrichtung

> UpdateInfrastruktureinrichtungRequest updateInfrastruktureinrichtung(updateInfrastruktureinrichtungRequest)

Aktualisierung einer Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { UpdateInfrastruktureinrichtungOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // UpdateInfrastruktureinrichtungRequest
    updateInfrastruktureinrichtungRequest: ...,
  } satisfies UpdateInfrastruktureinrichtungOperationRequest;

  try {
    const data = await api.updateInfrastruktureinrichtung(body);
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
| **updateInfrastruktureinrichtungRequest** | [UpdateInfrastruktureinrichtungRequest](UpdateInfrastruktureinrichtungRequest.md) |  | |

### Return type

[**UpdateInfrastruktureinrichtungRequest**](UpdateInfrastruktureinrichtungRequest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Infrastruktureinrichtung wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Infrastruktureinrichtung konnte nicht aktualisiert werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Infrastruktureinrichtung mit der ID. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateInfrastruktureinrichtungBedarfsmeldungSozialplanung

> UpdateInfrastruktureinrichtungRequest updateInfrastruktureinrichtungBedarfsmeldungSozialplanung(updateInfrastruktureinrichtungRequest)

Aktualisierung einer Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungApi,
} from '';
import type { UpdateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungApi();

  const body = {
    // UpdateInfrastruktureinrichtungRequest
    updateInfrastruktureinrichtungRequest: ...,
  } satisfies UpdateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest;

  try {
    const data = await api.updateInfrastruktureinrichtungBedarfsmeldungSozialplanung(body);
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
| **updateInfrastruktureinrichtungRequest** | [UpdateInfrastruktureinrichtungRequest](UpdateInfrastruktureinrichtungRequest.md) |  | |

### Return type

[**UpdateInfrastruktureinrichtungRequest**](UpdateInfrastruktureinrichtungRequest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Infrastruktureinrichtung wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Infrastruktureinrichtung konnte nicht aktualisiert werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Infrastruktureinrichtung mit der ID. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

