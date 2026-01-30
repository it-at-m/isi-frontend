# InfrastruktureinrichtungPropertyReferenceControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceInfrastruktureinrichtungPatch**](InfrastruktureinrichtungPropertyReferenceControllerApi.md#createpropertyreferenceinfrastruktureinrichtungpatch) | **PATCH** /infrastruktureinrichtungs/{id}/bauvorhaben |  |
| [**createPropertyReferenceInfrastruktureinrichtungPut**](InfrastruktureinrichtungPropertyReferenceControllerApi.md#createpropertyreferenceinfrastruktureinrichtungput) | **PUT** /infrastruktureinrichtungs/{id}/bauvorhaben |  |
| [**deletePropertyReferenceIdInfrastruktureinrichtungDelete**](InfrastruktureinrichtungPropertyReferenceControllerApi.md#deletepropertyreferenceidinfrastruktureinrichtungdelete) | **DELETE** /infrastruktureinrichtungs/{id}/bauvorhaben/{propertyId} |  |
| [**deletePropertyReferenceInfrastruktureinrichtungDelete**](InfrastruktureinrichtungPropertyReferenceControllerApi.md#deletepropertyreferenceinfrastruktureinrichtungdelete) | **DELETE** /infrastruktureinrichtungs/{id}/bauvorhaben |  |
| [**followPropertyReferenceInfrastruktureinrichtungGet**](InfrastruktureinrichtungPropertyReferenceControllerApi.md#followpropertyreferenceinfrastruktureinrichtungget) | **GET** /infrastruktureinrichtungs/{id}/bauvorhaben |  |
| [**followPropertyReferenceInfrastruktureinrichtungGet1**](InfrastruktureinrichtungPropertyReferenceControllerApi.md#followpropertyreferenceinfrastruktureinrichtungget1) | **GET** /infrastruktureinrichtungs/{id}/bauvorhaben/{propertyId} |  |



## createPropertyReferenceInfrastruktureinrichtungPatch

> EntityModelBauvorhaben createPropertyReferenceInfrastruktureinrichtungPatch(id, collectionModelObject)



patch-bauvorhaben-by-infrastruktureinrichtung-Id

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceInfrastruktureinrichtungPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceInfrastruktureinrichtungPatchRequest;

  try {
    const data = await api.createPropertyReferenceInfrastruktureinrichtungPatch(body);
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


## createPropertyReferenceInfrastruktureinrichtungPut

> EntityModelBauvorhaben createPropertyReferenceInfrastruktureinrichtungPut(id, collectionModelObject)



update-bauvorhaben-by-infrastruktureinrichtung-Id

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceInfrastruktureinrichtungPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceInfrastruktureinrichtungPutRequest;

  try {
    const data = await api.createPropertyReferenceInfrastruktureinrichtungPut(body);
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


## deletePropertyReferenceIdInfrastruktureinrichtungDelete

> deletePropertyReferenceIdInfrastruktureinrichtungDelete(id, propertyId)



delete-bauvorhaben-by-infrastruktureinrichtung-Id

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdInfrastruktureinrichtungDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdInfrastruktureinrichtungDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdInfrastruktureinrichtungDelete(body);
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


## deletePropertyReferenceInfrastruktureinrichtungDelete

> deletePropertyReferenceInfrastruktureinrichtungDelete(id)



delete-bauvorhaben-by-infrastruktureinrichtung-Id

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceInfrastruktureinrichtungDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceInfrastruktureinrichtungDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceInfrastruktureinrichtungDelete(body);
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


## followPropertyReferenceInfrastruktureinrichtungGet

> EntityModelBauvorhaben followPropertyReferenceInfrastruktureinrichtungGet(id)



get-bauvorhaben-by-infrastruktureinrichtung-Id

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceInfrastruktureinrichtungGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceInfrastruktureinrichtungGetRequest;

  try {
    const data = await api.followPropertyReferenceInfrastruktureinrichtungGet(body);
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


## followPropertyReferenceInfrastruktureinrichtungGet1

> EntityModelBauvorhaben followPropertyReferenceInfrastruktureinrichtungGet1(id, propertyId)



get-bauvorhaben-by-infrastruktureinrichtung-Id

### Example

```ts
import {
  Configuration,
  InfrastruktureinrichtungPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceInfrastruktureinrichtungGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InfrastruktureinrichtungPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceInfrastruktureinrichtungGet1Request;

  try {
    const data = await api.followPropertyReferenceInfrastruktureinrichtungGet1(body);
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

