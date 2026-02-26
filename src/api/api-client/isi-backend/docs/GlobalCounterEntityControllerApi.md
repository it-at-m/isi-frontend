# GlobalCounterEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceGlobalcounterDelete**](GlobalCounterEntityControllerApi.md#deleteitemresourceglobalcounterdelete) | **DELETE** /globalCounters/{id} |  |
| [**getCollectionResourceGlobalcounterGet**](GlobalCounterEntityControllerApi.md#getcollectionresourceglobalcounterget) | **GET** /globalCounters |  |
| [**getItemResourceGlobalcounterGet**](GlobalCounterEntityControllerApi.md#getitemresourceglobalcounterget) | **GET** /globalCounters/{id} |  |
| [**patchItemResourceGlobalcounterPatch**](GlobalCounterEntityControllerApi.md#patchitemresourceglobalcounterpatch) | **PATCH** /globalCounters/{id} |  |
| [**postCollectionResourceGlobalcounterPost**](GlobalCounterEntityControllerApi.md#postcollectionresourceglobalcounterpost) | **POST** /globalCounters |  |
| [**putItemResourceGlobalcounterPut**](GlobalCounterEntityControllerApi.md#putitemresourceglobalcounterput) | **PUT** /globalCounters/{id} |  |



## deleteItemResourceGlobalcounterDelete

> deleteItemResourceGlobalcounterDelete(id)



delete-globalcounter

### Example

```ts
import {
  Configuration,
  GlobalCounterEntityControllerApi,
} from '';
import type { DeleteItemResourceGlobalcounterDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceGlobalcounterDeleteRequest;

  try {
    const data = await api.deleteItemResourceGlobalcounterDelete(body);
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


## getCollectionResourceGlobalcounterGet

> PagedModelEntityModelGlobalCounter getCollectionResourceGlobalcounterGet(page, size, sort)



get-globalcounter

### Example

```ts
import {
  Configuration,
  GlobalCounterEntityControllerApi,
} from '';
import type { GetCollectionResourceGlobalcounterGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceGlobalcounterGetRequest;

  try {
    const data = await api.getCollectionResourceGlobalcounterGet(body);
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

[**PagedModelEntityModelGlobalCounter**](PagedModelEntityModelGlobalCounter.md)

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


## getItemResourceGlobalcounterGet

> EntityModelGlobalCounter getItemResourceGlobalcounterGet(id)



get-globalcounter

### Example

```ts
import {
  Configuration,
  GlobalCounterEntityControllerApi,
} from '';
import type { GetItemResourceGlobalcounterGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceGlobalcounterGetRequest;

  try {
    const data = await api.getItemResourceGlobalcounterGet(body);
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

[**EntityModelGlobalCounter**](EntityModelGlobalCounter.md)

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


## patchItemResourceGlobalcounterPatch

> EntityModelGlobalCounter patchItemResourceGlobalcounterPatch(id, globalCounterRequestBody)



patch-globalcounter

### Example

```ts
import {
  Configuration,
  GlobalCounterEntityControllerApi,
} from '';
import type { PatchItemResourceGlobalcounterPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // GlobalCounterRequestBody
    globalCounterRequestBody: ...,
  } satisfies PatchItemResourceGlobalcounterPatchRequest;

  try {
    const data = await api.patchItemResourceGlobalcounterPatch(body);
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
| **globalCounterRequestBody** | [GlobalCounterRequestBody](GlobalCounterRequestBody.md) |  | |

### Return type

[**EntityModelGlobalCounter**](EntityModelGlobalCounter.md)

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


## postCollectionResourceGlobalcounterPost

> EntityModelGlobalCounter postCollectionResourceGlobalcounterPost(globalCounterRequestBody)



create-globalcounter

### Example

```ts
import {
  Configuration,
  GlobalCounterEntityControllerApi,
} from '';
import type { PostCollectionResourceGlobalcounterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterEntityControllerApi();

  const body = {
    // GlobalCounterRequestBody
    globalCounterRequestBody: ...,
  } satisfies PostCollectionResourceGlobalcounterPostRequest;

  try {
    const data = await api.postCollectionResourceGlobalcounterPost(body);
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
| **globalCounterRequestBody** | [GlobalCounterRequestBody](GlobalCounterRequestBody.md) |  | |

### Return type

[**EntityModelGlobalCounter**](EntityModelGlobalCounter.md)

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


## putItemResourceGlobalcounterPut

> EntityModelGlobalCounter putItemResourceGlobalcounterPut(id, globalCounterRequestBody)



update-globalcounter

### Example

```ts
import {
  Configuration,
  GlobalCounterEntityControllerApi,
} from '';
import type { PutItemResourceGlobalcounterPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GlobalCounterEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // GlobalCounterRequestBody
    globalCounterRequestBody: ...,
  } satisfies PutItemResourceGlobalcounterPutRequest;

  try {
    const data = await api.putItemResourceGlobalcounterPut(body);
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
| **globalCounterRequestBody** | [GlobalCounterRequestBody](GlobalCounterRequestBody.md) |  | |

### Return type

[**EntityModelGlobalCounter**](EntityModelGlobalCounter.md)

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

