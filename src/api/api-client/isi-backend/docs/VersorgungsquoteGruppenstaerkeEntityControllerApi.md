# VersorgungsquoteGruppenstaerkeEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceVersorgungsquotegruppenstaerkeDelete**](VersorgungsquoteGruppenstaerkeEntityControllerApi.md#deleteitemresourceversorgungsquotegruppenstaerkedelete) | **DELETE** /versorgungsquoteGruppenstaerkes/{id} |  |
| [**getCollectionResourceVersorgungsquotegruppenstaerkeGet**](VersorgungsquoteGruppenstaerkeEntityControllerApi.md#getcollectionresourceversorgungsquotegruppenstaerkeget) | **GET** /versorgungsquoteGruppenstaerkes |  |
| [**getItemResourceVersorgungsquotegruppenstaerkeGet**](VersorgungsquoteGruppenstaerkeEntityControllerApi.md#getitemresourceversorgungsquotegruppenstaerkeget) | **GET** /versorgungsquoteGruppenstaerkes/{id} |  |
| [**patchItemResourceVersorgungsquotegruppenstaerkePatch**](VersorgungsquoteGruppenstaerkeEntityControllerApi.md#patchitemresourceversorgungsquotegruppenstaerkepatch) | **PATCH** /versorgungsquoteGruppenstaerkes/{id} |  |
| [**postCollectionResourceVersorgungsquotegruppenstaerkePost**](VersorgungsquoteGruppenstaerkeEntityControllerApi.md#postcollectionresourceversorgungsquotegruppenstaerkepost) | **POST** /versorgungsquoteGruppenstaerkes |  |
| [**putItemResourceVersorgungsquotegruppenstaerkePut**](VersorgungsquoteGruppenstaerkeEntityControllerApi.md#putitemresourceversorgungsquotegruppenstaerkeput) | **PUT** /versorgungsquoteGruppenstaerkes/{id} |  |



## deleteItemResourceVersorgungsquotegruppenstaerkeDelete

> deleteItemResourceVersorgungsquotegruppenstaerkeDelete(id)



delete-versorgungsquotegruppenstaerke

### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeEntityControllerApi,
} from '';
import type { DeleteItemResourceVersorgungsquotegruppenstaerkeDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceVersorgungsquotegruppenstaerkeDeleteRequest;

  try {
    const data = await api.deleteItemResourceVersorgungsquotegruppenstaerkeDelete(body);
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


## getCollectionResourceVersorgungsquotegruppenstaerkeGet

> PagedModelEntityModelVersorgungsquoteGruppenstaerke getCollectionResourceVersorgungsquotegruppenstaerkeGet(page, size, sort)



get-versorgungsquotegruppenstaerke

### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeEntityControllerApi,
} from '';
import type { GetCollectionResourceVersorgungsquotegruppenstaerkeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceVersorgungsquotegruppenstaerkeGetRequest;

  try {
    const data = await api.getCollectionResourceVersorgungsquotegruppenstaerkeGet(body);
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

[**PagedModelEntityModelVersorgungsquoteGruppenstaerke**](PagedModelEntityModelVersorgungsquoteGruppenstaerke.md)

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


## getItemResourceVersorgungsquotegruppenstaerkeGet

> EntityModelVersorgungsquoteGruppenstaerke getItemResourceVersorgungsquotegruppenstaerkeGet(id)



get-versorgungsquotegruppenstaerke

### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeEntityControllerApi,
} from '';
import type { GetItemResourceVersorgungsquotegruppenstaerkeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceVersorgungsquotegruppenstaerkeGetRequest;

  try {
    const data = await api.getItemResourceVersorgungsquotegruppenstaerkeGet(body);
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

[**EntityModelVersorgungsquoteGruppenstaerke**](EntityModelVersorgungsquoteGruppenstaerke.md)

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


## patchItemResourceVersorgungsquotegruppenstaerkePatch

> EntityModelVersorgungsquoteGruppenstaerke patchItemResourceVersorgungsquotegruppenstaerkePatch(id, versorgungsquoteGruppenstaerkeRequestBody)



patch-versorgungsquotegruppenstaerke

### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeEntityControllerApi,
} from '';
import type { PatchItemResourceVersorgungsquotegruppenstaerkePatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // VersorgungsquoteGruppenstaerkeRequestBody
    versorgungsquoteGruppenstaerkeRequestBody: ...,
  } satisfies PatchItemResourceVersorgungsquotegruppenstaerkePatchRequest;

  try {
    const data = await api.patchItemResourceVersorgungsquotegruppenstaerkePatch(body);
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
| **versorgungsquoteGruppenstaerkeRequestBody** | [VersorgungsquoteGruppenstaerkeRequestBody](VersorgungsquoteGruppenstaerkeRequestBody.md) |  | |

### Return type

[**EntityModelVersorgungsquoteGruppenstaerke**](EntityModelVersorgungsquoteGruppenstaerke.md)

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


## postCollectionResourceVersorgungsquotegruppenstaerkePost

> EntityModelVersorgungsquoteGruppenstaerke postCollectionResourceVersorgungsquotegruppenstaerkePost(versorgungsquoteGruppenstaerkeRequestBody)



create-versorgungsquotegruppenstaerke

### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeEntityControllerApi,
} from '';
import type { PostCollectionResourceVersorgungsquotegruppenstaerkePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeEntityControllerApi();

  const body = {
    // VersorgungsquoteGruppenstaerkeRequestBody
    versorgungsquoteGruppenstaerkeRequestBody: ...,
  } satisfies PostCollectionResourceVersorgungsquotegruppenstaerkePostRequest;

  try {
    const data = await api.postCollectionResourceVersorgungsquotegruppenstaerkePost(body);
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
| **versorgungsquoteGruppenstaerkeRequestBody** | [VersorgungsquoteGruppenstaerkeRequestBody](VersorgungsquoteGruppenstaerkeRequestBody.md) |  | |

### Return type

[**EntityModelVersorgungsquoteGruppenstaerke**](EntityModelVersorgungsquoteGruppenstaerke.md)

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


## putItemResourceVersorgungsquotegruppenstaerkePut

> EntityModelVersorgungsquoteGruppenstaerke putItemResourceVersorgungsquotegruppenstaerkePut(id, versorgungsquoteGruppenstaerkeRequestBody)



update-versorgungsquotegruppenstaerke

### Example

```ts
import {
  Configuration,
  VersorgungsquoteGruppenstaerkeEntityControllerApi,
} from '';
import type { PutItemResourceVersorgungsquotegruppenstaerkePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VersorgungsquoteGruppenstaerkeEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // VersorgungsquoteGruppenstaerkeRequestBody
    versorgungsquoteGruppenstaerkeRequestBody: ...,
  } satisfies PutItemResourceVersorgungsquotegruppenstaerkePutRequest;

  try {
    const data = await api.putItemResourceVersorgungsquotegruppenstaerkePut(body);
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
| **versorgungsquoteGruppenstaerkeRequestBody** | [VersorgungsquoteGruppenstaerkeRequestBody](VersorgungsquoteGruppenstaerkeRequestBody.md) |  | |

### Return type

[**EntityModelVersorgungsquoteGruppenstaerke**](EntityModelVersorgungsquoteGruppenstaerke.md)

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

