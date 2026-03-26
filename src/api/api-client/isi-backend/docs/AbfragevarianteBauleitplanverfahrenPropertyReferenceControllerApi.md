# AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenpatch) | **PATCH** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPut**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenput) | **PUT** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevariantebauleitplanverfahrendelete) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevariantebauleitplanverfahrendelete) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget1) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/dokumente/{propertyId} |  |



## createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch

> CollectionModelDokument createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch(id, collectionModelObject)



patch-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPatchRequest;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch(body);
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
| **collectionModelObject** | [CollectionModelObject](CollectionModelObject.md) |  | |

### Return type

[**CollectionModelDokument**](CollectionModelDokument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `application/x-spring-data-compact+json`, `text/uri-list`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createPropertyReferenceAbfragevariantebauleitplanverfahrenPut

> CollectionModelDokument createPropertyReferenceAbfragevariantebauleitplanverfahrenPut(id, collectionModelObject)



update-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPutRequest;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut(body);
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
| **collectionModelObject** | [CollectionModelObject](CollectionModelObject.md) |  | |

### Return type

[**CollectionModelDokument**](CollectionModelDokument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `application/x-spring-data-compact+json`, `text/uri-list`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **201** | Created |  -  |
| **204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete

> deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete(id)



delete-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevariantebauleitplanverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevariantebauleitplanverfahrenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete(body);
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


## deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete

> deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete(id, propertyId)



delete-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete(body);
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
| **propertyId** | `string` |  | [Defaults to `undefined`] |

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


## followPropertyReferenceAbfragevariantebauleitplanverfahrenGet

> CollectionModelDokument followPropertyReferenceAbfragevariantebauleitplanverfahrenGet(id)



get-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGetRequest;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet(body);
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

[**CollectionModelDokument**](CollectionModelDokument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`, `text/uri-list`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1

> CollectionModelDokument followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1(id, propertyId)



get-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet1Request;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1(body);
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
| **propertyId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**CollectionModelDokument**](CollectionModelDokument.md)

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

