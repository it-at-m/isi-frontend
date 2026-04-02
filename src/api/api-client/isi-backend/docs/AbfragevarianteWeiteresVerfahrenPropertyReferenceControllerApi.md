# AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPatch**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenpatch) | **PATCH** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPut**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenput) | **PUT** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevarianteweiteresverfahrendelete) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevarianteweiteresverfahrendelete) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet1**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget1) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/dokumente/{propertyId} |  |



## createPropertyReferenceAbfragevarianteweiteresverfahrenPatch

> CollectionModelDokument createPropertyReferenceAbfragevarianteweiteresverfahrenPatch(id, collectionModelObject)



patch-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevarianteweiteresverfahrenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevarianteweiteresverfahrenPatchRequest;

  try {
    const data = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch(body);
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


## createPropertyReferenceAbfragevarianteweiteresverfahrenPut

> CollectionModelDokument createPropertyReferenceAbfragevarianteweiteresverfahrenPut(id, collectionModelObject)



update-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevarianteweiteresverfahrenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevarianteweiteresverfahrenPutRequest;

  try {
    const data = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut(body);
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


## deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete

> deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete(id)



delete-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevarianteweiteresverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevarianteweiteresverfahrenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete(body);
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


## deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete

> deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete(id, propertyId)



delete-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevarianteweiteresverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevarianteweiteresverfahrenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete(body);
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


## followPropertyReferenceAbfragevarianteweiteresverfahrenGet

> CollectionModelDokument followPropertyReferenceAbfragevarianteweiteresverfahrenGet(id)



get-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevarianteweiteresverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevarianteweiteresverfahrenGetRequest;

  try {
    const data = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet(body);
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


## followPropertyReferenceAbfragevarianteweiteresverfahrenGet1

> CollectionModelDokument followPropertyReferenceAbfragevarianteweiteresverfahrenGet1(id, propertyId)



get-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet1Request;

  try {
    const data = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet1(body);
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

