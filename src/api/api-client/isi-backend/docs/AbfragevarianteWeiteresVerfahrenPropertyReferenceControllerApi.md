# AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPatch**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenpatch) | **PATCH** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenpatch1) | **PATCH** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenpatch2) | **PATCH** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPut**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenput) | **PUT** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPut1**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenput1) | **PUT** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**createPropertyReferenceAbfragevarianteweiteresverfahrenPut2**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#createpropertyreferenceabfragevarianteweiteresverfahrenput2) | **PUT** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevarianteweiteresverfahrendelete) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevarianteweiteresverfahrendelete1) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceabfragevarianteweiteresverfahrendelete2) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevarianteweiteresverfahrendelete) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller/{propertyId} |  |
| [**deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevarianteweiteresverfahrendelete1) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteFachreferate/{propertyId} |  |
| [**deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#deletepropertyreferenceidabfragevarianteweiteresverfahrendelete2) | **DELETE** /abfragevarianteWeiteresVerfahrens/{id}/dokumente/{propertyId} |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet1**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget1) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteAbfrageersteller/{propertyId} |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet2**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget2) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteFachreferate |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet3**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget3) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/bedarfsmeldungDokumenteFachreferate/{propertyId} |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet4**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget4) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/dokumente |  |
| [**followPropertyReferenceAbfragevarianteweiteresverfahrenGet5**](AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi.md#followpropertyreferenceabfragevarianteweiteresverfahrenget5) | **GET** /abfragevarianteWeiteresVerfahrens/{id}/dokumente/{propertyId} |  |



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


## createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1

> CollectionModelDokument createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1(id, collectionModelObject)



patch-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevarianteweiteresverfahrenPatch1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevarianteweiteresverfahrenPatch1Request;

  try {
    const data = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch1(body);
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


## createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2

> CollectionModelDokument createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2(id, collectionModelObject)



patch-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevarianteweiteresverfahrenPatch2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevarianteweiteresverfahrenPatch2Request;

  try {
    const data = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPatch2(body);
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


## createPropertyReferenceAbfragevarianteweiteresverfahrenPut1

> CollectionModelDokument createPropertyReferenceAbfragevarianteweiteresverfahrenPut1(id, collectionModelObject)



update-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevarianteweiteresverfahrenPut1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevarianteweiteresverfahrenPut1Request;

  try {
    const data = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut1(body);
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


## createPropertyReferenceAbfragevarianteweiteresverfahrenPut2

> CollectionModelDokument createPropertyReferenceAbfragevarianteweiteresverfahrenPut2(id, collectionModelObject)



update-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { CreatePropertyReferenceAbfragevarianteweiteresverfahrenPut2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // CollectionModelObject
    collectionModelObject: ...,
  } satisfies CreatePropertyReferenceAbfragevarianteweiteresverfahrenPut2Request;

  try {
    const data = await api.createPropertyReferenceAbfragevarianteweiteresverfahrenPut2(body);
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


## deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1

> deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1(id)



delete-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1Request;

  try {
    const data = await api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete1(body);
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


## deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2

> deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2(id)



delete-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies DeletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2Request;

  try {
    const data = await api.deletePropertyReferenceAbfragevarianteweiteresverfahrenDelete2(body);
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


## deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1

> deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1(id, propertyId)



delete-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1Request;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete1(body);
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


## deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2

> deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2(id, propertyId)



delete-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { DeletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies DeletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2Request;

  try {
    const data = await api.deletePropertyReferenceIdAbfragevarianteweiteresverfahrenDelete2(body);
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


## followPropertyReferenceAbfragevarianteweiteresverfahrenGet2

> CollectionModelDokument followPropertyReferenceAbfragevarianteweiteresverfahrenGet2(id)



get-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet2Request;

  try {
    const data = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet2(body);
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


## followPropertyReferenceAbfragevarianteweiteresverfahrenGet3

> CollectionModelDokument followPropertyReferenceAbfragevarianteweiteresverfahrenGet3(id, propertyId)



get-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet3Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet3Request;

  try {
    const data = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet3(body);
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


## followPropertyReferenceAbfragevarianteweiteresverfahrenGet4

> CollectionModelDokument followPropertyReferenceAbfragevarianteweiteresverfahrenGet4(id)



get-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet4Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
  } satisfies FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet4Request;

  try {
    const data = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet4(body);
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


## followPropertyReferenceAbfragevarianteweiteresverfahrenGet5

> CollectionModelDokument followPropertyReferenceAbfragevarianteweiteresverfahrenGet5(id, propertyId)



get-dokument-by-abfragevarianteweiteresverfahren-Id

### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi,
} from '';
import type { FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet5Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenPropertyReferenceControllerApi();

  const body = {
    // string
    id: id_example,
    // string
    propertyId: propertyId_example,
  } satisfies FollowPropertyReferenceAbfragevarianteweiteresverfahrenGet5Request;

  try {
    const data = await api.followPropertyReferenceAbfragevarianteweiteresverfahrenGet5(body);
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

