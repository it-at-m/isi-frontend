# AbfragenApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**blvInBgvUebernehmenById**](AbfragenApi.md#blvinbgvuebernehmenbyid) | **GET** /abfrage/blv-in-bgv-uebernehmen{id} | Datenübernahme von Bauleileitplanverfahren (BLV) in Baugenehmigungsverfahren (BGV). |
| [**deleteById**](AbfragenApi.md#deletebyid) | **DELETE** /abfrage/{id} | Löschen einer Abfrage |
| [**getById**](AbfragenApi.md#getbyid) | **GET** /abfrage/{id} | Lesen einer Abfrage. |
| [**patchAngelegt**](AbfragenApi.md#patchangelegt) | **PATCH** /abfrage/angelegt/{id} | Aktualisierung einer Abfrage im Status ANGELEGT. |
| [**patchEinpflegenBedarfsmeldung**](AbfragenApi.md#patcheinpflegenbedarfsmeldungoperation) | **PATCH** /abfrage/in-bearbeitung-fachreferate/{id} | Aktualisierung einer Abfrage im Status EINPFLEGEN_BEDARFSMELDUNG. |
| [**patchEinplanungBedarfe**](AbfragenApi.md#patcheinplanungbedarfeoperation) | **PATCH** /abfrage/bedarfsmeldung-erfolgt/{id} | Aktualisierung einer Abfrage im Status EINPLANUNG_BEDARFE. |
| [**patchStartBearbeitung**](AbfragenApi.md#patchstartbearbeitungoperation) | **PATCH** /abfrage/in-bearbeitung-sachbearbeitung/{id} | Aktualisierung einer Abfrage im Status START_BEARBEITUNG. |
| [**save**](AbfragenApi.md#saveoperation) | **POST** /abfrage | Anlegen einer neuen Abfrage |
| [**wvInBgvUebernehmenById**](AbfragenApi.md#wvinbgvuebernehmenbyid) | **GET** /abfrage/wv-in-bgv-uebernehmen{id} | Datenübernahme von Weiteres Verfahren (WV) in Baugenehmigungsverfahren (BGV). |
| [**wvInBlvUebernehmenById**](AbfragenApi.md#wvinblvuebernehmenbyid) | **GET** /abfrage/wv-in-blv-uebernehmen{id} | Datenübernahme von Weiteres Verfahren (WV) in Bauleitplanverfahren (BLV). |



## blvInBgvUebernehmenById

> Save201Response blvInBgvUebernehmenById(id)

Datenübernahme von Bauleileitplanverfahren (BLV) in Baugenehmigungsverfahren (BGV).

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { BlvInBgvUebernehmenByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies BlvInBgvUebernehmenByIdRequest;

  try {
    const data = await api.blvInBgvUebernehmenById(body);
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

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu öffnen. |  -  |
| **404** | NOT FOUND -&gt; Abfrage mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteById

> deleteById(id)

Löschen einer Abfrage

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { DeleteByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteByIdRequest;

  try {
    const data = await api.deleteById(body);
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
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | NO CONTENT |  -  |
| **404** | NOT FOUND -&gt; Abfrage mit dieser ID nicht vorhanden. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage referenziert ein Bauvorhaben oder die Abfrage nicht im korrekten Status ist. |  -  |
| **403** | CONFLICT -&gt; Der Nutzer besitzt nicht die Berechtigung zum Löschen der Abfrage. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getById

> Save201Response getById(id)

Lesen einer Abfrage.

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { GetByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetByIdRequest;

  try {
    const data = await api.getById(body);
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

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu öffnen. |  -  |
| **404** | NOT FOUND -&gt; Abfrage mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## patchAngelegt

> Save201Response patchAngelegt(id, saveRequest)

Aktualisierung einer Abfrage im Status ANGELEGT.

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { PatchAngelegtRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // SaveRequest
    saveRequest: ...,
  } satisfies PatchAngelegtRequest;

  try {
    const data = await api.patchAngelegt(body);
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
| **saveRequest** | [SaveRequest](SaveRequest.md) |  | |

### Return type

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Abfrage wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Abfrage konnte nicht aktualisiert werden, überprüfen sie die Eingabe oder die Abfrage befindet sich in einem unzulässigen Status |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu bearbeiten. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID oder das referenzierte Bauvorhaben existiert nicht. |  -  |
| **409** | CONFLICT -&gt; Abfrage konnte nicht aktualisiert werden, da die Abfrage nicht im korrekten Status ist. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Die Dateien konnten nicht gelöscht werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## patchEinpflegenBedarfsmeldung

> Save201Response patchEinpflegenBedarfsmeldung(id, patchEinpflegenBedarfsmeldungRequest)

Aktualisierung einer Abfrage im Status EINPFLEGEN_BEDARFSMELDUNG.

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { PatchEinpflegenBedarfsmeldungOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PatchEinpflegenBedarfsmeldungRequest
    patchEinpflegenBedarfsmeldungRequest: ...,
  } satisfies PatchEinpflegenBedarfsmeldungOperationRequest;

  try {
    const data = await api.patchEinpflegenBedarfsmeldung(body);
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
| **patchEinpflegenBedarfsmeldungRequest** | [PatchEinpflegenBedarfsmeldungRequest](PatchEinpflegenBedarfsmeldungRequest.md) |  | |

### Return type

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Abfrage wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Abfrage konnte nicht aktualisiert werden, überprüfen sie die Eingabe oder die Abfrage befindet sich in einem unzulässigen Status |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu bearbeiten. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Abfrage konnte nicht aktualisiert werden, da die Abfrage nicht im korrekten Status ist. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## patchEinplanungBedarfe

> Save201Response patchEinplanungBedarfe(id, patchEinplanungBedarfeRequest)

Aktualisierung einer Abfrage im Status EINPLANUNG_BEDARFE.

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { PatchEinplanungBedarfeOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PatchEinplanungBedarfeRequest
    patchEinplanungBedarfeRequest: ...,
  } satisfies PatchEinplanungBedarfeOperationRequest;

  try {
    const data = await api.patchEinplanungBedarfe(body);
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
| **patchEinplanungBedarfeRequest** | [PatchEinplanungBedarfeRequest](PatchEinplanungBedarfeRequest.md) |  | |

### Return type

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Abfrage wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Abfrage konnte nicht aktualisiert werden, überprüfen sie die Eingabe oder die Abfrage befindet sich in einem unzulässigen Status |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Abfrage konnte nicht aktualisiert werden, da die Abfrage nicht im korrekten Status ist. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## patchStartBearbeitung

> Save201Response patchStartBearbeitung(id, patchStartBearbeitungRequest)

Aktualisierung einer Abfrage im Status START_BEARBEITUNG.

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { PatchStartBearbeitungOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PatchStartBearbeitungRequest
    patchStartBearbeitungRequest: ...,
  } satisfies PatchStartBearbeitungOperationRequest;

  try {
    const data = await api.patchStartBearbeitung(body);
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
| **patchStartBearbeitungRequest** | [PatchStartBearbeitungRequest](PatchStartBearbeitungRequest.md) |  | |

### Return type

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Abfrage wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Abfrage konnte nicht aktualisiert werden, überprüfen sie die Eingabe oder die Abfrage befindet sich in einem unzulässigen Status |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu bearbeiten. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Abfrage konnte nicht aktualisiert werden, da die Abfrage nicht im korrekten Status ist. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## save

> Save201Response save(saveRequest)

Anlegen einer neuen Abfrage

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { SaveOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // SaveRequest
    saveRequest: ...,
  } satisfies SaveOperationRequest;

  try {
    const data = await api.save(body);
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
| **saveRequest** | [SaveRequest](SaveRequest.md) |  | |

### Return type

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Abfrage wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Abfrage konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Das referenzierte Bauvorhaben existiert nicht. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## wvInBgvUebernehmenById

> Save201Response wvInBgvUebernehmenById(id)

Datenübernahme von Weiteres Verfahren (WV) in Baugenehmigungsverfahren (BGV).

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { WvInBgvUebernehmenByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies WvInBgvUebernehmenByIdRequest;

  try {
    const data = await api.wvInBgvUebernehmenById(body);
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

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu öffnen. |  -  |
| **404** | NOT FOUND -&gt; Abfrage mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## wvInBlvUebernehmenById

> Save201Response wvInBlvUebernehmenById(id)

Datenübernahme von Weiteres Verfahren (WV) in Bauleitplanverfahren (BLV).

### Example

```ts
import {
  Configuration,
  AbfragenApi,
} from '';
import type { WvInBlvUebernehmenByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies WvInBlvUebernehmenByIdRequest;

  try {
    const data = await api.wvInBlvUebernehmenById(body);
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

[**Save201Response**](Save201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu öffnen. |  -  |
| **404** | NOT FOUND -&gt; Abfrage mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

