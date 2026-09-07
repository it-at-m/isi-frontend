# PersonalFilterApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createFilter**](PersonalFilterApi.md#createfilter) | **POST** /personal-filter/create | Anlegen eines neuen persönlichen Filters |
| [**deleteFilter**](PersonalFilterApi.md#deletefilter) | **DELETE** /personal-filter/delete/{filterId} | Löschen eines persönlichen Filters |
| [**editFilter**](PersonalFilterApi.md#editfilter) | **PATCH** /personal-filter/edit | Aktualisierung eines persönlichen Filters. |
| [**getByFilterID**](PersonalFilterApi.md#getbyfilterid) | **GET** /personal-filter/{filterId} | Lesen eines persönlichen Filters. |
| [**getPersonalFilters**](PersonalFilterApi.md#getpersonalfilters) | **GET** /personal-filter | Lesen aller persönlichen Filter. |



## createFilter

> PersonalFilterResponseDto createFilter(personalFilterRequestDto)

Anlegen eines neuen persönlichen Filters

### Example

```ts
import {
  Configuration,
  PersonalFilterApi,
} from '';
import type { CreateFilterRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterApi();

  const body = {
    // PersonalFilterRequestDto
    personalFilterRequestDto: ...,
  } satisfies CreateFilterRequest;

  try {
    const data = await api.createFilter(body);
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
| **personalFilterRequestDto** | [PersonalFilterRequestDto](PersonalFilterRequestDto.md) |  | |

### Return type

[**PersonalFilterResponseDto**](PersonalFilterResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | CREATED -&gt; Persönlicher Filter wurde erfolgreich erstellt. |  -  |
| **400** | BAD_REQUEST -&gt; Persönlicher Filter konnte nicht erstellt werden, überprüfen sie die Eingabe. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteFilter

> deleteFilter(filterId)

Löschen eines persönlichen Filters

### Example

```ts
import {
  Configuration,
  PersonalFilterApi,
} from '';
import type { DeleteFilterRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterApi();

  const body = {
    // string
    filterId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteFilterRequest;

  try {
    const data = await api.deleteFilter(body);
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
| **filterId** | `string` |  | [Defaults to `undefined`] |

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
| **404** | NOT FOUND -&gt; Persönlicher Filter mit dieser ID nicht vorhanden. |  -  |
| **403** | CONFLICT -&gt; Keine Berechtigung zum Löschen dieses persönlichen Filters. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editFilter

> PersonalFilterResponseDto editFilter(personalFilterRequestDto)

Aktualisierung eines persönlichen Filters.

### Example

```ts
import {
  Configuration,
  PersonalFilterApi,
} from '';
import type { EditFilterRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterApi();

  const body = {
    // PersonalFilterRequestDto
    personalFilterRequestDto: ...,
  } satisfies EditFilterRequest;

  try {
    const data = await api.editFilter(body);
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
| **personalFilterRequestDto** | [PersonalFilterRequestDto](PersonalFilterRequestDto.md) |  | |

### Return type

[**PersonalFilterResponseDto**](PersonalFilterResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Persönlicher Filter wurde erfolgreich aktualisiert. |  -  |
| **400** | BAD_REQUEST -&gt; Persönlicher Filter konnte nicht aktualisiert werden, überprüfen sie die Eingabe. |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um diesen persönlicher Filter zu bearbeiten. |  -  |
| **404** | NOT FOUND -&gt; Persönlicher Filter mit dieser ID nicht vorhanden. |  -  |
| **412** | PRECONDITION_FAILED -&gt; In der Anwendung ist bereits eine neuere Version der Entität gespeichert. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getByFilterID

> PersonalFilterResponseDto getByFilterID(filterId)

Lesen eines persönlichen Filters.

### Example

```ts
import {
  Configuration,
  PersonalFilterApi,
} from '';
import type { GetByFilterIDRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterApi();

  const body = {
    // string
    filterId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetByFilterIDRequest;

  try {
    const data = await api.getByFilterID(body);
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
| **filterId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**PersonalFilterResponseDto**](PersonalFilterResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um diesen persönlichen Filter anzusehen. |  -  |
| **404** | NOT FOUND -&gt; Persönlicher Filter mit dieser ID nicht vorhanden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPersonalFilters

> Array&lt;PersonalFilterResponseDto&gt; getPersonalFilters()

Lesen aller persönlichen Filter.

### Example

```ts
import {
  Configuration,
  PersonalFilterApi,
} from '';
import type { GetPersonalFiltersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterApi();

  try {
    const data = await api.getPersonalFilters();
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

[**Array&lt;PersonalFilterResponseDto&gt;**](PersonalFilterResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **403** | FORBIDDEN -&gt; Keine Berechtigung um alle persönlichen Filter anzusehen. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

