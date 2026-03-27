# KommentarEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceKommentarDelete**](KommentarEntityControllerApi.md#deleteitemresourcekommentardelete) | **DELETE** /kommentars/{id} |  |
| [**getCollectionResourceKommentarGet**](KommentarEntityControllerApi.md#getcollectionresourcekommentarget) | **GET** /kommentars |  |
| [**getItemResourceKommentarGet**](KommentarEntityControllerApi.md#getitemresourcekommentarget) | **GET** /kommentars/{id} |  |
| [**patchItemResourceKommentarPatch**](KommentarEntityControllerApi.md#patchitemresourcekommentarpatch) | **PATCH** /kommentars/{id} |  |
| [**postCollectionResourceKommentarPost**](KommentarEntityControllerApi.md#postcollectionresourcekommentarpost) | **POST** /kommentars |  |
| [**putItemResourceKommentarPut**](KommentarEntityControllerApi.md#putitemresourcekommentarput) | **PUT** /kommentars/{id} |  |



## deleteItemResourceKommentarDelete

> deleteItemResourceKommentarDelete(id)



delete-kommentar

### Example

```ts
import {
  Configuration,
  KommentarEntityControllerApi,
} from '';
import type { DeleteItemResourceKommentarDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceKommentarDeleteRequest;

  try {
    const data = await api.deleteItemResourceKommentarDelete(body);
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


## getCollectionResourceKommentarGet

> PagedModelEntityModelKommentar getCollectionResourceKommentarGet(page, size, sort)



get-kommentar

### Example

```ts
import {
  Configuration,
  KommentarEntityControllerApi,
} from '';
import type { GetCollectionResourceKommentarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceKommentarGetRequest;

  try {
    const data = await api.getCollectionResourceKommentarGet(body);
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

[**PagedModelEntityModelKommentar**](PagedModelEntityModelKommentar.md)

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


## getItemResourceKommentarGet

> EntityModelKommentar getItemResourceKommentarGet(id)



get-kommentar

### Example

```ts
import {
  Configuration,
  KommentarEntityControllerApi,
} from '';
import type { GetItemResourceKommentarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceKommentarGetRequest;

  try {
    const data = await api.getItemResourceKommentarGet(body);
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

[**EntityModelKommentar**](EntityModelKommentar.md)

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


## patchItemResourceKommentarPatch

> EntityModelKommentar patchItemResourceKommentarPatch(id, kommentarRequestBody)



patch-kommentar

### Example

```ts
import {
  Configuration,
  KommentarEntityControllerApi,
} from '';
import type { PatchItemResourceKommentarPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // KommentarRequestBody
    kommentarRequestBody: ...,
  } satisfies PatchItemResourceKommentarPatchRequest;

  try {
    const data = await api.patchItemResourceKommentarPatch(body);
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
| **kommentarRequestBody** | [KommentarRequestBody](KommentarRequestBody.md) |  | |

### Return type

[**EntityModelKommentar**](EntityModelKommentar.md)

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


## postCollectionResourceKommentarPost

> EntityModelKommentar postCollectionResourceKommentarPost(kommentarRequestBody)



create-kommentar

### Example

```ts
import {
  Configuration,
  KommentarEntityControllerApi,
} from '';
import type { PostCollectionResourceKommentarPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarEntityControllerApi();

  const body = {
    // KommentarRequestBody
    kommentarRequestBody: ...,
  } satisfies PostCollectionResourceKommentarPostRequest;

  try {
    const data = await api.postCollectionResourceKommentarPost(body);
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
| **kommentarRequestBody** | [KommentarRequestBody](KommentarRequestBody.md) |  | |

### Return type

[**EntityModelKommentar**](EntityModelKommentar.md)

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


## putItemResourceKommentarPut

> EntityModelKommentar putItemResourceKommentarPut(id, kommentarRequestBody)



update-kommentar

### Example

```ts
import {
  Configuration,
  KommentarEntityControllerApi,
} from '';
import type { PutItemResourceKommentarPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // KommentarRequestBody
    kommentarRequestBody: ...,
  } satisfies PutItemResourceKommentarPutRequest;

  try {
    const data = await api.putItemResourceKommentarPut(body);
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
| **kommentarRequestBody** | [KommentarRequestBody](KommentarRequestBody.md) |  | |

### Return type

[**EntityModelKommentar**](EntityModelKommentar.md)

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

