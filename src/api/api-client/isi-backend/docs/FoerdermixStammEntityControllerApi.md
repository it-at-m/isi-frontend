# FoerdermixStammEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceFoerdermixstammDelete**](FoerdermixStammEntityControllerApi.md#deleteitemresourcefoerdermixstammdelete) | **DELETE** /foerdermixStamms/{id} |  |
| [**getCollectionResourceFoerdermixstammGet**](FoerdermixStammEntityControllerApi.md#getcollectionresourcefoerdermixstammget) | **GET** /foerdermixStamms |  |
| [**getItemResourceFoerdermixstammGet**](FoerdermixStammEntityControllerApi.md#getitemresourcefoerdermixstammget) | **GET** /foerdermixStamms/{id} |  |
| [**patchItemResourceFoerdermixstammPatch**](FoerdermixStammEntityControllerApi.md#patchitemresourcefoerdermixstammpatch) | **PATCH** /foerdermixStamms/{id} |  |
| [**postCollectionResourceFoerdermixstammPost**](FoerdermixStammEntityControllerApi.md#postcollectionresourcefoerdermixstammpost) | **POST** /foerdermixStamms |  |
| [**putItemResourceFoerdermixstammPut**](FoerdermixStammEntityControllerApi.md#putitemresourcefoerdermixstammput) | **PUT** /foerdermixStamms/{id} |  |



## deleteItemResourceFoerdermixstammDelete

> deleteItemResourceFoerdermixstammDelete(id)



delete-foerdermixstamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammEntityControllerApi,
} from '';
import type { DeleteItemResourceFoerdermixstammDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceFoerdermixstammDeleteRequest;

  try {
    const data = await api.deleteItemResourceFoerdermixstammDelete(body);
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


## getCollectionResourceFoerdermixstammGet

> PagedModelEntityModelFoerdermixStamm getCollectionResourceFoerdermixstammGet(page, size, sort)



get-foerdermixstamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammEntityControllerApi,
} from '';
import type { GetCollectionResourceFoerdermixstammGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceFoerdermixstammGetRequest;

  try {
    const data = await api.getCollectionResourceFoerdermixstammGet(body);
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

[**PagedModelEntityModelFoerdermixStamm**](PagedModelEntityModelFoerdermixStamm.md)

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


## getItemResourceFoerdermixstammGet

> EntityModelFoerdermixStamm getItemResourceFoerdermixstammGet(id)



get-foerdermixstamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammEntityControllerApi,
} from '';
import type { GetItemResourceFoerdermixstammGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceFoerdermixstammGetRequest;

  try {
    const data = await api.getItemResourceFoerdermixstammGet(body);
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

[**EntityModelFoerdermixStamm**](EntityModelFoerdermixStamm.md)

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


## patchItemResourceFoerdermixstammPatch

> EntityModelFoerdermixStamm patchItemResourceFoerdermixstammPatch(id, foerdermixStammRequestBody)



patch-foerdermixstamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammEntityControllerApi,
} from '';
import type { PatchItemResourceFoerdermixstammPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // FoerdermixStammRequestBody
    foerdermixStammRequestBody: ...,
  } satisfies PatchItemResourceFoerdermixstammPatchRequest;

  try {
    const data = await api.patchItemResourceFoerdermixstammPatch(body);
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
| **foerdermixStammRequestBody** | [FoerdermixStammRequestBody](FoerdermixStammRequestBody.md) |  | |

### Return type

[**EntityModelFoerdermixStamm**](EntityModelFoerdermixStamm.md)

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


## postCollectionResourceFoerdermixstammPost

> EntityModelFoerdermixStamm postCollectionResourceFoerdermixstammPost(foerdermixStammRequestBody)



create-foerdermixstamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammEntityControllerApi,
} from '';
import type { PostCollectionResourceFoerdermixstammPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammEntityControllerApi();

  const body = {
    // FoerdermixStammRequestBody
    foerdermixStammRequestBody: ...,
  } satisfies PostCollectionResourceFoerdermixstammPostRequest;

  try {
    const data = await api.postCollectionResourceFoerdermixstammPost(body);
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
| **foerdermixStammRequestBody** | [FoerdermixStammRequestBody](FoerdermixStammRequestBody.md) |  | |

### Return type

[**EntityModelFoerdermixStamm**](EntityModelFoerdermixStamm.md)

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


## putItemResourceFoerdermixstammPut

> EntityModelFoerdermixStamm putItemResourceFoerdermixstammPut(id, foerdermixStammRequestBody)



update-foerdermixstamm

### Example

```ts
import {
  Configuration,
  FoerdermixStammEntityControllerApi,
} from '';
import type { PutItemResourceFoerdermixstammPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FoerdermixStammEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // FoerdermixStammRequestBody
    foerdermixStammRequestBody: ...,
  } satisfies PutItemResourceFoerdermixstammPutRequest;

  try {
    const data = await api.putItemResourceFoerdermixstammPut(body);
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
| **foerdermixStammRequestBody** | [FoerdermixStammRequestBody](FoerdermixStammRequestBody.md) |  | |

### Return type

[**EntityModelFoerdermixStamm**](EntityModelFoerdermixStamm.md)

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

