# BauvorhabenApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createBauvorhaben**](BauvorhabenApi.md#createbauvorhaben) | **POST** /bauvorhaben | Anlegen eines neuen Bauvorhabens |
| [**deleteBauvorhaben**](BauvorhabenApi.md#deletebauvorhaben) | **DELETE** /bauvorhaben/{id} | Löschen eines Bauvorhabens |
| [**getBauvorhabenById**](BauvorhabenApi.md#getbauvorhabenbyid) | **GET** /bauvorhaben/{id} | Lesen eines Bauvorhabens |
| [**getReferencedAbfrage**](BauvorhabenApi.md#getreferencedabfrage) | **GET** /bauvorhaben/referenced/abfragen/{id} | Lade alle Abfragen die einem Bauvorhaben angehören |
| [**getReferencedInfrastruktureinrichtung**](BauvorhabenApi.md#getreferencedinfrastruktureinrichtung) | **GET** /bauvorhaben/referenced/infrastruktureinrichtung/{id} | Lade alle Infrastruktureinrichtungen die einem Bauvorhaben angehören |
| [**putChangeRelevanteAbfragevariante**](BauvorhabenApi.md#putchangerelevanteabfragevariante) | **PUT** /bauvorhaben/change-relevante-abfragevariante | Setzt die übergebene Abfragevariante als relevante Abfrage beim Bauvorhaben, welches mit der Abfrage der Abfragevariante verknüpft ist.Ist die Abfragevariante bereits als relevant markiert, wird die relevante Abfragevariante des Bauvorhabens entfernt.Eine Relevantsetzung kann nur vorgenommen werden, wenn die Abfrage ein Bauvorhaben referenziert,die Abfrage im Status {@link StatusAbfrage#START_BEARBEITUNG} istund noch keine andere Abfrage als relevant markiert wurde. |
| [**updateBauvorhaben**](BauvorhabenApi.md#updatebauvorhaben) | **PUT** /bauvorhaben | Aktualisierung eines Bauvorhabens |



## createBauvorhaben

> BauvorhabenDto createBauvorhaben(bauvorhabenDto, abfrageId)

Anlegen eines neuen Bauvorhabens

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { CreateBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // BauvorhabenDto
    bauvorhabenDto: ...,
    // string (optional)
    abfrageId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CreateBauvorhabenRequest;

  try {
    const data = await api.createBauvorhaben(body);
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
| **bauvorhabenDto** | [BauvorhabenDto](BauvorhabenDto.md) |  | |
| **abfrageId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**BauvorhabenDto**](BauvorhabenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Bauvorhaben wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Bauvorhaben konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage mit dem Bauvorhaben zu verknüpfen. |  -  |
| **404** | NOT_FOUND -&gt; Die ausgewählte Abfrage existiert nicht mehr. |  -  |
| **409** | CONFLICT -&gt; Bauvorhaben konnte nicht erstellt werden, da bei einer Datenübernahme die Abfrage bereits ein Bauvorhaben referenziert. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteBauvorhaben

> deleteBauvorhaben(id)

Löschen eines Bauvorhabens

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { DeleteBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteBauvorhabenRequest;

  try {
    const data = await api.deleteBauvorhaben(body);
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
| **404** | NOT FOUND -&gt; Bauvorhaben mit dieser ID nicht vorhanden. |  -  |
| **409** | CONFLICT -&gt; Das Bauvorhaben wird durch Abfragen referenziert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getBauvorhabenById

> BauvorhabenDto getBauvorhabenById(id)

Lesen eines Bauvorhabens

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { GetBauvorhabenByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetBauvorhabenByIdRequest;

  try {
    const data = await api.getBauvorhabenById(body);
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

[**BauvorhabenDto**](BauvorhabenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | NOT FOUND -&gt; Bauvorhaben mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getReferencedAbfrage

> Array&lt;AbfrageSearchResultDto&gt; getReferencedAbfrage(id)

Lade alle Abfragen die einem Bauvorhaben angehören

Das Ergebnis wird anhand des Erstellungsdatums aufsteigend sortiert.

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { GetReferencedAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetReferencedAbfrageRequest;

  try {
    const data = await api.getReferencedAbfrage(body);
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

[**Array&lt;AbfrageSearchResultDto&gt;**](AbfrageSearchResultDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getReferencedInfrastruktureinrichtung

> Array&lt;InfrastruktureinrichtungSearchResultDto&gt; getReferencedInfrastruktureinrichtung(id)

Lade alle Infrastruktureinrichtungen die einem Bauvorhaben angehören

Das Ergebnis wird anhand des InfrastruktureinrichtungTyps und innerhalb des Types alphabetisch sortiert

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { GetReferencedInfrastruktureinrichtungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetReferencedInfrastruktureinrichtungRequest;

  try {
    const data = await api.getReferencedInfrastruktureinrichtung(body);
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

[**Array&lt;InfrastruktureinrichtungSearchResultDto&gt;**](InfrastruktureinrichtungSearchResultDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## putChangeRelevanteAbfragevariante

> BauvorhabenDto putChangeRelevanteAbfragevariante(abfragevarianteId)

Setzt die übergebene Abfragevariante als relevante Abfrage beim Bauvorhaben, welches mit der Abfrage der Abfragevariante verknüpft ist.Ist die Abfragevariante bereits als relevant markiert, wird die relevante Abfragevariante des Bauvorhabens entfernt.Eine Relevantsetzung kann nur vorgenommen werden, wenn die Abfrage ein Bauvorhaben referenziert,die Abfrage im Status {@link StatusAbfrage#START_BEARBEITUNG} istund noch keine andere Abfrage als relevant markiert wurde.

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { PutChangeRelevanteAbfragevarianteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // string
    abfragevarianteId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies PutChangeRelevanteAbfragevarianteRequest;

  try {
    const data = await api.putChangeRelevanteAbfragevariante(body);
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
| **abfragevarianteId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**BauvorhabenDto**](BauvorhabenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Relevante Abfragevariante erfolgreich geändert. |  -  |
| **400** | BAD_REQUEST -&gt; Relevante Abfragevariante konnte nicht geändert werden. |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage zu bearbeiten. |  -  |
| **404** | NOT_FOUND -&gt; Abfrage oder Abfragevariante nicht gefunden. |  -  |
| **409** | CONFLICT -&gt; Es wurde bereits eine andere Abfragevariante als relevant markiert oder die Abfrage referenziert kein Bauvorhaben. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateBauvorhaben

> BauvorhabenDto updateBauvorhaben(bauvorhabenDto)

Aktualisierung eines Bauvorhabens

### Example

```ts
import {
  Configuration,
  BauvorhabenApi,
} from '';
import type { UpdateBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenApi();

  const body = {
    // BauvorhabenDto
    bauvorhabenDto: ...,
  } satisfies UpdateBauvorhabenRequest;

  try {
    const data = await api.updateBauvorhaben(body);
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
| **bauvorhabenDto** | [BauvorhabenDto](BauvorhabenDto.md) |  | |

### Return type

[**BauvorhabenDto**](BauvorhabenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Bauvorhaben wurde erfolgreich aktualisiert. |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um die Abfrage mit dem Bauvorhaben zu verknüpfen. |  -  |
| **400** | BAD_REQUEST -&gt; Bauvorhaben konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Bauvorhaben mit dieser ID nicht vorhanden. |  -  |
| **409** | CONFLICT -&gt; Bauvorhaben konnte nicht aktualisiert werden, da bei einer Datenübernahme die Abfrage bereits ein Bauvorhaben referenziert. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Die Dateien konnten nicht gelöscht werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

