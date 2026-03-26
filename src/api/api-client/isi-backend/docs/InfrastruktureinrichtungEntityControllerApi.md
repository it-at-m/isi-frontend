# InfrastruktureinrichtungEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceInfrastruktureinrichtungDelete**](InfrastruktureinrichtungEntityControllerApi.md#deleteitemresourceinfrastruktureinrichtungdelete) | **DELETE** /infrastruktureinrichtungs/{id} |  |
| [**getCollectionResourceInfrastruktureinrichtungGet**](InfrastruktureinrichtungEntityControllerApi.md#getcollectionresourceinfrastruktureinrichtungget) | **GET** /infrastruktureinrichtungs |  |
| [**getItemResourceInfrastruktureinrichtungGet**](InfrastruktureinrichtungEntityControllerApi.md#getitemresourceinfrastruktureinrichtungget) | **GET** /infrastruktureinrichtungs/{id} |  |
| [**patchItemResourceInfrastruktureinrichtungPatch**](InfrastruktureinrichtungEntityControllerApi.md#patchitemresourceinfrastruktureinrichtungpatch) | **PATCH** /infrastruktureinrichtungs/{id} |  |
| [**postCollectionResourceInfrastruktureinrichtungPost**](InfrastruktureinrichtungEntityControllerApi.md#postcollectionresourceinfrastruktureinrichtungpost) | **POST** /infrastruktureinrichtungs |  |
| [**putItemResourceInfrastruktureinrichtungPut**](InfrastruktureinrichtungEntityControllerApi.md#putitemresourceinfrastruktureinrichtungput) | **PUT** /infrastruktureinrichtungs/{id} |  |



## deleteItemResourceInfrastruktureinrichtungDelete

> deleteItemResourceInfrastruktureinrichtungDelete(id)



delete-infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungEntityControllerApi,
} from '';
import type { DeleteItemResourceInfrastruktureinrichtungDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceInfrastruktureinrichtungDeleteRequest;

  try {
    const data = await api.deleteItemResourceInfrastruktureinrichtungDelete(body);
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


## getCollectionResourceInfrastruktureinrichtungGet

> PagedModelEntityModelInfrastruktureinrichtung getCollectionResourceInfrastruktureinrichtungGet(page, size, sort)



get-infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungEntityControllerApi,
} from '';
import type { GetCollectionResourceInfrastruktureinrichtungGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceInfrastruktureinrichtungGetRequest;

  try {
    const data = await api.getCollectionResourceInfrastruktureinrichtungGet(body);
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

[**PagedModelEntityModelInfrastruktureinrichtung**](PagedModelEntityModelInfrastruktureinrichtung.md)

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


## getItemResourceInfrastruktureinrichtungGet

> EntityModelInfrastruktureinrichtung getItemResourceInfrastruktureinrichtungGet(id)



get-infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungEntityControllerApi,
} from '';
import type { GetItemResourceInfrastruktureinrichtungGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceInfrastruktureinrichtungGetRequest;

  try {
    const data = await api.getItemResourceInfrastruktureinrichtungGet(body);
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

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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


## patchItemResourceInfrastruktureinrichtungPatch

> EntityModelInfrastruktureinrichtung patchItemResourceInfrastruktureinrichtungPatch(id, infrastruktureinrichtungRequestBody)



patch-infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungEntityControllerApi,
} from '';
import type { PatchItemResourceInfrastruktureinrichtungPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // InfrastruktureinrichtungRequestBody
    infrastruktureinrichtungRequestBody: ...,
  } satisfies PatchItemResourceInfrastruktureinrichtungPatchRequest;

  try {
    const data = await api.patchItemResourceInfrastruktureinrichtungPatch(body);
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
| **infrastruktureinrichtungRequestBody** | [InfrastruktureinrichtungRequestBody](InfrastruktureinrichtungRequestBody.md) |  | |

### Return type

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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


## postCollectionResourceInfrastruktureinrichtungPost

> EntityModelInfrastruktureinrichtung postCollectionResourceInfrastruktureinrichtungPost(infrastruktureinrichtungRequestBody)



create-infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungEntityControllerApi,
} from '';
import type { PostCollectionResourceInfrastruktureinrichtungPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungEntityControllerApi();

  const body = {
    // InfrastruktureinrichtungRequestBody
    infrastruktureinrichtungRequestBody: ...,
  } satisfies PostCollectionResourceInfrastruktureinrichtungPostRequest;

  try {
    const data = await api.postCollectionResourceInfrastruktureinrichtungPost(body);
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
| **infrastruktureinrichtungRequestBody** | [InfrastruktureinrichtungRequestBody](InfrastruktureinrichtungRequestBody.md) |  | |

### Return type

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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


## putItemResourceInfrastruktureinrichtungPut

> EntityModelInfrastruktureinrichtung putItemResourceInfrastruktureinrichtungPut(id, infrastruktureinrichtungRequestBody)



update-infrastruktureinrichtung

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungEntityControllerApi,
} from '';
import type { PutItemResourceInfrastruktureinrichtungPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // InfrastruktureinrichtungRequestBody
    infrastruktureinrichtungRequestBody: ...,
  } satisfies PutItemResourceInfrastruktureinrichtungPutRequest;

  try {
    const data = await api.putItemResourceInfrastruktureinrichtungPut(body);
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
| **infrastruktureinrichtungRequestBody** | [InfrastruktureinrichtungRequestBody](InfrastruktureinrichtungRequestBody.md) |  | |

### Return type

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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

