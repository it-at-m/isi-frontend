# SobonOrientierungswertSozialeInfrastrukturEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceSobonorientierungswertsozialeinfrastrukturDelete**](SobonOrientierungswertSozialeInfrastrukturEntityControllerApi.md#deleteitemresourcesobonorientierungswertsozialeinfrastrukturdelete) | **DELETE** /sobonOrientierungswertSozialeInfrastrukturs/{id} |  |
| [**getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet**](SobonOrientierungswertSozialeInfrastrukturEntityControllerApi.md#getcollectionresourcesobonorientierungswertsozialeinfrastrukturget) | **GET** /sobonOrientierungswertSozialeInfrastrukturs |  |
| [**getItemResourceSobonorientierungswertsozialeinfrastrukturGet**](SobonOrientierungswertSozialeInfrastrukturEntityControllerApi.md#getitemresourcesobonorientierungswertsozialeinfrastrukturget) | **GET** /sobonOrientierungswertSozialeInfrastrukturs/{id} |  |
| [**patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch**](SobonOrientierungswertSozialeInfrastrukturEntityControllerApi.md#patchitemresourcesobonorientierungswertsozialeinfrastrukturpatch) | **PATCH** /sobonOrientierungswertSozialeInfrastrukturs/{id} |  |
| [**postCollectionResourceSobonorientierungswertsozialeinfrastrukturPost**](SobonOrientierungswertSozialeInfrastrukturEntityControllerApi.md#postcollectionresourcesobonorientierungswertsozialeinfrastrukturpost) | **POST** /sobonOrientierungswertSozialeInfrastrukturs |  |
| [**putItemResourceSobonorientierungswertsozialeinfrastrukturPut**](SobonOrientierungswertSozialeInfrastrukturEntityControllerApi.md#putitemresourcesobonorientierungswertsozialeinfrastrukturput) | **PUT** /sobonOrientierungswertSozialeInfrastrukturs/{id} |  |



## deleteItemResourceSobonorientierungswertsozialeinfrastrukturDelete

> deleteItemResourceSobonorientierungswertsozialeinfrastrukturDelete(id)



delete-sobonorientierungswertsozialeinfrastruktur

### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturEntityControllerApi,
} from '';
import type { DeleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceSobonorientierungswertsozialeinfrastrukturDeleteRequest;

  try {
    const data = await api.deleteItemResourceSobonorientierungswertsozialeinfrastrukturDelete(body);
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


## getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet

> PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet(page, size, sort)



get-sobonorientierungswertsozialeinfrastruktur

### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturEntityControllerApi,
} from '';
import type { GetCollectionResourceSobonorientierungswertsozialeinfrastrukturGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceSobonorientierungswertsozialeinfrastrukturGetRequest;

  try {
    const data = await api.getCollectionResourceSobonorientierungswertsozialeinfrastrukturGet(body);
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

[**PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur**](PagedModelEntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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


## getItemResourceSobonorientierungswertsozialeinfrastrukturGet

> EntityModelSobonOrientierungswertSozialeInfrastruktur getItemResourceSobonorientierungswertsozialeinfrastrukturGet(id)



get-sobonorientierungswertsozialeinfrastruktur

### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturEntityControllerApi,
} from '';
import type { GetItemResourceSobonorientierungswertsozialeinfrastrukturGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceSobonorientierungswertsozialeinfrastrukturGetRequest;

  try {
    const data = await api.getItemResourceSobonorientierungswertsozialeinfrastrukturGet(body);
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

[**EntityModelSobonOrientierungswertSozialeInfrastruktur**](EntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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


## patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch

> EntityModelSobonOrientierungswertSozialeInfrastruktur patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch(id, sobonOrientierungswertSozialeInfrastrukturRequestBody)



patch-sobonorientierungswertsozialeinfrastruktur

### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturEntityControllerApi,
} from '';
import type { PatchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // SobonOrientierungswertSozialeInfrastrukturRequestBody
    sobonOrientierungswertSozialeInfrastrukturRequestBody: ...,
  } satisfies PatchItemResourceSobonorientierungswertsozialeinfrastrukturPatchRequest;

  try {
    const data = await api.patchItemResourceSobonorientierungswertsozialeinfrastrukturPatch(body);
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
| **sobonOrientierungswertSozialeInfrastrukturRequestBody** | [SobonOrientierungswertSozialeInfrastrukturRequestBody](SobonOrientierungswertSozialeInfrastrukturRequestBody.md) |  | |

### Return type

[**EntityModelSobonOrientierungswertSozialeInfrastruktur**](EntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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


## postCollectionResourceSobonorientierungswertsozialeinfrastrukturPost

> EntityModelSobonOrientierungswertSozialeInfrastruktur postCollectionResourceSobonorientierungswertsozialeinfrastrukturPost(sobonOrientierungswertSozialeInfrastrukturRequestBody)



create-sobonorientierungswertsozialeinfrastruktur

### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturEntityControllerApi,
} from '';
import type { PostCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturEntityControllerApi();

  const body = {
    // SobonOrientierungswertSozialeInfrastrukturRequestBody
    sobonOrientierungswertSozialeInfrastrukturRequestBody: ...,
  } satisfies PostCollectionResourceSobonorientierungswertsozialeinfrastrukturPostRequest;

  try {
    const data = await api.postCollectionResourceSobonorientierungswertsozialeinfrastrukturPost(body);
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
| **sobonOrientierungswertSozialeInfrastrukturRequestBody** | [SobonOrientierungswertSozialeInfrastrukturRequestBody](SobonOrientierungswertSozialeInfrastrukturRequestBody.md) |  | |

### Return type

[**EntityModelSobonOrientierungswertSozialeInfrastruktur**](EntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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


## putItemResourceSobonorientierungswertsozialeinfrastrukturPut

> EntityModelSobonOrientierungswertSozialeInfrastruktur putItemResourceSobonorientierungswertsozialeinfrastrukturPut(id, sobonOrientierungswertSozialeInfrastrukturRequestBody)



update-sobonorientierungswertsozialeinfrastruktur

### Example

```ts
import {
  Configuration,
  SobonOrientierungswertSozialeInfrastrukturEntityControllerApi,
} from '';
import type { PutItemResourceSobonorientierungswertsozialeinfrastrukturPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SobonOrientierungswertSozialeInfrastrukturEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // SobonOrientierungswertSozialeInfrastrukturRequestBody
    sobonOrientierungswertSozialeInfrastrukturRequestBody: ...,
  } satisfies PutItemResourceSobonorientierungswertsozialeinfrastrukturPutRequest;

  try {
    const data = await api.putItemResourceSobonorientierungswertsozialeinfrastrukturPut(body);
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
| **sobonOrientierungswertSozialeInfrastrukturRequestBody** | [SobonOrientierungswertSozialeInfrastrukturRequestBody](SobonOrientierungswertSozialeInfrastrukturRequestBody.md) |  | |

### Return type

[**EntityModelSobonOrientierungswertSozialeInfrastruktur**](EntityModelSobonOrientierungswertSozialeInfrastruktur.md)

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

