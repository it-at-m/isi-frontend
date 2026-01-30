# AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDelete**](AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi.md#deleteitemresourceabfragevariantebaugenehmigungsverfahrendelete) | **DELETE** /abfragevarianteBaugenehmigungsverfahrens/{id} |  |
| [**getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet**](AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi.md#getcollectionresourceabfragevariantebaugenehmigungsverfahrenget) | **GET** /abfragevarianteBaugenehmigungsverfahrens |  |
| [**getItemResourceAbfragevariantebaugenehmigungsverfahrenGet**](AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi.md#getitemresourceabfragevariantebaugenehmigungsverfahrenget) | **GET** /abfragevarianteBaugenehmigungsverfahrens/{id} |  |
| [**patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch**](AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi.md#patchitemresourceabfragevariantebaugenehmigungsverfahrenpatch) | **PATCH** /abfragevarianteBaugenehmigungsverfahrens/{id} |  |
| [**postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPost**](AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi.md#postcollectionresourceabfragevariantebaugenehmigungsverfahrenpost) | **POST** /abfragevarianteBaugenehmigungsverfahrens |  |
| [**putItemResourceAbfragevariantebaugenehmigungsverfahrenPut**](AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi.md#putitemresourceabfragevariantebaugenehmigungsverfahrenput) | **PUT** /abfragevarianteBaugenehmigungsverfahrens/{id} |  |



## deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDelete

> deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDelete(id)



delete-abfragevariantebaugenehmigungsverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi,
} from '';
import type { DeleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceAbfragevariantebaugenehmigungsverfahrenDeleteRequest;

  try {
    const data = await api.deleteItemResourceAbfragevariantebaugenehmigungsverfahrenDelete(body);
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


## getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet

> PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahren getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet(page, size, sort)



get-abfragevariantebaugenehmigungsverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi,
} from '';
import type { GetCollectionResourceAbfragevariantebaugenehmigungsverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceAbfragevariantebaugenehmigungsverfahrenGetRequest;

  try {
    const data = await api.getCollectionResourceAbfragevariantebaugenehmigungsverfahrenGet(body);
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

[**PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahren**](PagedModelEntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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


## getItemResourceAbfragevariantebaugenehmigungsverfahrenGet

> EntityModelAbfragevarianteBaugenehmigungsverfahren getItemResourceAbfragevariantebaugenehmigungsverfahrenGet(id)



get-abfragevariantebaugenehmigungsverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi,
} from '';
import type { GetItemResourceAbfragevariantebaugenehmigungsverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceAbfragevariantebaugenehmigungsverfahrenGetRequest;

  try {
    const data = await api.getItemResourceAbfragevariantebaugenehmigungsverfahrenGet(body);
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

[**EntityModelAbfragevarianteBaugenehmigungsverfahren**](EntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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


## patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch

> EntityModelAbfragevarianteBaugenehmigungsverfahren patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch(id, abfragevarianteBaugenehmigungsverfahrenRequestBody)



patch-abfragevariantebaugenehmigungsverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi,
} from '';
import type { PatchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteBaugenehmigungsverfahrenRequestBody
    abfragevarianteBaugenehmigungsverfahrenRequestBody: ...,
  } satisfies PatchItemResourceAbfragevariantebaugenehmigungsverfahrenPatchRequest;

  try {
    const data = await api.patchItemResourceAbfragevariantebaugenehmigungsverfahrenPatch(body);
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
| **abfragevarianteBaugenehmigungsverfahrenRequestBody** | [AbfragevarianteBaugenehmigungsverfahrenRequestBody](AbfragevarianteBaugenehmigungsverfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteBaugenehmigungsverfahren**](EntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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


## postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPost

> EntityModelAbfragevarianteBaugenehmigungsverfahren postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPost(abfragevarianteBaugenehmigungsverfahrenRequestBody)



create-abfragevariantebaugenehmigungsverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi,
} from '';
import type { PostCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi();

  const body = {
    // AbfragevarianteBaugenehmigungsverfahrenRequestBody
    abfragevarianteBaugenehmigungsverfahrenRequestBody: ...,
  } satisfies PostCollectionResourceAbfragevariantebaugenehmigungsverfahrenPostRequest;

  try {
    const data = await api.postCollectionResourceAbfragevariantebaugenehmigungsverfahrenPost(body);
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
| **abfragevarianteBaugenehmigungsverfahrenRequestBody** | [AbfragevarianteBaugenehmigungsverfahrenRequestBody](AbfragevarianteBaugenehmigungsverfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteBaugenehmigungsverfahren**](EntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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


## putItemResourceAbfragevariantebaugenehmigungsverfahrenPut

> EntityModelAbfragevarianteBaugenehmigungsverfahren putItemResourceAbfragevariantebaugenehmigungsverfahrenPut(id, abfragevarianteBaugenehmigungsverfahrenRequestBody)



update-abfragevariantebaugenehmigungsverfahren

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi,
} from '';
import type { PutItemResourceAbfragevariantebaugenehmigungsverfahrenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // AbfragevarianteBaugenehmigungsverfahrenRequestBody
    abfragevarianteBaugenehmigungsverfahrenRequestBody: ...,
  } satisfies PutItemResourceAbfragevariantebaugenehmigungsverfahrenPutRequest;

  try {
    const data = await api.putItemResourceAbfragevariantebaugenehmigungsverfahrenPut(body);
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
| **abfragevarianteBaugenehmigungsverfahrenRequestBody** | [AbfragevarianteBaugenehmigungsverfahrenRequestBody](AbfragevarianteBaugenehmigungsverfahrenRequestBody.md) |  | |

### Return type

[**EntityModelAbfragevarianteBaugenehmigungsverfahren**](EntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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

