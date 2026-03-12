# BauvorhabenEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceBauvorhabenDelete**](BauvorhabenEntityControllerApi.md#deleteitemresourcebauvorhabendelete) | **DELETE** /bauvorhabens/{id} |  |
| [**getCollectionResourceBauvorhabenGet**](BauvorhabenEntityControllerApi.md#getcollectionresourcebauvorhabenget) | **GET** /bauvorhabens |  |
| [**getItemResourceBauvorhabenGet**](BauvorhabenEntityControllerApi.md#getitemresourcebauvorhabenget) | **GET** /bauvorhabens/{id} |  |
| [**patchItemResourceBauvorhabenPatch**](BauvorhabenEntityControllerApi.md#patchitemresourcebauvorhabenpatch) | **PATCH** /bauvorhabens/{id} |  |
| [**postCollectionResourceBauvorhabenPost**](BauvorhabenEntityControllerApi.md#postcollectionresourcebauvorhabenpost) | **POST** /bauvorhabens |  |
| [**putItemResourceBauvorhabenPut**](BauvorhabenEntityControllerApi.md#putitemresourcebauvorhabenput) | **PUT** /bauvorhabens/{id} |  |



## deleteItemResourceBauvorhabenDelete

> deleteItemResourceBauvorhabenDelete(id)



delete-bauvorhaben

### Example

```ts
import {
  Configuration,
  BauvorhabenEntityControllerApi,
} from '';
import type { DeleteItemResourceBauvorhabenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceBauvorhabenDeleteRequest;

  try {
    const data = await api.deleteItemResourceBauvorhabenDelete(body);
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


## getCollectionResourceBauvorhabenGet

> PagedModelEntityModelBauvorhaben getCollectionResourceBauvorhabenGet(page, size, sort)



get-bauvorhaben

### Example

```ts
import {
  Configuration,
  BauvorhabenEntityControllerApi,
} from '';
import type { GetCollectionResourceBauvorhabenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceBauvorhabenGetRequest;

  try {
    const data = await api.getCollectionResourceBauvorhabenGet(body);
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

[**PagedModelEntityModelBauvorhaben**](PagedModelEntityModelBauvorhaben.md)

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


## getItemResourceBauvorhabenGet

> EntityModelBauvorhaben getItemResourceBauvorhabenGet(id)



get-bauvorhaben

### Example

```ts
import {
  Configuration,
  BauvorhabenEntityControllerApi,
} from '';
import type { GetItemResourceBauvorhabenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceBauvorhabenGetRequest;

  try {
    const data = await api.getItemResourceBauvorhabenGet(body);
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

[**EntityModelBauvorhaben**](EntityModelBauvorhaben.md)

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


## patchItemResourceBauvorhabenPatch

> EntityModelBauvorhaben patchItemResourceBauvorhabenPatch(id, bauvorhabenRequestBody)



patch-bauvorhaben

### Example

```ts
import {
  Configuration,
  BauvorhabenEntityControllerApi,
} from '';
import type { PatchItemResourceBauvorhabenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // BauvorhabenRequestBody
    bauvorhabenRequestBody: ...,
  } satisfies PatchItemResourceBauvorhabenPatchRequest;

  try {
    const data = await api.patchItemResourceBauvorhabenPatch(body);
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
| **bauvorhabenRequestBody** | [BauvorhabenRequestBody](BauvorhabenRequestBody.md) |  | |

### Return type

[**EntityModelBauvorhaben**](EntityModelBauvorhaben.md)

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


## postCollectionResourceBauvorhabenPost

> EntityModelBauvorhaben postCollectionResourceBauvorhabenPost(bauvorhabenRequestBody)



create-bauvorhaben

### Example

```ts
import {
  Configuration,
  BauvorhabenEntityControllerApi,
} from '';
import type { PostCollectionResourceBauvorhabenPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenEntityControllerApi();

  const body = {
    // BauvorhabenRequestBody
    bauvorhabenRequestBody: ...,
  } satisfies PostCollectionResourceBauvorhabenPostRequest;

  try {
    const data = await api.postCollectionResourceBauvorhabenPost(body);
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
| **bauvorhabenRequestBody** | [BauvorhabenRequestBody](BauvorhabenRequestBody.md) |  | |

### Return type

[**EntityModelBauvorhaben**](EntityModelBauvorhaben.md)

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


## putItemResourceBauvorhabenPut

> EntityModelBauvorhaben putItemResourceBauvorhabenPut(id, bauvorhabenRequestBody)



update-bauvorhaben

### Example

```ts
import {
  Configuration,
  BauvorhabenEntityControllerApi,
} from '';
import type { PutItemResourceBauvorhabenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // BauvorhabenRequestBody
    bauvorhabenRequestBody: ...,
  } satisfies PutItemResourceBauvorhabenPutRequest;

  try {
    const data = await api.putItemResourceBauvorhabenPut(body);
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
| **bauvorhabenRequestBody** | [BauvorhabenRequestBody](BauvorhabenRequestBody.md) |  | |

### Return type

[**EntityModelBauvorhaben**](EntityModelBauvorhaben.md)

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

