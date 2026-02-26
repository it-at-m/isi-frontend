# AbfragevarianteWeiteresVerfahrenEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceAbfragevarianteweiteresverfahrenDelete**](AbfragevarianteWeiteresVerfahrenEntityControllerApi.md#deleteitemresourceabfragevarianteweiteresverfahrendelete) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id} |  |
| [**getCollectionResourceAbfragevarianteweiteresverfahrenGet**](AbfragevarianteWeiteresVerfahrenEntityControllerApi.md#getcollectionresourceabfragevarianteweiteresverfahrenget) | **GET** /abfragevarianteWeiteresVerfahrens |  |
| [**getItemResourceAbfragevarianteweiteresverfahrenGet**](AbfragevarianteWeiteresVerfahrenEntityControllerApi.md#getitemresourceabfragevarianteweiteresverfahrenget) | **GET** /abfragevarianteWeiteresVerfahrens/{id} |  |
| [**patchItemResourceAbfragevarianteweiteresverfahrenPatch**](AbfragevarianteWeiteresVerfahrenEntityControllerApi.md#patchitemresourceabfragevarianteweiteresverfahrenpatch) | **PATCH** /abfragevarianteWeiteresVerfahrens/{id} |  |
| [**postCollectionResourceAbfragevarianteweiteresverfahrenPost**](AbfragevarianteWeiteresVerfahrenEntityControllerApi.md#postcollectionresourceabfragevarianteweiteresverfahrenpost) | **POST** /abfragevarianteWeiteresVerfahrens |  |
| [**putItemResourceAbfragevarianteweiteresverfahrenPut**](AbfragevarianteWeiteresVerfahrenEntityControllerApi.md#putitemresourceabfragevarianteweiteresverfahrenput) | **PUT** /abfragevarianteWeiteresVerfahrens/{id} |  |



## deleteItemResourceAbfragevarianteweiteresverfahrenDelete

> deleteItemResourceAbfragevarianteweiteresverfahrenDelete(id)



delete-abfragevarianteweiteresverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenEntityControllerApi,
} from '';
import type { DeleteItemResourceAbfragevarianteweiteresverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceAbfragevarianteweiteresverfahrenDeleteRequest;

  try {
    const data = await api.deleteItemResourceAbfragevarianteweiteresverfahrenDelete(body);
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


## getCollectionResourceAbfragevarianteweiteresverfahrenGet

> PagedModelEntityModelAbfragevarianteWeiteresVerfahren getCollectionResourceAbfragevarianteweiteresverfahrenGet(page, size, sort)



get-abfragevarianteweiteresverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenEntityControllerApi,
} from '';
import type { GetCollectionResourceAbfragevarianteweiteresverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceAbfragevarianteweiteresverfahrenGetRequest;

  try {
    const data = await api.getCollectionResourceAbfragevarianteweiteresverfahrenGet(body);
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

[**PagedModelEntityModelAbfragevarianteWeiteresVerfahren**](PagedModelEntityModelAbfragevarianteWeiteresVerfahren.md)

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


## getItemResourceAbfragevarianteweiteresverfahrenGet

> EntityModelAbfragevarianteWeiteresVerfahren getItemResourceAbfragevarianteweiteresverfahrenGet(id)



get-abfragevarianteweiteresverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenEntityControllerApi,
} from '';
import type { GetItemResourceAbfragevarianteweiteresverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceAbfragevarianteweiteresverfahrenGetRequest;

  try {
    const data = await api.getItemResourceAbfragevarianteweiteresverfahrenGet(body);
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

[**EntityModelAbfragevarianteWeiteresVerfahren**](EntityModelAbfragevarianteWeiteresVerfahren.md)

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


## patchItemResourceAbfragevarianteweiteresverfahrenPatch

> EntityModelAbfragevarianteWeiteresVerfahren patchItemResourceAbfragevarianteweiteresverfahrenPatch(id, abfragevarianteWeiteresVerfahrenRequestBody)



patch-abfragevarianteweiteresverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenEntityControllerApi,
} from '';
import type { PatchItemResourceAbfragevarianteweiteresverfahrenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteWeiteresVerfahrenRequestBody
    abfragevarianteWeiteresVerfahrenRequestBody: ...,
  } satisfies PatchItemResourceAbfragevarianteweiteresverfahrenPatchRequest;

  try {
    const data = await api.patchItemResourceAbfragevarianteweiteresverfahrenPatch(body);
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
| **abfragevarianteWeiteresVerfahrenRequestBody** | [AbfragevarianteWeiteresVerfahrenRequestBody](AbfragevarianteWeiteresVerfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteWeiteresVerfahren**](EntityModelAbfragevarianteWeiteresVerfahren.md)

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


## postCollectionResourceAbfragevarianteweiteresverfahrenPost

> EntityModelAbfragevarianteWeiteresVerfahren postCollectionResourceAbfragevarianteweiteresverfahrenPost(abfragevarianteWeiteresVerfahrenRequestBody)



create-abfragevarianteweiteresverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenEntityControllerApi,
} from '';
import type { PostCollectionResourceAbfragevarianteweiteresverfahrenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenEntityControllerApi();

  const body = {
    // AbfragevarianteWeiteresVerfahrenRequestBody
    abfragevarianteWeiteresVerfahrenRequestBody: ...,
  } satisfies PostCollectionResourceAbfragevarianteweiteresverfahrenPostRequest;

  try {
    const data = await api.postCollectionResourceAbfragevarianteweiteresverfahrenPost(body);
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
| **abfragevarianteWeiteresVerfahrenRequestBody** | [AbfragevarianteWeiteresVerfahrenRequestBody](AbfragevarianteWeiteresVerfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteWeiteresVerfahren**](EntityModelAbfragevarianteWeiteresVerfahren.md)

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


## putItemResourceAbfragevarianteweiteresverfahrenPut

> EntityModelAbfragevarianteWeiteresVerfahren putItemResourceAbfragevarianteweiteresverfahrenPut(id, abfragevarianteWeiteresVerfahrenRequestBody)



update-abfragevarianteweiteresverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenEntityControllerApi,
} from '';
import type { PutItemResourceAbfragevarianteweiteresverfahrenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteWeiteresVerfahrenRequestBody
    abfragevarianteWeiteresVerfahrenRequestBody: ...,
  } satisfies PutItemResourceAbfragevarianteweiteresverfahrenPutRequest;

  try {
    const data = await api.putItemResourceAbfragevarianteweiteresverfahrenPut(body);
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
| **abfragevarianteWeiteresVerfahrenRequestBody** | [AbfragevarianteWeiteresVerfahrenRequestBody](AbfragevarianteWeiteresVerfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteWeiteresVerfahren**](EntityModelAbfragevarianteWeiteresVerfahren.md)

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

