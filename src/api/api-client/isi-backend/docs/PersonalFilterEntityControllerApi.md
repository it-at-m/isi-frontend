# PersonalFilterEntityControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourcePersonalfilterDelete**](PersonalFilterEntityControllerApi.md#deleteitemresourcepersonalfilterdelete) | **DELETE** /personalFilters/{id} |  |
| [**getCollectionResourcePersonalfilterGet**](PersonalFilterEntityControllerApi.md#getcollectionresourcepersonalfilterget) | **GET** /personalFilters |  |
| [**getItemResourcePersonalfilterGet**](PersonalFilterEntityControllerApi.md#getitemresourcepersonalfilterget) | **GET** /personalFilters/{id} |  |
| [**patchItemResourcePersonalfilterPatch**](PersonalFilterEntityControllerApi.md#patchitemresourcepersonalfilterpatch) | **PATCH** /personalFilters/{id} |  |
| [**postCollectionResourcePersonalfilterPost**](PersonalFilterEntityControllerApi.md#postcollectionresourcepersonalfilterpost) | **POST** /personalFilters |  |
| [**putItemResourcePersonalfilterPut**](PersonalFilterEntityControllerApi.md#putitemresourcepersonalfilterput) | **PUT** /personalFilters/{id} |  |



## deleteItemResourcePersonalfilterDelete

> deleteItemResourcePersonalfilterDelete(id)



delete-personalfilter

### Example

```ts
import {
  Configuration,
  PersonalFilterEntityControllerApi,
} from '';
import type { DeleteItemResourcePersonalfilterDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourcePersonalfilterDeleteRequest;

  try {
    const data = await api.deleteItemResourcePersonalfilterDelete(body);
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


## getCollectionResourcePersonalfilterGet

> PagedModelEntityModelPersonalFilter getCollectionResourcePersonalfilterGet(page, size, sort)



get-personalfilter

### Example

```ts
import {
  Configuration,
  PersonalFilterEntityControllerApi,
} from '';
import type { GetCollectionResourcePersonalfilterGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourcePersonalfilterGetRequest;

  try {
    const data = await api.getCollectionResourcePersonalfilterGet(body);
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

[**PagedModelEntityModelPersonalFilter**](PagedModelEntityModelPersonalFilter.md)

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


## getItemResourcePersonalfilterGet

> EntityModelPersonalFilter getItemResourcePersonalfilterGet(id)



get-personalfilter

### Example

```ts
import {
  Configuration,
  PersonalFilterEntityControllerApi,
} from '';
import type { GetItemResourcePersonalfilterGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourcePersonalfilterGetRequest;

  try {
    const data = await api.getItemResourcePersonalfilterGet(body);
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

[**EntityModelPersonalFilter**](EntityModelPersonalFilter.md)

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


## patchItemResourcePersonalfilterPatch

> EntityModelPersonalFilter patchItemResourcePersonalfilterPatch(id, personalFilterRequestBody)



patch-personalfilter

### Example

```ts
import {
  Configuration,
  PersonalFilterEntityControllerApi,
} from '';
import type { PatchItemResourcePersonalfilterPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // PersonalFilterRequestBody
    personalFilterRequestBody: ...,
  } satisfies PatchItemResourcePersonalfilterPatchRequest;

  try {
    const data = await api.patchItemResourcePersonalfilterPatch(body);
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
| **personalFilterRequestBody** | [PersonalFilterRequestBody](PersonalFilterRequestBody.md) |  | |

### Return type

[**EntityModelPersonalFilter**](EntityModelPersonalFilter.md)

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


## postCollectionResourcePersonalfilterPost

> EntityModelPersonalFilter postCollectionResourcePersonalfilterPost(personalFilterRequestBody)



create-personalfilter

### Example

```ts
import {
  Configuration,
  PersonalFilterEntityControllerApi,
} from '';
import type { PostCollectionResourcePersonalfilterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterEntityControllerApi();

  const body = {
    // PersonalFilterRequestBody
    personalFilterRequestBody: ...,
  } satisfies PostCollectionResourcePersonalfilterPostRequest;

  try {
    const data = await api.postCollectionResourcePersonalfilterPost(body);
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
| **personalFilterRequestBody** | [PersonalFilterRequestBody](PersonalFilterRequestBody.md) |  | |

### Return type

[**EntityModelPersonalFilter**](EntityModelPersonalFilter.md)

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


## putItemResourcePersonalfilterPut

> EntityModelPersonalFilter putItemResourcePersonalfilterPut(id, personalFilterRequestBody)



update-personalfilter

### Example

```ts
import {
  Configuration,
  PersonalFilterEntityControllerApi,
} from '';
import type { PutItemResourcePersonalfilterPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // PersonalFilterRequestBody
    personalFilterRequestBody: ...,
  } satisfies PutItemResourcePersonalfilterPutRequest;

  try {
    const data = await api.putItemResourcePersonalfilterPut(body);
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
| **personalFilterRequestBody** | [PersonalFilterRequestBody](PersonalFilterRequestBody.md) |  | |

### Return type

[**EntityModelPersonalFilter**](EntityModelPersonalFilter.md)

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

