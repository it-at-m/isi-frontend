# KommentarPropertyReferenceControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceKommentarPatch**](KommentarPropertyReferenceControllerApi.md#createpropertyreferencekommentarpatch) | **PATCH** /kommentars/{id}/bauvorhaben |  |
| [**createPropertyReferenceKommentarPatch1**](KommentarPropertyReferenceControllerApi.md#createpropertyreferencekommentarpatch1) | **PATCH** /kommentars/{id}/dokumente |  |
| [**createPropertyReferenceKommentarPatch2**](KommentarPropertyReferenceControllerApi.md#createpropertyreferencekommentarpatch2) | **PATCH** /kommentars/{id}/infrastruktureinrichtung |  |
| [**createPropertyReferenceKommentarPut**](KommentarPropertyReferenceControllerApi.md#createpropertyreferencekommentarput) | **PUT** /kommentars/{id}/bauvorhaben |  |
| [**createPropertyReferenceKommentarPut1**](KommentarPropertyReferenceControllerApi.md#createpropertyreferencekommentarput1) | **PUT** /kommentars/{id}/dokumente |  |
| [**createPropertyReferenceKommentarPut2**](KommentarPropertyReferenceControllerApi.md#createpropertyreferencekommentarput2) | **PUT** /kommentars/{id}/infrastruktureinrichtung |  |
| [**deletePropertyReferenceIdKommentarDelete**](KommentarPropertyReferenceControllerApi.md#deletepropertyreferenceidkommentardelete) | **DELETE** /kommentars/{id}/bauvorhaben/{propertyId} |  |
| [**deletePropertyReferenceIdKommentarDelete1**](KommentarPropertyReferenceControllerApi.md#deletepropertyreferenceidkommentardelete1) | **DELETE** /kommentars/{id}/dokumente/{propertyId} |  |
| [**deletePropertyReferenceIdKommentarDelete2**](KommentarPropertyReferenceControllerApi.md#deletepropertyreferenceidkommentardelete2) | **DELETE** /kommentars/{id}/infrastruktureinrichtung/{propertyId} |  |
| [**deletePropertyReferenceKommentarDelete**](KommentarPropertyReferenceControllerApi.md#deletepropertyreferencekommentardelete) | **DELETE** /kommentars/{id}/bauvorhaben |  |
| [**deletePropertyReferenceKommentarDelete1**](KommentarPropertyReferenceControllerApi.md#deletepropertyreferencekommentardelete1) | **DELETE** /kommentars/{id}/dokumente |  |
| [**deletePropertyReferenceKommentarDelete2**](KommentarPropertyReferenceControllerApi.md#deletepropertyreferencekommentardelete2) | **DELETE** /kommentars/{id}/infrastruktureinrichtung |  |
| [**followPropertyReferenceKommentarGet**](KommentarPropertyReferenceControllerApi.md#followpropertyreferencekommentarget) | **GET** /kommentars/{id}/bauvorhaben |  |
| [**followPropertyReferenceKommentarGet1**](KommentarPropertyReferenceControllerApi.md#followpropertyreferencekommentarget1) | **GET** /kommentars/{id}/bauvorhaben/{propertyId} |  |
| [**followPropertyReferenceKommentarGet2**](KommentarPropertyReferenceControllerApi.md#followpropertyreferencekommentarget2) | **GET** /kommentars/{id}/dokumente |  |
| [**followPropertyReferenceKommentarGet3**](KommentarPropertyReferenceControllerApi.md#followpropertyreferencekommentarget3) | **GET** /kommentars/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceKommentarGet4**](KommentarPropertyReferenceControllerApi.md#followpropertyreferencekommentarget4) | **GET** /kommentars/{id}/infrastruktureinrichtung |  |
| [**followPropertyReferenceKommentarGet5**](KommentarPropertyReferenceControllerApi.md#followpropertyreferencekommentarget5) | **GET** /kommentars/{id}/infrastruktureinrichtung/{propertyId} |  |



## createPropertyReferenceKommentarPatch

> EntityModelBauvorhaben createPropertyReferenceKommentarPatch(id, collectionModelObject)



patch-bauvorhaben-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceKommentarPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceKommentarPatchRequest;

  try {
    const data = await api.createPropertyReferenceKommentarPatch(body);
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


## createPropertyReferenceKommentarPatch1

> CollectionModelDokument createPropertyReferenceKommentarPatch1(id, collectionModelObject)



patch-dokument-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceKommentarPatch1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceKommentarPatch1Request;

  try {
    const data = await api.createPropertyReferenceKommentarPatch1(body);
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


## createPropertyReferenceKommentarPatch2

> EntityModelInfrastruktureinrichtung createPropertyReferenceKommentarPatch2(id, collectionModelObject)



patch-infrastruktureinrichtung-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceKommentarPatch2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceKommentarPatch2Request;

  try {
    const data = await api.createPropertyReferenceKommentarPatch2(body);
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

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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


## createPropertyReferenceKommentarPut

> EntityModelBauvorhaben createPropertyReferenceKommentarPut(id, collectionModelObject)



update-bauvorhaben-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceKommentarPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceKommentarPutRequest;

  try {
    const data = await api.createPropertyReferenceKommentarPut(body);
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


## createPropertyReferenceKommentarPut1

> CollectionModelDokument createPropertyReferenceKommentarPut1(id, collectionModelObject)



update-dokument-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceKommentarPut1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceKommentarPut1Request;

  try {
    const data = await api.createPropertyReferenceKommentarPut1(body);
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


## createPropertyReferenceKommentarPut2

> EntityModelInfrastruktureinrichtung createPropertyReferenceKommentarPut2(id, collectionModelObject)



update-infrastruktureinrichtung-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceKommentarPut2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceKommentarPut2Request;

  try {
    const data = await api.createPropertyReferenceKommentarPut2(body);
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

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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


## deletePropertyReferenceIdKommentarDelete

> deletePropertyReferenceIdKommentarDelete(id, propertyId)



delete-bauvorhaben-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdKommentarDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdKommentarDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceIdKommentarDelete(body);
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


## deletePropertyReferenceIdKommentarDelete1

> deletePropertyReferenceIdKommentarDelete1(id, propertyId)



delete-dokument-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdKommentarDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdKommentarDelete1Request;

  try {
    const data = await api.deletePropertyReferenceIdKommentarDelete1(body);
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


## deletePropertyReferenceIdKommentarDelete2

> deletePropertyReferenceIdKommentarDelete2(id, propertyId)



delete-infrastruktureinrichtung-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdKommentarDelete2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdKommentarDelete2Request;

  try {
    const data = await api.deletePropertyReferenceIdKommentarDelete2(body);
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


## deletePropertyReferenceKommentarDelete

> deletePropertyReferenceKommentarDelete(id)



delete-bauvorhaben-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceKommentarDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceKommentarDeleteRequest;

  try {
    const data = await api.deletePropertyReferenceKommentarDelete(body);
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


## deletePropertyReferenceKommentarDelete1

> deletePropertyReferenceKommentarDelete1(id)



delete-dokument-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceKommentarDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceKommentarDelete1Request;

  try {
    const data = await api.deletePropertyReferenceKommentarDelete1(body);
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


## deletePropertyReferenceKommentarDelete2

> deletePropertyReferenceKommentarDelete2(id)



delete-infrastruktureinrichtung-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceKommentarDelete2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceKommentarDelete2Request;

  try {
    const data = await api.deletePropertyReferenceKommentarDelete2(body);
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


## followPropertyReferenceKommentarGet

> EntityModelBauvorhaben followPropertyReferenceKommentarGet(id)



get-bauvorhaben-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceKommentarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceKommentarGetRequest;

  try {
    const data = await api.followPropertyReferenceKommentarGet(body);
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


## followPropertyReferenceKommentarGet1

> EntityModelBauvorhaben followPropertyReferenceKommentarGet1(id, propertyId)



get-bauvorhaben-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceKommentarGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceKommentarGet1Request;

  try {
    const data = await api.followPropertyReferenceKommentarGet1(body);
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


## followPropertyReferenceKommentarGet2

> CollectionModelDokument followPropertyReferenceKommentarGet2(id)



get-dokument-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceKommentarGet2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceKommentarGet2Request;

  try {
    const data = await api.followPropertyReferenceKommentarGet2(body);
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


## followPropertyReferenceKommentarGet3

> CollectionModelDokument followPropertyReferenceKommentarGet3(id, propertyId)



get-dokument-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceKommentarGet3Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceKommentarGet3Request;

  try {
    const data = await api.followPropertyReferenceKommentarGet3(body);
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


## followPropertyReferenceKommentarGet4

> EntityModelInfrastruktureinrichtung followPropertyReferenceKommentarGet4(id)



get-infrastruktureinrichtung-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceKommentarGet4Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceKommentarGet4Request;

  try {
    const data = await api.followPropertyReferenceKommentarGet4(body);
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

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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


## followPropertyReferenceKommentarGet5

> EntityModelInfrastruktureinrichtung followPropertyReferenceKommentarGet5(id, propertyId)



get-infrastruktureinrichtung-by-kommentar-Id

### Example

```ts
import {
  Configuration,
  KommentarPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceKommentarGet5Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceKommentarGet5Request;

  try {
    const data = await api.followPropertyReferenceKommentarGet5(body);
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

[**EntityModelInfrastruktureinrichtung**](EntityModelInfrastruktureinrichtung.md)

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

