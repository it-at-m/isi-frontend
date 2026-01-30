# IdealtypischeBaurateEntityControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteItemResourceIdealtypischebaurateDelete**](IdealtypischeBaurateEntityControllerApi.md#deleteitemresourceidealtypischebauratedelete) | **DELETE** /idealtypischeBaurates/{id} |  |
| [**getCollectionResourceIdealtypischebaurateGet**](IdealtypischeBaurateEntityControllerApi.md#getcollectionresourceidealtypischebaurateget) | **GET** /idealtypischeBaurates |  |
| [**getItemResourceIdealtypischebaurateGet**](IdealtypischeBaurateEntityControllerApi.md#getitemresourceidealtypischebaurateget) | **GET** /idealtypischeBaurates/{id} |  |
| [**patchItemResourceIdealtypischebauratePatch**](IdealtypischeBaurateEntityControllerApi.md#patchitemresourceidealtypischebauratepatch) | **PATCH** /idealtypischeBaurates/{id} |  |
| [**postCollectionResourceIdealtypischebauratePost**](IdealtypischeBaurateEntityControllerApi.md#postcollectionresourceidealtypischebauratepost) | **POST** /idealtypischeBaurates |  |
| [**putItemResourceIdealtypischebauratePut**](IdealtypischeBaurateEntityControllerApi.md#putitemresourceidealtypischebaurateput) | **PUT** /idealtypischeBaurates/{id} |  |



## deleteItemResourceIdealtypischebaurateDelete

> deleteItemResourceIdealtypischebaurateDelete(id)



delete-idealtypischebaurate

### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateEntityControllerApi,
} from '';
import type { DeleteItemResourceIdealtypischebaurateDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeleteItemResourceIdealtypischebaurateDeleteRequest;

  try {
    const data = await api.deleteItemResourceIdealtypischebaurateDelete(body);
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


## getCollectionResourceIdealtypischebaurateGet

> PagedModelEntityModelIdealtypischeBaurate getCollectionResourceIdealtypischebaurateGet(page, size, sort)



get-idealtypischebaurate

### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateEntityControllerApi,
} from '';
import type { GetCollectionResourceIdealtypischebaurateGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateEntityControllerApi();

  const body = {
    // number | Zero-based page index (0..N) (optional)
    page: 56,
    // number | The size of the page to be returned (optional)
    size: 56,
    // Array<string> | Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. (optional)
    sort: ...,
  } satisfies GetCollectionResourceIdealtypischebaurateGetRequest;

  try {
    const data = await api.getCollectionResourceIdealtypischebaurateGet(body);
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

[**PagedModelEntityModelIdealtypischeBaurate**](PagedModelEntityModelIdealtypischeBaurate.md)

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


## getItemResourceIdealtypischebaurateGet

> EntityModelIdealtypischeBaurate getItemResourceIdealtypischebaurateGet(id)



get-idealtypischebaurate

### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateEntityControllerApi,
} from '';
import type { GetItemResourceIdealtypischebaurateGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateEntityControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetItemResourceIdealtypischebaurateGetRequest;

  try {
    const data = await api.getItemResourceIdealtypischebaurateGet(body);
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

[**EntityModelIdealtypischeBaurate**](EntityModelIdealtypischeBaurate.md)

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


## patchItemResourceIdealtypischebauratePatch

> EntityModelIdealtypischeBaurate patchItemResourceIdealtypischebauratePatch(id, idealtypischeBaurateRequestBody)



patch-idealtypischebaurate

### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateEntityControllerApi,
} from '';
import type { PatchItemResourceIdealtypischebauratePatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // IdealtypischeBaurateRequestBody
    idealtypischeBaurateRequestBody: ...,
  } satisfies PatchItemResourceIdealtypischebauratePatchRequest;

  try {
    const data = await api.patchItemResourceIdealtypischebauratePatch(body);
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
| **idealtypischeBaurateRequestBody** | [IdealtypischeBaurateRequestBody](IdealtypischeBaurateRequestBody.md) |  | |

### Return type

[**EntityModelIdealtypischeBaurate**](EntityModelIdealtypischeBaurate.md)

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


## postCollectionResourceIdealtypischebauratePost

> EntityModelIdealtypischeBaurate postCollectionResourceIdealtypischebauratePost(idealtypischeBaurateRequestBody)



create-idealtypischebaurate

### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateEntityControllerApi,
} from '';
import type { PostCollectionResourceIdealtypischebauratePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateEntityControllerApi();

  const body = {
    // IdealtypischeBaurateRequestBody
    idealtypischeBaurateRequestBody: ...,
  } satisfies PostCollectionResourceIdealtypischebauratePostRequest;

  try {
    const data = await api.postCollectionResourceIdealtypischebauratePost(body);
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
| **idealtypischeBaurateRequestBody** | [IdealtypischeBaurateRequestBody](IdealtypischeBaurateRequestBody.md) |  | |

### Return type

[**EntityModelIdealtypischeBaurate**](EntityModelIdealtypischeBaurate.md)

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


## putItemResourceIdealtypischebauratePut

> EntityModelIdealtypischeBaurate putItemResourceIdealtypischebauratePut(id, idealtypischeBaurateRequestBody)



update-idealtypischebaurate

### Example

```ts
import {
  Configuration,
  IdealtypischeBaurateEntityControllerApi,
} from '';
import type { PutItemResourceIdealtypischebauratePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new IdealtypischeBaurateEntityControllerApi();

  const body = {
    // string
    id: id_example,
    // IdealtypischeBaurateRequestBody
    idealtypischeBaurateRequestBody: ...,
  } satisfies PutItemResourceIdealtypischebauratePutRequest;

  try {
    const data = await api.putItemResourceIdealtypischebauratePut(body);
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
| **idealtypischeBaurateRequestBody** | [IdealtypischeBaurateRequestBody](IdealtypischeBaurateRequestBody.md) |  | |

### Return type

[**EntityModelIdealtypischeBaurate**](EntityModelIdealtypischeBaurate.md)

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

