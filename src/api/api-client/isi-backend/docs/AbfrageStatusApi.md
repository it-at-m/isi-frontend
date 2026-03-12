# AbfrageStatusApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**abbrechenAbfrage**](AbfrageStatusApi.md#abbrechenabfrage) | **PUT** /abfrage-status/{id}/abbrechen | Setzt eine Abfrage auf den Status ABBRUCH |
| [**bedarfsmeldungErfolgt**](AbfrageStatusApi.md#bedarfsmeldungerfolgt) | **PUT** /abfrage-status/{id}/bedarfsmeldung-erfolgt | Setzt eine Abfrage auf den Status EINPLANUNG_BEDARFE |
| [**erledigtMitFachreferat**](AbfrageStatusApi.md#erledigtmitfachreferat) | **PUT** /abfrage-status/{id}/erledigt-mit-fachreferat | Setzt eine Abfrage auf den Status ERLEDIGT_MIT_FACHREFERAT |
| [**erledigtOhneFachreferat**](AbfrageStatusApi.md#erledigtohnefachreferat) | **PUT** /abfrage-status/{id}/erledigt-ohne-fachreferat | Setzt eine Abfrage auf den Status ERLEDIGT_OHNE_FACHREFERAT |
| [**erneuteBearbeitungSachbearbeitung**](AbfrageStatusApi.md#erneutebearbeitungsachbearbeitung) | **PUT** /abfrage-status/{id}/erneute-bearbeitung-sachbearbeitung | Setzt eine Abfrage auf den Status START_BEARBEITUNG |
| [**freigabeAbfrage**](AbfrageStatusApi.md#freigabeabfrage) | **PUT** /abfrage-status/{id}/freigabe | Setzt eine Abfrage auf den Status UEBERMITTELT_ZUR_BEARBEITUNG |
| [**inBearbeitungSetzenAbfrage**](AbfrageStatusApi.md#inbearbeitungsetzenabfrage) | **PUT** /abfrage-status/{id}/in-bearbeitung-setzen | Setzt eine Abfrage auf den Status START_BEARBEITUNG |
| [**transitionsAbfrage**](AbfrageStatusApi.md#transitionsabfrage) | **GET** /abfrage-status/{id}/transitions | Holt alle möglichen StatusAbfrage Transitions auf Basis der Authorities und des aktuellen Status |
| [**verschickenDerStellungnahme**](AbfrageStatusApi.md#verschickenderstellungnahme) | **PUT** /abfrage-status/{id}/verschicken-der-stellungnahme | Setzt eine Abfrage auf den Status EINPFLEGEN_BEDARFSMELDUNG |
| [**zurueckAnAbfrageerstellungAbfrage**](AbfrageStatusApi.md#zurueckanabfrageerstellungabfrage) | **PUT** /abfrage-status/{id}/zurueck-an-abfrageerstellung | Setzt eine Abfrage auf den Status ANGELEGT |
| [**zurueckAnSachbearbeitungAbfrage**](AbfrageStatusApi.md#zurueckansachbearbeitungabfrage) | **PUT** /abfrage-status/{id}/zurueck-an-sachbearbeitung | Setzt eine Abfrage auf den Status START_BEARBEITUNG |



## abbrechenAbfrage

> abbrechenAbfrage(id, anmerkung)

Setzt eine Abfrage auf den Status ABBRUCH

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { AbbrechenAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies AbbrechenAbfrageRequest;

  try {
    const data = await api.abbrechenAbfrage(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich abbgebrochen. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht abgebrochen werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## bedarfsmeldungErfolgt

> bedarfsmeldungErfolgt(id, anmerkung)

Setzt eine Abfrage auf den Status EINPLANUNG_BEDARFE

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { BedarfsmeldungErfolgtRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies BedarfsmeldungErfolgtRequest;

  try {
    const data = await api.bedarfsmeldungErfolgt(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Die Bedarfsmeldung der Fachreferate ist erfolgt |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Bedarfsmeldung konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht erfolgen |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## erledigtMitFachreferat

> erledigtMitFachreferat(id, anmerkung)

Setzt eine Abfrage auf den Status ERLEDIGT_MIT_FACHREFERAT

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { ErledigtMitFachreferatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies ErledigtMitFachreferatRequest;

  try {
    const data = await api.erledigtMitFachreferat(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich erledigt. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht erledigt werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## erledigtOhneFachreferat

> erledigtOhneFachreferat(id, anmerkung)

Setzt eine Abfrage auf den Status ERLEDIGT_OHNE_FACHREFERAT

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { ErledigtOhneFachreferatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies ErledigtOhneFachreferatRequest;

  try {
    const data = await api.erledigtOhneFachreferat(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich erledigt. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht erledgit werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## erneuteBearbeitungSachbearbeitung

> erneuteBearbeitungSachbearbeitung(id, anmerkung)

Setzt eine Abfrage auf den Status START_BEARBEITUNG

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { ErneuteBearbeitungSachbearbeitungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies ErneuteBearbeitungSachbearbeitungRequest;

  try {
    const data = await api.erneuteBearbeitungSachbearbeitung(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich zur bearbeitung freigestellt. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht erledigt werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## freigabeAbfrage

> freigabeAbfrage(id, anmerkung)

Setzt eine Abfrage auf den Status UEBERMITTELT_ZUR_BEARBEITUNG

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { FreigabeAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies FreigabeAbfrageRequest;

  try {
    const data = await api.freigabeAbfrage(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich freigegeben. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht freigegeben werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## inBearbeitungSetzenAbfrage

> inBearbeitungSetzenAbfrage(id, anmerkung)

Setzt eine Abfrage auf den Status START_BEARBEITUNG

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { InBearbeitungSetzenAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies InBearbeitungSetzenAbfrageRequest;

  try {
    const data = await api.inBearbeitungSetzenAbfrage(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich zurückgegeben an den Abfrage Ersteller. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht zur Bearbeitung zurückgegeben werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## transitionsAbfrage

> Array&lt;TransitionDto&gt; transitionsAbfrage(id)

Holt alle möglichen StatusAbfrage Transitions auf Basis der Authorities und des aktuellen Status

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { TransitionsAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies TransitionsAbfrageRequest;

  try {
    const data = await api.transitionsAbfrage(body);
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

[**Array&lt;TransitionDto&gt;**](TransitionDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Alle mögliche Transistions gefunden |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## verschickenDerStellungnahme

> verschickenDerStellungnahme(id, anmerkung)

Setzt eine Abfrage auf den Status EINPFLEGEN_BEDARFSMELDUNG

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { VerschickenDerStellungnahmeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies VerschickenDerStellungnahmeRequest;

  try {
    const data = await api.verschickenDerStellungnahme(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich an RBS oder SOZ zur Bearbeitung weitergegeben. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht weitergegeben werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## zurueckAnAbfrageerstellungAbfrage

> zurueckAnAbfrageerstellungAbfrage(id, anmerkung)

Setzt eine Abfrage auf den Status ANGELEGT

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { ZurueckAnAbfrageerstellungAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies ZurueckAnAbfrageerstellungAbfrageRequest;

  try {
    const data = await api.zurueckAnAbfrageerstellungAbfrage(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich zurückgegeben an den Abfrage Ersteller. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht zur Bearbeitung zurückgegeben werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## zurueckAnSachbearbeitungAbfrage

> zurueckAnSachbearbeitungAbfrage(id, anmerkung)

Setzt eine Abfrage auf den Status START_BEARBEITUNG

### Example

```ts
import {
  Configuration,
  AbfrageStatusApi,
} from '';
import type { ZurueckAnSachbearbeitungAbfrageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageStatusApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    anmerkung: anmerkung_example,
  } satisfies ZurueckAnSachbearbeitungAbfrageRequest;

  try {
    const data = await api.zurueckAnSachbearbeitungAbfrage(body);
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
| **anmerkung** | `string` |  | [Optional] [Defaults to `&#39;&#39;`] |

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
| **200** | OK -&gt; Abfrage wurde erfolgreich zurückgegeben an den Abfrage Ersteller. |  -  |
| **403** | FORBIDDEN -&gt; Sie haben keine Berechtigung, den Statuswechsel durchzuführen. |  -  |
| **404** | NOT_FOUND -&gt; Es gibt keine Abfrage mit der ID. |  -  |
| **409** | CONFLICT -&gt; Die Abfrage konnte aufgrund des aktuellen Status oder des bereits existierenden Abfragenamen nicht zur Bearbeitung zurückgegeben werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

