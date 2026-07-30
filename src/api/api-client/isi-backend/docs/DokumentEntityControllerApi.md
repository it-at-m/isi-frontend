# DokumentEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceDokumentDelete**](DokumentEntityControllerApi.md#deleteitemresourcedokumentdelete) | **DELETE** /dokuments/{id} |  |
| [**getCollectionResourceDokumentGet**](DokumentEntityControllerApi.md#getcollectionresourcedokumentget) | **GET** /dokuments |  |
| [**getItemResourceDokumentGet**](DokumentEntityControllerApi.md#getitemresourcedokumentget) | **GET** /dokuments/{id} |  |
| [**patchItemResourceDokumentPatch**](DokumentEntityControllerApi.md#patchitemresourcedokumentpatch) | **PATCH** /dokuments/{id} |  |
| [**postCollectionResourceDokumentPost**](DokumentEntityControllerApi.md#postcollectionresourcedokumentpost) | **POST** /dokuments |  |
| [**putItemResourceDokumentPut**](DokumentEntityControllerApi.md#putitemresourcedokumentput) | **PUT** /dokuments/{id} |  |



## deleteItemResourceDokumentDelete

> deleteItemResourceDokumentDelete(id)



delete-dokument

### Example

```ts
import {
  Configuration,
  DokumentEntityControllerApi,
} from '';
import type { DeleteItemResourceDokumentDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumentEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceDokumentDeleteRequest;

  try {
    const data = await api.deleteItemResourceDokumentDelete(body);
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


## getCollectionResourceDokumentGet

> PagedModelEntityModelDokument getCollectionResourceDokumentGet(page, size, sort)



get-dokument

### Example

```ts
import {
  Configuration,
  DokumentEntityControllerApi,
} from '';
import type { GetCollectionResourceDokumentGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumentEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceDokumentGetRequest;

  try {
    const data = await api.getCollectionResourceDokumentGet(body);
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

[**PagedModelEntityModelDokument**](PagedModelEntityModelDokument.md)

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


## getItemResourceDokumentGet

> EntityModelDokument getItemResourceDokumentGet(id)



get-dokument

### Example

```ts
import {
  Configuration,
  DokumentEntityControllerApi,
} from '';
import type { GetItemResourceDokumentGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumentEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceDokumentGetRequest;

  try {
    const data = await api.getItemResourceDokumentGet(body);
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

[**EntityModelDokument**](EntityModelDokument.md)

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


## patchItemResourceDokumentPatch

> EntityModelDokument patchItemResourceDokumentPatch(id, dokumentRequestBody)



patch-dokument

### Example

```ts
import {
  Configuration,
  DokumentEntityControllerApi,
} from '';
import type { PatchItemResourceDokumentPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumentEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // DokumentRequestBody
    dokumentRequestBody: ...,
  } satisfies PatchItemResourceDokumentPatchRequest;

  try {
    const data = await api.patchItemResourceDokumentPatch(body);
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
| **dokumentRequestBody** | [DokumentRequestBody](DokumentRequestBody.md) |  | |

### Return type

[**EntityModelDokument**](EntityModelDokument.md)

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


## postCollectionResourceDokumentPost

> EntityModelDokument postCollectionResourceDokumentPost(dokumentRequestBody)



create-dokument

### Example

```ts
import {
  Configuration,
  DokumentEntityControllerApi,
} from '';
import type { PostCollectionResourceDokumentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumentEntityControllerApi();

  const body = {
    // DokumentRequestBody
    dokumentRequestBody: ...,
  } satisfies PostCollectionResourceDokumentPostRequest;

  try {
    const data = await api.postCollectionResourceDokumentPost(body);
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
| **dokumentRequestBody** | [DokumentRequestBody](DokumentRequestBody.md) |  | |

### Return type

[**EntityModelDokument**](EntityModelDokument.md)

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


## putItemResourceDokumentPut

> EntityModelDokument putItemResourceDokumentPut(id, dokumentRequestBody)



update-dokument

### Example

```ts
import {
  Configuration,
  DokumentEntityControllerApi,
} from '';
import type { PutItemResourceDokumentPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DokumentEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // DokumentRequestBody
    dokumentRequestBody: ...,
  } satisfies PutItemResourceDokumentPutRequest;

  try {
    const data = await api.putItemResourceDokumentPut(body);
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
| **dokumentRequestBody** | [DokumentRequestBody](DokumentRequestBody.md) |  | |

### Return type

[**EntityModelDokument**](EntityModelDokument.md)

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

