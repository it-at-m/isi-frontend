# AbfragevarianteBauleitplanverfahrenEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceAbfragevariantebauleitplanverfahrenDelete**](AbfragevarianteBauleitplanverfahrenEntityControllerApi.md#deleteitemresourceabfragevariantebauleitplanverfahrendelete) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id} |  |
| [**getCollectionResourceAbfragevariantebauleitplanverfahrenGet**](AbfragevarianteBauleitplanverfahrenEntityControllerApi.md#getcollectionresourceabfragevariantebauleitplanverfahrenget) | **GET** /abfragevarianteBauleitplanverfahrens |  |
| [**getItemResourceAbfragevariantebauleitplanverfahrenGet**](AbfragevarianteBauleitplanverfahrenEntityControllerApi.md#getitemresourceabfragevariantebauleitplanverfahrenget) | **GET** /abfragevarianteBauleitplanverfahrens/{id} |  |
| [**patchItemResourceAbfragevariantebauleitplanverfahrenPatch**](AbfragevarianteBauleitplanverfahrenEntityControllerApi.md#patchitemresourceabfragevariantebauleitplanverfahrenpatch) | **PATCH** /abfragevarianteBauleitplanverfahrens/{id} |  |
| [**postCollectionResourceAbfragevariantebauleitplanverfahrenPost**](AbfragevarianteBauleitplanverfahrenEntityControllerApi.md#postcollectionresourceabfragevariantebauleitplanverfahrenpost) | **POST** /abfragevarianteBauleitplanverfahrens |  |
| [**putItemResourceAbfragevariantebauleitplanverfahrenPut**](AbfragevarianteBauleitplanverfahrenEntityControllerApi.md#putitemresourceabfragevariantebauleitplanverfahrenput) | **PUT** /abfragevarianteBauleitplanverfahrens/{id} |  |



## deleteItemResourceAbfragevariantebauleitplanverfahrenDelete

> deleteItemResourceAbfragevariantebauleitplanverfahrenDelete(id)



delete-abfragevariantebauleitplanverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenEntityControllerApi,
} from '';
import type { DeleteItemResourceAbfragevariantebauleitplanverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceAbfragevariantebauleitplanverfahrenDeleteRequest;

  try {
    const data = await api.deleteItemResourceAbfragevariantebauleitplanverfahrenDelete(body);
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


## getCollectionResourceAbfragevariantebauleitplanverfahrenGet

> PagedModelEntityModelAbfragevarianteBauleitplanverfahren getCollectionResourceAbfragevariantebauleitplanverfahrenGet(page, size, sort)



get-abfragevariantebauleitplanverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenEntityControllerApi,
} from '';
import type { GetCollectionResourceAbfragevariantebauleitplanverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceAbfragevariantebauleitplanverfahrenGetRequest;

  try {
    const data = await api.getCollectionResourceAbfragevariantebauleitplanverfahrenGet(body);
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

[**PagedModelEntityModelAbfragevarianteBauleitplanverfahren**](PagedModelEntityModelAbfragevarianteBauleitplanverfahren.md)

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


## getItemResourceAbfragevariantebauleitplanverfahrenGet

> EntityModelAbfragevarianteBauleitplanverfahren getItemResourceAbfragevariantebauleitplanverfahrenGet(id)



get-abfragevariantebauleitplanverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenEntityControllerApi,
} from '';
import type { GetItemResourceAbfragevariantebauleitplanverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceAbfragevariantebauleitplanverfahrenGetRequest;

  try {
    const data = await api.getItemResourceAbfragevariantebauleitplanverfahrenGet(body);
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

[**EntityModelAbfragevarianteBauleitplanverfahren**](EntityModelAbfragevarianteBauleitplanverfahren.md)

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


## patchItemResourceAbfragevariantebauleitplanverfahrenPatch

> EntityModelAbfragevarianteBauleitplanverfahren patchItemResourceAbfragevariantebauleitplanverfahrenPatch(id, abfragevarianteBauleitplanverfahrenRequestBody)



patch-abfragevariantebauleitplanverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenEntityControllerApi,
} from '';
import type { PatchItemResourceAbfragevariantebauleitplanverfahrenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteBauleitplanverfahrenRequestBody
    abfragevarianteBauleitplanverfahrenRequestBody: ...,
  } satisfies PatchItemResourceAbfragevariantebauleitplanverfahrenPatchRequest;

  try {
    const data = await api.patchItemResourceAbfragevariantebauleitplanverfahrenPatch(body);
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
| **abfragevarianteBauleitplanverfahrenRequestBody** | [AbfragevarianteBauleitplanverfahrenRequestBody](AbfragevarianteBauleitplanverfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteBauleitplanverfahren**](EntityModelAbfragevarianteBauleitplanverfahren.md)

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


## postCollectionResourceAbfragevariantebauleitplanverfahrenPost

> EntityModelAbfragevarianteBauleitplanverfahren postCollectionResourceAbfragevariantebauleitplanverfahrenPost(abfragevarianteBauleitplanverfahrenRequestBody)



create-abfragevariantebauleitplanverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenEntityControllerApi,
} from '';
import type { PostCollectionResourceAbfragevariantebauleitplanverfahrenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenEntityControllerApi();

  const body = {
    // AbfragevarianteBauleitplanverfahrenRequestBody
    abfragevarianteBauleitplanverfahrenRequestBody: ...,
  } satisfies PostCollectionResourceAbfragevariantebauleitplanverfahrenPostRequest;

  try {
    const data = await api.postCollectionResourceAbfragevariantebauleitplanverfahrenPost(body);
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
| **abfragevarianteBauleitplanverfahrenRequestBody** | [AbfragevarianteBauleitplanverfahrenRequestBody](AbfragevarianteBauleitplanverfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteBauleitplanverfahren**](EntityModelAbfragevarianteBauleitplanverfahren.md)

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


## putItemResourceAbfragevariantebauleitplanverfahrenPut

> EntityModelAbfragevarianteBauleitplanverfahren putItemResourceAbfragevariantebauleitplanverfahrenPut(id, abfragevarianteBauleitplanverfahrenRequestBody)



update-abfragevariantebauleitplanverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenEntityControllerApi,
} from '';
import type { PutItemResourceAbfragevariantebauleitplanverfahrenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteBauleitplanverfahrenRequestBody
    abfragevarianteBauleitplanverfahrenRequestBody: ...,
  } satisfies PutItemResourceAbfragevariantebauleitplanverfahrenPutRequest;

  try {
    const data = await api.putItemResourceAbfragevariantebauleitplanverfahrenPut(body);
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
| **abfragevarianteBauleitplanverfahrenRequestBody** | [AbfragevarianteBauleitplanverfahrenRequestBody](AbfragevarianteBauleitplanverfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteBauleitplanverfahren**](EntityModelAbfragevarianteBauleitplanverfahren.md)

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

