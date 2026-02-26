# AbfragevarianteEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceAbfragevarianteDelete**](AbfragevarianteEntityControllerApi.md#deleteitemresourceabfragevariantedelete) | **DELETE** /abfragevariantes/{id} |  |
| [**getCollectionResourceAbfragevarianteGet**](AbfragevarianteEntityControllerApi.md#getcollectionresourceabfragevarianteget) | **GET** /abfragevariantes |  |
| [**getItemResourceAbfragevarianteGet**](AbfragevarianteEntityControllerApi.md#getitemresourceabfragevarianteget) | **GET** /abfragevariantes/{id} |  |
| [**patchItemResourceAbfragevariantePatch**](AbfragevarianteEntityControllerApi.md#patchitemresourceabfragevariantepatch) | **PATCH** /abfragevariantes/{id} |  |
| [**postCollectionResourceAbfragevariantePost**](AbfragevarianteEntityControllerApi.md#postcollectionresourceabfragevariantepost) | **POST** /abfragevariantes |  |
| [**putItemResourceAbfragevariantePut**](AbfragevarianteEntityControllerApi.md#putitemresourceabfragevarianteput) | **PUT** /abfragevariantes/{id} |  |



## deleteItemResourceAbfragevarianteDelete

> deleteItemResourceAbfragevarianteDelete(id)



delete-abfragevariante

### Example

```ts
import {
  Configuration,
  AbfragevarianteEntityControllerApi,
} from '';
import type { DeleteItemResourceAbfragevarianteDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceAbfragevarianteDeleteRequest;

  try {
    const data = await api.deleteItemResourceAbfragevarianteDelete(body);
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
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCollectionResourceAbfragevarianteGet

> PagedModelEntityModelAbfragevariante getCollectionResourceAbfragevarianteGet(page, size, sort)



get-abfragevariante

### Example

```ts
import {
  Configuration,
  AbfragevarianteEntityControllerApi,
} from '';
import type { GetCollectionResourceAbfragevarianteGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceAbfragevarianteGetRequest;

  try {
    const data = await api.getCollectionResourceAbfragevarianteGet(body);
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
| **page** | `number` | Zero-based page index (0..N) | [Optional] [Defaults to `0`] |
| **size** | `number` | The size of the page to be returned | [Optional] [Defaults to `20`] |
| **sort** | `Array<string>` | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. | [Optional] |

### Return type

[**PagedModelEntityModelAbfragevariante**](PagedModelEntityModelAbfragevariante.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`, `application/x-spring-data-compact+json`, `text/uri-list`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getItemResourceAbfragevarianteGet

> EntityModelAbfragevariante getItemResourceAbfragevarianteGet(id)



get-abfragevariante

### Example

```ts
import {
  Configuration,
  AbfragevarianteEntityControllerApi,
} from '';
import type { GetItemResourceAbfragevarianteGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceAbfragevarianteGetRequest;

  try {
    const data = await api.getItemResourceAbfragevarianteGet(body);
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

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## patchItemResourceAbfragevariantePatch

> EntityModelAbfragevariante patchItemResourceAbfragevariantePatch(id, abfragevarianteRequestBody)



patch-abfragevariante

### Example

```ts
import {
  Configuration,
  AbfragevarianteEntityControllerApi,
} from '';
import type { PatchItemResourceAbfragevariantePatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteRequestBody
    abfragevarianteRequestBody: ...,
  } satisfies PatchItemResourceAbfragevariantePatchRequest;

  try {
    const data = await api.patchItemResourceAbfragevariantePatch(body);
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
| **abfragevarianteRequestBody** | [AbfragevarianteRequestBody](AbfragevarianteRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## postCollectionResourceAbfragevariantePost

> EntityModelAbfragevariante postCollectionResourceAbfragevariantePost(abfragevarianteRequestBody)



create-abfragevariante

### Example

```ts
import {
  Configuration,
  AbfragevarianteEntityControllerApi,
} from '';
import type { PostCollectionResourceAbfragevariantePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteEntityControllerApi();

  const body = {
    // AbfragevarianteRequestBody
    abfragevarianteRequestBody: ...,
  } satisfies PostCollectionResourceAbfragevariantePostRequest;

  try {
    const data = await api.postCollectionResourceAbfragevariantePost(body);
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
| **abfragevarianteRequestBody** | [AbfragevarianteRequestBody](AbfragevarianteRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## putItemResourceAbfragevariantePut

> EntityModelAbfragevariante putItemResourceAbfragevariantePut(id, abfragevarianteRequestBody)



update-abfragevariante

### Example

```ts
import {
  Configuration,
  AbfragevarianteEntityControllerApi,
} from '';
import type { PutItemResourceAbfragevariantePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteRequestBody
    abfragevarianteRequestBody: ...,
  } satisfies PutItemResourceAbfragevariantePutRequest;

  try {
    const data = await api.putItemResourceAbfragevariantePut(body);
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
| **abfragevarianteRequestBody** | [AbfragevarianteRequestBody](AbfragevarianteRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **201** | Created |  -  |
| **204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

