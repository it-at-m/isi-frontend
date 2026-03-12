# AbfrageEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceAbfrageDelete**](AbfrageEntityControllerApi.md#deleteitemresourceabfragedelete) | **DELETE** /abfrages/{id} |  |
| [**getCollectionResourceAbfrageGet**](AbfrageEntityControllerApi.md#getcollectionresourceabfrageget) | **GET** /abfrages |  |
| [**getItemResourceAbfrageGet**](AbfrageEntityControllerApi.md#getitemresourceabfrageget) | **GET** /abfrages/{id} |  |
| [**patchItemResourceAbfragePatch**](AbfrageEntityControllerApi.md#patchitemresourceabfragepatch) | **PATCH** /abfrages/{id} |  |
| [**postCollectionResourceAbfragePost**](AbfrageEntityControllerApi.md#postcollectionresourceabfragepost) | **POST** /abfrages |  |
| [**putItemResourceAbfragePut**](AbfrageEntityControllerApi.md#putitemresourceabfrageput) | **PUT** /abfrages/{id} |  |



## deleteItemResourceAbfrageDelete

> deleteItemResourceAbfrageDelete(id)



delete-abfrage

### Example

```ts
import {
  Configuration,
  AbfrageEntityControllerApi,
} from '';
import type { DeleteItemResourceAbfrageDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceAbfrageDeleteRequest;

  try {
    const data = await api.deleteItemResourceAbfrageDelete(body);
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


## getCollectionResourceAbfrageGet

> PagedModelEntityModelAbfrage getCollectionResourceAbfrageGet(page, size, sort)



get-abfrage

### Example

```ts
import {
  Configuration,
  AbfrageEntityControllerApi,
} from '';
import type { GetCollectionResourceAbfrageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceAbfrageGetRequest;

  try {
    const data = await api.getCollectionResourceAbfrageGet(body);
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

[**PagedModelEntityModelAbfrage**](PagedModelEntityModelAbfrage.md)

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


## getItemResourceAbfrageGet

> EntityModelAbfrage getItemResourceAbfrageGet(id)



get-abfrage

### Example

```ts
import {
  Configuration,
  AbfrageEntityControllerApi,
} from '';
import type { GetItemResourceAbfrageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceAbfrageGetRequest;

  try {
    const data = await api.getItemResourceAbfrageGet(body);
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

[**EntityModelAbfrage**](EntityModelAbfrage.md)

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


## patchItemResourceAbfragePatch

> EntityModelAbfrage patchItemResourceAbfragePatch(id, abfrageRequestBody)



patch-abfrage

### Example

```ts
import {
  Configuration,
  AbfrageEntityControllerApi,
} from '';
import type { PatchItemResourceAbfragePatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfrageRequestBody
    abfrageRequestBody: ...,
  } satisfies PatchItemResourceAbfragePatchRequest;

  try {
    const data = await api.patchItemResourceAbfragePatch(body);
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
| **abfrageRequestBody** | [AbfrageRequestBody](AbfrageRequestBody.md) |  | |

### Return type

[**EntityModelAbfrage**](EntityModelAbfrage.md)

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


## postCollectionResourceAbfragePost

> EntityModelAbfrage postCollectionResourceAbfragePost(abfrageRequestBody)



create-abfrage

### Example

```ts
import {
  Configuration,
  AbfrageEntityControllerApi,
} from '';
import type { PostCollectionResourceAbfragePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageEntityControllerApi();

  const body = {
    // AbfrageRequestBody
    abfrageRequestBody: ...,
  } satisfies PostCollectionResourceAbfragePostRequest;

  try {
    const data = await api.postCollectionResourceAbfragePost(body);
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
| **abfrageRequestBody** | [AbfrageRequestBody](AbfrageRequestBody.md) |  | |

### Return type

[**EntityModelAbfrage**](EntityModelAbfrage.md)

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


## putItemResourceAbfragePut

> EntityModelAbfrage putItemResourceAbfragePut(id, abfrageRequestBody)



update-abfrage

### Example

```ts
import {
  Configuration,
  AbfrageEntityControllerApi,
} from '';
import type { PutItemResourceAbfragePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfrageRequestBody
    abfrageRequestBody: ...,
  } satisfies PutItemResourceAbfragePutRequest;

  try {
    const data = await api.putItemResourceAbfragePut(body);
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
| **abfrageRequestBody** | [AbfrageRequestBody](AbfrageRequestBody.md) |  | |

### Return type

[**EntityModelAbfrage**](EntityModelAbfrage.md)

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

