# KommentareApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createKommentarForBauvorhaben**](KommentareApi.md#createkommentarforbauvorhaben) | **POST** /kommentar/bauvorhaben | Anlegen eines neuen Kommentars für ein Bauvorhaben |
| [**createKommentarForInfrastruktureinrichtung**](KommentareApi.md#createkommentarforinfrastruktureinrichtung) | **POST** /kommentar/infrastruktureinrichtung | Anlegen eines neuen Kommentars für eine Infrastruktureinrichtung |
| [**createKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung**](KommentareApi.md#createkommentarforinfrastruktureinrichtungbedarfsmeldungsozialplanung) | **POST** /kommentar/infrastruktureinrichtung/bedarfsmeldung_sozialplanung | Anlegen eines neuen Kommentars für eine Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung |
| [**deleteKommentarForBauvorhaben**](KommentareApi.md#deletekommentarforbauvorhaben) | **DELETE** /kommentar/bauvorhaben/{id} | Löschen eines Kommentars eines Bauvorhabens |
| [**deleteKommentarForInfrastruktureinrichtung**](KommentareApi.md#deletekommentarforinfrastruktureinrichtung) | **DELETE** /kommentar/infrastruktureinrichtung/{id} | Löschen eines Kommentars einer Infrastruktureinrichtung |
| [**deleteKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung**](KommentareApi.md#deletekommentarforinfrastruktureinrichtungbedarfsmeldungsozialplanung) | **DELETE** /kommentar/infrastruktureinrichtung/bedarfsmeldung_sozialplanung/{id} | Löschen eines Kommentars einer Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung |
| [**getKommentareForBauvorhaben**](KommentareApi.md#getkommentareforbauvorhaben) | **GET** /kommentar/all/bauvorhaben/{bauvorhabenId} | Holen der Kommentare eines Bauvorhabens |
| [**getKommentareForInfrastruktureinrichtung**](KommentareApi.md#getkommentareforinfrastruktureinrichtung) | **GET** /kommentar/all/infrastruktureinrichtung/{infrastruktureinrichtungId} | Holen der Kommentare einer Infrastruktureinrichtung |
| [**updateKommentarForBauvorhaben**](KommentareApi.md#updatekommentarforbauvorhaben) | **PUT** /kommentar/bauvorhaben | Aktualisierung eines Kommentars eines Bauvorhabens |
| [**updateKommentarForInfrastruktureinrichtung**](KommentareApi.md#updatekommentarforinfrastruktureinrichtung) | **PUT** /kommentar/infrastruktureinrichtung | Aktualisierung eines Kommentars für eine Infrastruktureinrichtung |
| [**updateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung**](KommentareApi.md#updatekommentarforinfrastruktureinrichtungbedarfsmeldungsozialplanung) | **PUT** /kommentar/infrastruktureinrichtung/bedarfsmeldung_sozialplanung | Aktualisierung eines Kommentars für eine Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung |



## createKommentarForBauvorhaben

> KommentarBauvorhabenDto createKommentarForBauvorhaben(kommentarBauvorhabenDto)

Anlegen eines neuen Kommentars für ein Bauvorhaben

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { CreateKommentarForBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // KommentarBauvorhabenDto
    kommentarBauvorhabenDto: ...,
  } satisfies CreateKommentarForBauvorhabenRequest;

  try {
    const data = await api.createKommentarForBauvorhaben(body);
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
| **kommentarBauvorhabenDto** | [KommentarBauvorhabenDto](KommentarBauvorhabenDto.md) |  | |

### Return type

[**KommentarBauvorhabenDto**](KommentarBauvorhabenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Kommentar wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createKommentarForInfrastruktureinrichtung

> KommentarInfrastruktureinrichtungDto createKommentarForInfrastruktureinrichtung(kommentarInfrastruktureinrichtungDto)

Anlegen eines neuen Kommentars für eine Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { CreateKommentarForInfrastruktureinrichtungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // KommentarInfrastruktureinrichtungDto
    kommentarInfrastruktureinrichtungDto: ...,
  } satisfies CreateKommentarForInfrastruktureinrichtungRequest;

  try {
    const data = await api.createKommentarForInfrastruktureinrichtung(body);
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
| **kommentarInfrastruktureinrichtungDto** | [KommentarInfrastruktureinrichtungDto](KommentarInfrastruktureinrichtungDto.md) |  | |

### Return type

[**KommentarInfrastruktureinrichtungDto**](KommentarInfrastruktureinrichtungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Kommentar wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung

> KommentarInfrastruktureinrichtungDto createKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung(kommentarInfrastruktureinrichtungDto)

Anlegen eines neuen Kommentars für eine Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { CreateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // KommentarInfrastruktureinrichtungDto
    kommentarInfrastruktureinrichtungDto: ...,
  } satisfies CreateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest;

  try {
    const data = await api.createKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung(body);
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
| **kommentarInfrastruktureinrichtungDto** | [KommentarInfrastruktureinrichtungDto](KommentarInfrastruktureinrichtungDto.md) |  | |

### Return type

[**KommentarInfrastruktureinrichtungDto**](KommentarInfrastruktureinrichtungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Kommentar wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteKommentarForBauvorhaben

> object deleteKommentarForBauvorhaben(id)

Löschen eines Kommentars eines Bauvorhabens

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { DeleteKommentarForBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteKommentarForBauvorhabenRequest;

  try {
    const data = await api.deleteKommentarForBauvorhaben(body);
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

**object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | NO CONTENT |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht gelöscht werden |  -  |
| **404** | NOT FOUND -&gt; Kommentar mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteKommentarForInfrastruktureinrichtung

> object deleteKommentarForInfrastruktureinrichtung(id)

Löschen eines Kommentars einer Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { DeleteKommentarForInfrastruktureinrichtungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteKommentarForInfrastruktureinrichtungRequest;

  try {
    const data = await api.deleteKommentarForInfrastruktureinrichtung(body);
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

**object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | NO CONTENT |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht gelöscht werden |  -  |
| **404** | NOT FOUND -&gt; Kommentar mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung

> object deleteKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung(id)

Löschen eines Kommentars einer Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { DeleteKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest;

  try {
    const data = await api.deleteKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung(body);
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

**object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | NO CONTENT |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht gelöscht werden |  -  |
| **404** | NOT FOUND -&gt; Kommentar mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getKommentareForBauvorhaben

> Array&lt;KommentarBauvorhabenDto&gt; getKommentareForBauvorhaben(bauvorhabenId)

Holen der Kommentare eines Bauvorhabens

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { GetKommentareForBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // string
    bauvorhabenId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetKommentareForBauvorhabenRequest;

  try {
    const data = await api.getKommentareForBauvorhaben(body);
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
| **bauvorhabenId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;KommentarBauvorhabenDto&gt;**](KommentarBauvorhabenDto.md)

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


## getKommentareForInfrastruktureinrichtung

> Array&lt;KommentarInfrastruktureinrichtungDto&gt; getKommentareForInfrastruktureinrichtung(infrastruktureinrichtungId)

Holen der Kommentare einer Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { GetKommentareForInfrastruktureinrichtungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // string
    infrastruktureinrichtungId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetKommentareForInfrastruktureinrichtungRequest;

  try {
    const data = await api.getKommentareForInfrastruktureinrichtung(body);
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
| **infrastruktureinrichtungId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;KommentarInfrastruktureinrichtungDto&gt;**](KommentarInfrastruktureinrichtungDto.md)

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


## updateKommentarForBauvorhaben

> KommentarBauvorhabenDto updateKommentarForBauvorhaben(kommentarBauvorhabenDto)

Aktualisierung eines Kommentars eines Bauvorhabens

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { UpdateKommentarForBauvorhabenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // KommentarBauvorhabenDto
    kommentarBauvorhabenDto: ...,
  } satisfies UpdateKommentarForBauvorhabenRequest;

  try {
    const data = await api.updateKommentarForBauvorhaben(body);
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
| **kommentarBauvorhabenDto** | [KommentarBauvorhabenDto](KommentarBauvorhabenDto.md) |  | |

### Return type

[**KommentarBauvorhabenDto**](KommentarBauvorhabenDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Kommentar wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Kommentar mit dieser ID nicht vorhanden. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateKommentarForInfrastruktureinrichtung

> KommentarInfrastruktureinrichtungDto updateKommentarForInfrastruktureinrichtung(kommentarInfrastruktureinrichtungDto)

Aktualisierung eines Kommentars für eine Infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { UpdateKommentarForInfrastruktureinrichtungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // KommentarInfrastruktureinrichtungDto
    kommentarInfrastruktureinrichtungDto: ...,
  } satisfies UpdateKommentarForInfrastruktureinrichtungRequest;

  try {
    const data = await api.updateKommentarForInfrastruktureinrichtung(body);
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
| **kommentarInfrastruktureinrichtungDto** | [KommentarInfrastruktureinrichtungDto](KommentarInfrastruktureinrichtungDto.md) |  | |

### Return type

[**KommentarInfrastruktureinrichtungDto**](KommentarInfrastruktureinrichtungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Kommentar wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Kommentar mit dieser ID nicht vorhanden. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung

> KommentarInfrastruktureinrichtungDto updateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung(kommentarInfrastruktureinrichtungDto)

Aktualisierung eines Kommentars für eine Infrastruktureinrichtung für die Rolle Bedarfsmeldung Sozialplanung

### Example

```ts
import {
  Configuration,
  KommentareApi,
} from '';
import type { UpdateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentareApi();

  const body = {
    // KommentarInfrastruktureinrichtungDto
    kommentarInfrastruktureinrichtungDto: ...,
  } satisfies UpdateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest;

  try {
    const data = await api.updateKommentarForInfrastruktureinrichtungBedarfsmeldungSozialplanung(body);
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
| **kommentarInfrastruktureinrichtungDto** | [KommentarInfrastruktureinrichtungDto](KommentarInfrastruktureinrichtungDto.md) |  | |

### Return type

[**KommentarInfrastruktureinrichtungDto**](KommentarInfrastruktureinrichtungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Kommentar wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Kommentar konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **404** | NOT_FOUND -&gt; Kommentar mit dieser ID nicht vorhanden. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

