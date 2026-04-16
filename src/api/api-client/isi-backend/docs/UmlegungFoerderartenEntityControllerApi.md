# UmlegungFoerderartenEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceUmlegungfoerderartenDelete**](UmlegungFoerderartenEntityControllerApi.md#deleteitemresourceumlegungfoerderartendelete) | **DELETE** /umlegungFoerderartens/{id} |  |
| [**getCollectionResourceUmlegungfoerderartenGet**](UmlegungFoerderartenEntityControllerApi.md#getcollectionresourceumlegungfoerderartenget) | **GET** /umlegungFoerderartens |  |
| [**getItemResourceUmlegungfoerderartenGet**](UmlegungFoerderartenEntityControllerApi.md#getitemresourceumlegungfoerderartenget) | **GET** /umlegungFoerderartens/{id} |  |
| [**patchItemResourceUmlegungfoerderartenPatch**](UmlegungFoerderartenEntityControllerApi.md#patchitemresourceumlegungfoerderartenpatch) | **PATCH** /umlegungFoerderartens/{id} |  |
| [**postCollectionResourceUmlegungfoerderartenPost**](UmlegungFoerderartenEntityControllerApi.md#postcollectionresourceumlegungfoerderartenpost) | **POST** /umlegungFoerderartens |  |
| [**putItemResourceUmlegungfoerderartenPut**](UmlegungFoerderartenEntityControllerApi.md#putitemresourceumlegungfoerderartenput) | **PUT** /umlegungFoerderartens/{id} |  |



## deleteItemResourceUmlegungfoerderartenDelete

> deleteItemResourceUmlegungfoerderartenDelete(id)



delete-umlegungfoerderarten

### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenEntityControllerApi,
} from '';
import type { DeleteItemResourceUmlegungfoerderartenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceUmlegungfoerderartenDeleteRequest;

  try {
    const data = await api.deleteItemResourceUmlegungfoerderartenDelete(body);
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


## getCollectionResourceUmlegungfoerderartenGet

> PagedModelEntityModelUmlegungFoerderarten getCollectionResourceUmlegungfoerderartenGet(page, size, sort)



get-umlegungfoerderarten

### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenEntityControllerApi,
} from '';
import type { GetCollectionResourceUmlegungfoerderartenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceUmlegungfoerderartenGetRequest;

  try {
    const data = await api.getCollectionResourceUmlegungfoerderartenGet(body);
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

[**PagedModelEntityModelUmlegungFoerderarten**](PagedModelEntityModelUmlegungFoerderarten.md)

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


## getItemResourceUmlegungfoerderartenGet

> EntityModelUmlegungFoerderarten getItemResourceUmlegungfoerderartenGet(id)



get-umlegungfoerderarten

### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenEntityControllerApi,
} from '';
import type { GetItemResourceUmlegungfoerderartenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceUmlegungfoerderartenGetRequest;

  try {
    const data = await api.getItemResourceUmlegungfoerderartenGet(body);
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

[**EntityModelUmlegungFoerderarten**](EntityModelUmlegungFoerderarten.md)

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


## patchItemResourceUmlegungfoerderartenPatch

> EntityModelUmlegungFoerderarten patchItemResourceUmlegungfoerderartenPatch(id, umlegungFoerderartenRequestBody)



patch-umlegungfoerderarten

### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenEntityControllerApi,
} from '';
import type { PatchItemResourceUmlegungfoerderartenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // UmlegungFoerderartenRequestBody
    umlegungFoerderartenRequestBody: ...,
  } satisfies PatchItemResourceUmlegungfoerderartenPatchRequest;

  try {
    const data = await api.patchItemResourceUmlegungfoerderartenPatch(body);
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
| **umlegungFoerderartenRequestBody** | [UmlegungFoerderartenRequestBody](UmlegungFoerderartenRequestBody.md) |  | |

### Return type

[**EntityModelUmlegungFoerderarten**](EntityModelUmlegungFoerderarten.md)

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


## postCollectionResourceUmlegungfoerderartenPost

> EntityModelUmlegungFoerderarten postCollectionResourceUmlegungfoerderartenPost(umlegungFoerderartenRequestBody)



create-umlegungfoerderarten

### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenEntityControllerApi,
} from '';
import type { PostCollectionResourceUmlegungfoerderartenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenEntityControllerApi();

  const body = {
    // UmlegungFoerderartenRequestBody
    umlegungFoerderartenRequestBody: ...,
  } satisfies PostCollectionResourceUmlegungfoerderartenPostRequest;

  try {
    const data = await api.postCollectionResourceUmlegungfoerderartenPost(body);
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
| **umlegungFoerderartenRequestBody** | [UmlegungFoerderartenRequestBody](UmlegungFoerderartenRequestBody.md) |  | |

### Return type

[**EntityModelUmlegungFoerderarten**](EntityModelUmlegungFoerderarten.md)

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


## putItemResourceUmlegungfoerderartenPut

> EntityModelUmlegungFoerderarten putItemResourceUmlegungfoerderartenPut(id, umlegungFoerderartenRequestBody)



update-umlegungfoerderarten

### Example

```ts
import {
  Configuration,
  UmlegungFoerderartenEntityControllerApi,
} from '';
import type { PutItemResourceUmlegungfoerderartenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UmlegungFoerderartenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // UmlegungFoerderartenRequestBody
    umlegungFoerderartenRequestBody: ...,
  } satisfies PutItemResourceUmlegungfoerderartenPutRequest;

  try {
    const data = await api.putItemResourceUmlegungfoerderartenPut(body);
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
| **umlegungFoerderartenRequestBody** | [UmlegungFoerderartenRequestBody](UmlegungFoerderartenRequestBody.md) |  | |

### Return type

[**EntityModelUmlegungFoerderarten**](EntityModelUmlegungFoerderarten.md)

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

