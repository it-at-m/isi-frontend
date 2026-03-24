# AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch**](AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebaugenehmigungsverfahrenpatch) | **PATCH** /abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente |  |
| [**createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut**](AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebaugenehmigungsverfahrenput) | **PUT** /abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete**](AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevariantebaugenehmigungsverfahrendelete) | **DELETE** /abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete**](AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevariantebaugenehmigungsverfahrendelete) | **DELETE** /abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet**](AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebaugenehmigungsverfahrenget) | **GET** /abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente |  |
| [**followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1**](AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebaugenehmigungsverfahrenget1) | **GET** /abfragevarianteBaugenehmigungsverfahrens/{id}/dokumente/{propertyId} |  |



## createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch

> CollectionModelDokument createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch(id, collectionModelObject)



patch-dokument-by-abfragevariantebaugenehmigungsverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatchRequest;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPatch(body);
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


## createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut

> CollectionModelDokument createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut(id, collectionModelObject)



update-dokument-by-abfragevariantebaugenehmigungsverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebaugenehmigungsverfahrenPutRequest;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebaugenehmigungsverfahrenPut(body);
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


## deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete

> deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete(id)



delete-dokument-by-abfragevariantebaugenehmigungsverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceAbfragevariantebaugenehmigungsverfahrenDelete(body);
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


## deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete

> deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete(id, propertyId)



delete-dokument-by-abfragevariantebaugenehmigungsverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevariantebaugenehmigungsverfahrenDelete(body);
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


## followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet

> CollectionModelDokument followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet(id)



get-dokument-by-abfragevariantebaugenehmigungsverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGetRequest;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet(body);
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


## followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1

> CollectionModelDokument followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1(id, propertyId)



get-dokument-by-abfragevariantebaugenehmigungsverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1Request;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebaugenehmigungsverfahrenGet1(body);
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

