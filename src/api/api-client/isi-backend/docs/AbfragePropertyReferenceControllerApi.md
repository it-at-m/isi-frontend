# AbfragePropertyReferenceControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceAbfragePatch**](AbfragePropertyReferenceControllerApi.md#createpropertyreferenceabfragepatch) | **PATCH** /abfrages/{id}/bauvorhaben |  |
| [**createPropertyReferenceAbfragePut**](AbfragePropertyReferenceControllerApi.md#createpropertyreferenceabfrageput) | **PUT** /abfrages/{id}/bauvorhaben |  |
| [**deletePropertyReferenceAbfrageDelete**](AbfragePropertyReferenceControllerApi.md#deletepropertyreferenceabfragedelete) | **DELETE** /abfrages/{id}/bauvorhaben |  |
| [**deletePropertyReferenceIdAbfrageDelete**](AbfragePropertyReferenceControllerApi.md#deletepropertyreferenceidabfragedelete) | **DELETE** /abfrages/{id}/bauvorhaben/{propertyId} |  |
| [**followPropertyReferenceAbfrageGet**](AbfragePropertyReferenceControllerApi.md#followpropertyreferenceabfrageget) | **GET** /abfrages/{id}/bauvorhaben |  |
| [**followPropertyReferenceAbfrageGet1**](AbfragePropertyReferenceControllerApi.md#followpropertyreferenceabfrageget1) | **GET** /abfrages/{id}/bauvorhaben/{propertyId} |  |



## createPropertyReferenceAbfragePatch

> EntityModelBauvorhaben createPropertyReferenceAbfragePatch(id, collectionModelObject)



patch-bauvorhaben-by-abfrage-Id

### Example

```ts
import {
  Configuration,
  AbfragePropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragePatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragePropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragePatchRequest;

  try {
    const data = await api.createPropertyReferenceAbfragePatch(body);
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

[**EntityModelBauvorhaben**](EntityModelBauvorhaben.md)

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


## createPropertyReferenceAbfragePut

> EntityModelBauvorhaben createPropertyReferenceAbfragePut(id, collectionModelObject)



update-bauvorhaben-by-abfrage-Id

### Example

```ts
import {
  Configuration,
  AbfragePropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragePropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragePutRequest;

  try {
    const data = await api.createPropertyReferenceAbfragePut(body);
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

[**EntityModelBauvorhaben**](EntityModelBauvorhaben.md)

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


## deletePropertyReferenceAbfrageDelete

> deletePropertyReferenceAbfrageDelete(id)



delete-bauvorhaben-by-abfrage-Id

### Example

```ts
import {
  Configuration,
  AbfragePropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfrageDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragePropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfrageDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceAbfrageDelete(body);
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


## deletePropertyReferenceIdAbfrageDelete

> deletePropertyReferenceIdAbfrageDelete(id, propertyId)



delete-bauvorhaben-by-abfrage-Id

### Example

```ts
import {
  Configuration,
  AbfragePropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfrageDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragePropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfrageDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdAbfrageDelete(body);
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


## followPropertyReferenceAbfrageGet

> EntityModelBauvorhaben followPropertyReferenceAbfrageGet(id)



get-bauvorhaben-by-abfrage-Id

### Example

```ts
import {
  Configuration,
  AbfragePropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfrageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragePropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfrageGetRequest;

  try {
    const data = await api.followPropertyReferenceAbfrageGet(body);
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
- **Accept**: `application/hal+json`, `text/uri-list`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## followPropertyReferenceAbfrageGet1

> EntityModelBauvorhaben followPropertyReferenceAbfrageGet1(id, propertyId)



get-bauvorhaben-by-abfrage-Id

### Example

```ts
import {
  Configuration,
  AbfragePropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfrageGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragePropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfrageGet1Request;

  try {
    const data = await api.followPropertyReferenceAbfrageGet1(body);
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

