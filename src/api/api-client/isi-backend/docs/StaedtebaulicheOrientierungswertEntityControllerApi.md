# StaedtebaulicheOrientierungswertEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceStaedtebaulicheorientierungswertDelete**](StaedtebaulicheOrientierungswertEntityControllerApi.md#deleteitemresourcestaedtebaulicheorientierungswertdelete) | **DELETE** /staedtebaulicheOrientierungswerts/{id} |  |
| [**getCollectionResourceStaedtebaulicheorientierungswertGet**](StaedtebaulicheOrientierungswertEntityControllerApi.md#getcollectionresourcestaedtebaulicheorientierungswertget) | **GET** /staedtebaulicheOrientierungswerts |  |
| [**getItemResourceStaedtebaulicheorientierungswertGet**](StaedtebaulicheOrientierungswertEntityControllerApi.md#getitemresourcestaedtebaulicheorientierungswertget) | **GET** /staedtebaulicheOrientierungswerts/{id} |  |
| [**patchItemResourceStaedtebaulicheorientierungswertPatch**](StaedtebaulicheOrientierungswertEntityControllerApi.md#patchitemresourcestaedtebaulicheorientierungswertpatch) | **PATCH** /staedtebaulicheOrientierungswerts/{id} |  |
| [**postCollectionResourceStaedtebaulicheorientierungswertPost**](StaedtebaulicheOrientierungswertEntityControllerApi.md#postcollectionresourcestaedtebaulicheorientierungswertpost) | **POST** /staedtebaulicheOrientierungswerts |  |
| [**putItemResourceStaedtebaulicheorientierungswertPut**](StaedtebaulicheOrientierungswertEntityControllerApi.md#putitemresourcestaedtebaulicheorientierungswertput) | **PUT** /staedtebaulicheOrientierungswerts/{id} |  |



## deleteItemResourceStaedtebaulicheorientierungswertDelete

> deleteItemResourceStaedtebaulicheorientierungswertDelete(id)



delete-staedtebaulicheorientierungswert

### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertEntityControllerApi,
} from '';
import type { DeleteItemResourceStaedtebaulicheorientierungswertDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceStaedtebaulicheorientierungswertDeleteRequest;

  try {
    const data = await api.deleteItemResourceStaedtebaulicheorientierungswertDelete(body);
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


## getCollectionResourceStaedtebaulicheorientierungswertGet

> PagedModelEntityModelStaedtebaulicheOrientierungswert getCollectionResourceStaedtebaulicheorientierungswertGet(page, size, sort)



get-staedtebaulicheorientierungswert

### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertEntityControllerApi,
} from '';
import type { GetCollectionResourceStaedtebaulicheorientierungswertGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceStaedtebaulicheorientierungswertGetRequest;

  try {
    const data = await api.getCollectionResourceStaedtebaulicheorientierungswertGet(body);
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

[**PagedModelEntityModelStaedtebaulicheOrientierungswert**](PagedModelEntityModelStaedtebaulicheOrientierungswert.md)

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


## getItemResourceStaedtebaulicheorientierungswertGet

> EntityModelStaedtebaulicheOrientierungswert getItemResourceStaedtebaulicheorientierungswertGet(id)



get-staedtebaulicheorientierungswert

### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertEntityControllerApi,
} from '';
import type { GetItemResourceStaedtebaulicheorientierungswertGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceStaedtebaulicheorientierungswertGetRequest;

  try {
    const data = await api.getItemResourceStaedtebaulicheorientierungswertGet(body);
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

[**EntityModelStaedtebaulicheOrientierungswert**](EntityModelStaedtebaulicheOrientierungswert.md)

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


## patchItemResourceStaedtebaulicheorientierungswertPatch

> EntityModelStaedtebaulicheOrientierungswert patchItemResourceStaedtebaulicheorientierungswertPatch(id, staedtebaulicheOrientierungswertRequestBody)



patch-staedtebaulicheorientierungswert

### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertEntityControllerApi,
} from '';
import type { PatchItemResourceStaedtebaulicheorientierungswertPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // StaedtebaulicheOrientierungswertRequestBody
    staedtebaulicheOrientierungswertRequestBody: ...,
  } satisfies PatchItemResourceStaedtebaulicheorientierungswertPatchRequest;

  try {
    const data = await api.patchItemResourceStaedtebaulicheorientierungswertPatch(body);
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
| **staedtebaulicheOrientierungswertRequestBody** | [StaedtebaulicheOrientierungswertRequestBody](StaedtebaulicheOrientierungswertRequestBody.md) |  | |

### Return type

[**EntityModelStaedtebaulicheOrientierungswert**](EntityModelStaedtebaulicheOrientierungswert.md)

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


## postCollectionResourceStaedtebaulicheorientierungswertPost

> EntityModelStaedtebaulicheOrientierungswert postCollectionResourceStaedtebaulicheorientierungswertPost(staedtebaulicheOrientierungswertRequestBody)



create-staedtebaulicheorientierungswert

### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertEntityControllerApi,
} from '';
import type { PostCollectionResourceStaedtebaulicheorientierungswertPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertEntityControllerApi();

  const body = {
    // StaedtebaulicheOrientierungswertRequestBody
    staedtebaulicheOrientierungswertRequestBody: ...,
  } satisfies PostCollectionResourceStaedtebaulicheorientierungswertPostRequest;

  try {
    const data = await api.postCollectionResourceStaedtebaulicheorientierungswertPost(body);
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
| **staedtebaulicheOrientierungswertRequestBody** | [StaedtebaulicheOrientierungswertRequestBody](StaedtebaulicheOrientierungswertRequestBody.md) |  | |

### Return type

[**EntityModelStaedtebaulicheOrientierungswert**](EntityModelStaedtebaulicheOrientierungswert.md)

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


## putItemResourceStaedtebaulicheorientierungswertPut

> EntityModelStaedtebaulicheOrientierungswert putItemResourceStaedtebaulicheorientierungswertPut(id, staedtebaulicheOrientierungswertRequestBody)



update-staedtebaulicheorientierungswert

### Example

```ts
import {
  Configuration,
  StaedtebaulicheOrientierungswertEntityControllerApi,
} from '';
import type { PutItemResourceStaedtebaulicheorientierungswertPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaedtebaulicheOrientierungswertEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // StaedtebaulicheOrientierungswertRequestBody
    staedtebaulicheOrientierungswertRequestBody: ...,
  } satisfies PutItemResourceStaedtebaulicheorientierungswertPutRequest;

  try {
    const data = await api.putItemResourceStaedtebaulicheorientierungswertPut(body);
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
| **staedtebaulicheOrientierungswertRequestBody** | [StaedtebaulicheOrientierungswertRequestBody](StaedtebaulicheOrientierungswertRequestBody.md) |  | |

### Return type

[**EntityModelStaedtebaulicheOrientierungswert**](EntityModelStaedtebaulicheOrientierungswert.md)

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

