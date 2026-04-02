# VersorgungsquoteSobonHortEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceVersorgungsquotesobonhortDelete**](VersorgungsquoteSobonHortEntityControllerApi.md#deleteitemresourceversorgungsquotesobonhortdelete) | **DELETE** /versorgungsquoteSobonHorts/{id} |  |
| [**getCollectionResourceVersorgungsquotesobonhortGet**](VersorgungsquoteSobonHortEntityControllerApi.md#getcollectionresourceversorgungsquotesobonhortget) | **GET** /versorgungsquoteSobonHorts |  |
| [**getItemResourceVersorgungsquotesobonhortGet**](VersorgungsquoteSobonHortEntityControllerApi.md#getitemresourceversorgungsquotesobonhortget) | **GET** /versorgungsquoteSobonHorts/{id} |  |
| [**patchItemResourceVersorgungsquotesobonhortPatch**](VersorgungsquoteSobonHortEntityControllerApi.md#patchitemresourceversorgungsquotesobonhortpatch) | **PATCH** /versorgungsquoteSobonHorts/{id} |  |
| [**postCollectionResourceVersorgungsquotesobonhortPost**](VersorgungsquoteSobonHortEntityControllerApi.md#postcollectionresourceversorgungsquotesobonhortpost) | **POST** /versorgungsquoteSobonHorts |  |
| [**putItemResourceVersorgungsquotesobonhortPut**](VersorgungsquoteSobonHortEntityControllerApi.md#putitemresourceversorgungsquotesobonhortput) | **PUT** /versorgungsquoteSobonHorts/{id} |  |



## deleteItemResourceVersorgungsquotesobonhortDelete

> deleteItemResourceVersorgungsquotesobonhortDelete(id)



delete-versorgungsquotesobonhort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteSobonHortEntityControllerApi,
} from '';
import type { DeleteItemResourceVersorgungsquotesobonhortDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteSobonHortEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceVersorgungsquotesobonhortDeleteRequest;

  try {
    const data = await api.deleteItemResourceVersorgungsquotesobonhortDelete(body);
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


## getCollectionResourceVersorgungsquotesobonhortGet

> PagedModelEntityModelVersorgungsquoteSobonHort getCollectionResourceVersorgungsquotesobonhortGet(page, size, sort)



get-versorgungsquotesobonhort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteSobonHortEntityControllerApi,
} from '';
import type { GetCollectionResourceVersorgungsquotesobonhortGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteSobonHortEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceVersorgungsquotesobonhortGetRequest;

  try {
    const data = await api.getCollectionResourceVersorgungsquotesobonhortGet(body);
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

[**PagedModelEntityModelVersorgungsquoteSobonHort**](PagedModelEntityModelVersorgungsquoteSobonHort.md)

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


## getItemResourceVersorgungsquotesobonhortGet

> EntityModelVersorgungsquoteSobonHort getItemResourceVersorgungsquotesobonhortGet(id)



get-versorgungsquotesobonhort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteSobonHortEntityControllerApi,
} from '';
import type { GetItemResourceVersorgungsquotesobonhortGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteSobonHortEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceVersorgungsquotesobonhortGetRequest;

  try {
    const data = await api.getItemResourceVersorgungsquotesobonhortGet(body);
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

[**EntityModelVersorgungsquoteSobonHort**](EntityModelVersorgungsquoteSobonHort.md)

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


## patchItemResourceVersorgungsquotesobonhortPatch

> EntityModelVersorgungsquoteSobonHort patchItemResourceVersorgungsquotesobonhortPatch(id, versorgungsquoteSobonHortRequestBody)



patch-versorgungsquotesobonhort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteSobonHortEntityControllerApi,
} from '';
import type { PatchItemResourceVersorgungsquotesobonhortPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteSobonHortEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // VersorgungsquoteSobonHortRequestBody
    versorgungsquoteSobonHortRequestBody: ...,
  } satisfies PatchItemResourceVersorgungsquotesobonhortPatchRequest;

  try {
    const data = await api.patchItemResourceVersorgungsquotesobonhortPatch(body);
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
| **versorgungsquoteSobonHortRequestBody** | [VersorgungsquoteSobonHortRequestBody](VersorgungsquoteSobonHortRequestBody.md) |  | |

### Return type

[**EntityModelVersorgungsquoteSobonHort**](EntityModelVersorgungsquoteSobonHort.md)

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


## postCollectionResourceVersorgungsquotesobonhortPost

> EntityModelVersorgungsquoteSobonHort postCollectionResourceVersorgungsquotesobonhortPost(versorgungsquoteSobonHortRequestBody)



create-versorgungsquotesobonhort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteSobonHortEntityControllerApi,
} from '';
import type { PostCollectionResourceVersorgungsquotesobonhortPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteSobonHortEntityControllerApi();

  const body = {
    // VersorgungsquoteSobonHortRequestBody
    versorgungsquoteSobonHortRequestBody: ...,
  } satisfies PostCollectionResourceVersorgungsquotesobonhortPostRequest;

  try {
    const data = await api.postCollectionResourceVersorgungsquotesobonhortPost(body);
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
| **versorgungsquoteSobonHortRequestBody** | [VersorgungsquoteSobonHortRequestBody](VersorgungsquoteSobonHortRequestBody.md) |  | |

### Return type

[**EntityModelVersorgungsquoteSobonHort**](EntityModelVersorgungsquoteSobonHort.md)

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


## putItemResourceVersorgungsquotesobonhortPut

> EntityModelVersorgungsquoteSobonHort putItemResourceVersorgungsquotesobonhortPut(id, versorgungsquoteSobonHortRequestBody)



update-versorgungsquotesobonhort

### Example

```ts
import {
  Configuration,
  VersorgungsquoteSobonHortEntityControllerApi,
} from '';
import type { PutItemResourceVersorgungsquotesobonhortPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteSobonHortEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // VersorgungsquoteSobonHortRequestBody
    versorgungsquoteSobonHortRequestBody: ...,
  } satisfies PutItemResourceVersorgungsquotesobonhortPutRequest;

  try {
    const data = await api.putItemResourceVersorgungsquotesobonhortPut(body);
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
| **versorgungsquoteSobonHortRequestBody** | [VersorgungsquoteSobonHortRequestBody](VersorgungsquoteSobonHortRequestBody.md) |  | |

### Return type

[**EntityModelVersorgungsquoteSobonHort**](EntityModelVersorgungsquoteSobonHort.md)

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

