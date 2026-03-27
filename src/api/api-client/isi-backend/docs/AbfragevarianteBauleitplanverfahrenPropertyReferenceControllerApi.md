# AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenpatch) | **PATCH** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenpatch1) | **PATCH** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenpatch2) | **PATCH** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPut**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenput) | **PUT** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenput1) | **PUT** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevariantebauleitplanverfahrenput2) | **PUT** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevariantebauleitplanverfahrendelete) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevariantebauleitplanverfahrendelete1) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevariantebauleitplanverfahrendelete2) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevariantebauleitplanverfahrendelete) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller/{propertyId} |  |
| [**deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevariantebauleitplanverfahrendelete1) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteFachreferate/{propertyId} |  |
| [**deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevariantebauleitplanverfahrendelete2) | **DELETE** /abfragevarianteBauleitplanverfahrens/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet1**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget1) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller/{propertyId} |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget2) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget3) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/bedarfsmeldungDokumenteFachreferate/{propertyId} |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget4) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/dokumente |  |
| [**followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5**](AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevariantebauleitplanverfahrenget5) | **GET** /abfragevarianteBauleitplanverfahrens/{id}/dokumente/{propertyId} |  |



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


## createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1

> CollectionModelDokument createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1(id, collectionModelObject)



patch-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPatch1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPatch1Request;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch1(body);
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


## createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2

> CollectionModelDokument createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2(id, collectionModelObject)



patch-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPatch2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPatch2Request;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPatch2(body);
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


## createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1

> CollectionModelDokument createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1(id, collectionModelObject)



update-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPut1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPut1Request;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut1(body);
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


## createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2

> CollectionModelDokument createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2(id, collectionModelObject)



update-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPut2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevariantebauleitplanverfahrenPut2Request;

  try {
    const data = await api.createPropertyReferenceAbfragevariantebauleitplanverfahrenPut2(body);
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


## deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1

> deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1(id)



delete-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1Request;

  try {
    const data = await api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete1(body);
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


## deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2

> deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2(id)



delete-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2Request;

  try {
    const data = await api.deletePropertyReferenceAbfragevariantebauleitplanverfahrenDelete2(body);
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


## deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1

> deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1(id, propertyId)



delete-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1Request;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete1(body);
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


## deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2

> deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2(id, propertyId)



delete-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2Request;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevariantebauleitplanverfahrenDelete2(body);
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


## followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2

> CollectionModelDokument followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2(id)



get-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet2Request;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet2(body);
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


## followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3

> CollectionModelDokument followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3(id, propertyId)



get-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet3Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet3Request;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet3(body);
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


## followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4

> CollectionModelDokument followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4(id)



get-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet4Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet4Request;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet4(body);
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


## followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5

> CollectionModelDokument followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5(id, propertyId)



get-dokument-by-abfragevariantebauleitplanverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet5Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevariantebauleitplanverfahrenGet5Request;

  try {
    const data = await api.followPropertyReferenceAbfragevariantebauleitplanverfahrenGet5(body);
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

