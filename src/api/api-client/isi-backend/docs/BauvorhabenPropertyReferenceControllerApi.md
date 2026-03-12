# BauvorhabenPropertyReferenceControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceBauvorhabenPatch**](BauvorhabenPropertyReferenceControllerApi.md#createpropertyreferencebauvorhabenpatch) | **PATCH** /bauvorhabens/{id}/dokumente |  |
| [**createPropertyReferenceBauvorhabenPatch1**](BauvorhabenPropertyReferenceControllerApi.md#createpropertyreferencebauvorhabenpatch1) | **PATCH** /bauvorhabens/{id}/relevanteAbfragevariante |  |
| [**createPropertyReferenceBauvorhabenPut**](BauvorhabenPropertyReferenceControllerApi.md#createpropertyreferencebauvorhabenput) | **PUT** /bauvorhabens/{id}/dokumente |  |
| [**createPropertyReferenceBauvorhabenPut1**](BauvorhabenPropertyReferenceControllerApi.md#createpropertyreferencebauvorhabenput1) | **PUT** /bauvorhabens/{id}/relevanteAbfragevariante |  |
| [**deletePropertyReferenceBauvorhabenDelete**](BauvorhabenPropertyReferenceControllerApi.md#deletepropertyreferencebauvorhabendelete) | **DELETE** /bauvorhabens/{id}/dokumente |  |
| [**deletePropertyReferenceBauvorhabenDelete1**](BauvorhabenPropertyReferenceControllerApi.md#deletepropertyreferencebauvorhabendelete1) | **DELETE** /bauvorhabens/{id}/relevanteAbfragevariante |  |
| [**deletePropertyReferenceIdBauvorhabenDelete**](BauvorhabenPropertyReferenceControllerApi.md#deletepropertyreferenceidbauvorhabendelete) | **DELETE** /bauvorhabens/{id}/dokumente/{propertyId} |  |
| [**deletePropertyReferenceIdBauvorhabenDelete1**](BauvorhabenPropertyReferenceControllerApi.md#deletepropertyreferenceidbauvorhabendelete1) | **DELETE** /bauvorhabens/{id}/relevanteAbfragevariante/{propertyId} |  |
| [**followPropertyReferenceBauvorhabenGet**](BauvorhabenPropertyReferenceControllerApi.md#followpropertyreferencebauvorhabenget) | **GET** /bauvorhabens/{id}/dokumente |  |
| [**followPropertyReferenceBauvorhabenGet1**](BauvorhabenPropertyReferenceControllerApi.md#followpropertyreferencebauvorhabenget1) | **GET** /bauvorhabens/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceBauvorhabenGet2**](BauvorhabenPropertyReferenceControllerApi.md#followpropertyreferencebauvorhabenget2) | **GET** /bauvorhabens/{id}/relevanteAbfragevariante |  |
| [**followPropertyReferenceBauvorhabenGet3**](BauvorhabenPropertyReferenceControllerApi.md#followpropertyreferencebauvorhabenget3) | **GET** /bauvorhabens/{id}/relevanteAbfragevariante/{propertyId} |  |



## createPropertyReferenceBauvorhabenPatch

> CollectionModelDokument createPropertyReferenceBauvorhabenPatch(id, collectionModelObject)



patch-dokument-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceBauvorhabenPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceBauvorhabenPatchRequest;

  try {
    const data = await api.createPropertyReferenceBauvorhabenPatch(body);
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


## createPropertyReferenceBauvorhabenPatch1

> EntityModelAbfragevariante createPropertyReferenceBauvorhabenPatch1(id, collectionModelObject)



patch-abfragevariante-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceBauvorhabenPatch1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceBauvorhabenPatch1Request;

  try {
    const data = await api.createPropertyReferenceBauvorhabenPatch1(body);
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

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

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


## createPropertyReferenceBauvorhabenPut

> CollectionModelDokument createPropertyReferenceBauvorhabenPut(id, collectionModelObject)



update-dokument-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceBauvorhabenPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceBauvorhabenPutRequest;

  try {
    const data = await api.createPropertyReferenceBauvorhabenPut(body);
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


## createPropertyReferenceBauvorhabenPut1

> EntityModelAbfragevariante createPropertyReferenceBauvorhabenPut1(id, collectionModelObject)



update-abfragevariante-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceBauvorhabenPut1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceBauvorhabenPut1Request;

  try {
    const data = await api.createPropertyReferenceBauvorhabenPut1(body);
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

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

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


## deletePropertyReferenceBauvorhabenDelete

> deletePropertyReferenceBauvorhabenDelete(id)



delete-dokument-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceBauvorhabenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceBauvorhabenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceBauvorhabenDelete(body);
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


## deletePropertyReferenceBauvorhabenDelete1

> deletePropertyReferenceBauvorhabenDelete1(id)



delete-abfragevariante-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceBauvorhabenDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceBauvorhabenDelete1Request;

  try {
    const data = await api.deletePropertyReferenceBauvorhabenDelete1(body);
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


## deletePropertyReferenceIdBauvorhabenDelete

> deletePropertyReferenceIdBauvorhabenDelete(id, propertyId)



delete-dokument-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdBauvorhabenDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdBauvorhabenDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdBauvorhabenDelete(body);
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


## deletePropertyReferenceIdBauvorhabenDelete1

> deletePropertyReferenceIdBauvorhabenDelete1(id, propertyId)



delete-abfragevariante-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdBauvorhabenDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdBauvorhabenDelete1Request;

  try {
    const data = await api.deletePropertyReferenceIdBauvorhabenDelete1(body);
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


## followPropertyReferenceBauvorhabenGet

> CollectionModelDokument followPropertyReferenceBauvorhabenGet(id)



get-dokument-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceBauvorhabenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceBauvorhabenGetRequest;

  try {
    const data = await api.followPropertyReferenceBauvorhabenGet(body);
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


## followPropertyReferenceBauvorhabenGet1

> CollectionModelDokument followPropertyReferenceBauvorhabenGet1(id, propertyId)



get-dokument-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceBauvorhabenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceBauvorhabenGet1Request;

  try {
    const data = await api.followPropertyReferenceBauvorhabenGet1(body);
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


## followPropertyReferenceBauvorhabenGet2

> EntityModelAbfragevariante followPropertyReferenceBauvorhabenGet2(id)



get-abfragevariante-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceBauvorhabenGet2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceBauvorhabenGet2Request;

  try {
    const data = await api.followPropertyReferenceBauvorhabenGet2(body);
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

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

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


## followPropertyReferenceBauvorhabenGet3

> EntityModelAbfragevariante followPropertyReferenceBauvorhabenGet3(id, propertyId)



get-abfragevariante-by-bauvorhaben-Id

### Example

```ts
import {
  Configuration,
  BauvorhabenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceBauvorhabenGet3Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BauvorhabenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceBauvorhabenGet3Request;

  try {
    const data = await api.followPropertyReferenceBauvorhabenGet3(body);
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

[**EntityModelAbfragevariante**](EntityModelAbfragevariante.md)

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

