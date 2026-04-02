# KommentarSearchControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchKommentarGet**](KommentarSearchControllerApi.md#executesearchkommentarget) | **GET** /kommentars/search/deleteAllByBauvorhabenId |  |
| [**executeSearchKommentarGet1**](KommentarSearchControllerApi.md#executesearchkommentarget1) | **GET** /kommentars/search/deleteAllByInfrastruktureinrichtungId |  |
| [**executeSearchKommentarGet2**](KommentarSearchControllerApi.md#executesearchkommentarget2) | **GET** /kommentars/search/findAllByBauvorhabenIdOrderByCreatedDateTimeDesc |  |
| [**executeSearchKommentarGet3**](KommentarSearchControllerApi.md#executesearchkommentarget3) | **GET** /kommentars/search/findAllByInfrastruktureinrichtungIdOrderByCreatedDateTimeDesc |  |



## executeSearchKommentarGet

> executeSearchKommentarGet(bauvorhaben)



### Example

```ts
import {
  Configuration,
  KommentarSearchControllerApi,
} from '';
import type { ExecuteSearchKommentarGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarSearchControllerApi();

  const body = {
    // string (optional)
    bauvorhaben: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchKommentarGetRequest;

  try {
    const data = await api.executeSearchKommentarGet(body);
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
| **bauvorhaben** | `string` |  | [Optional] [Defaults to `undefined`] |

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
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## executeSearchKommentarGet1

> executeSearchKommentarGet1(infrastruktureinrichtung)



### Example

```ts
import {
  Configuration,
  KommentarSearchControllerApi,
} from '';
import type { ExecuteSearchKommentarGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarSearchControllerApi();

  const body = {
    // string (optional)
    infrastruktureinrichtung: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchKommentarGet1Request;

  try {
    const data = await api.executeSearchKommentarGet1(body);
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
| **infrastruktureinrichtung** | `string` |  | [Optional] [Defaults to `undefined`] |

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
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## executeSearchKommentarGet2

> EntityModelKommentar executeSearchKommentarGet2(bauvorhaben)



### Example

```ts
import {
  Configuration,
  KommentarSearchControllerApi,
} from '';
import type { ExecuteSearchKommentarGet2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarSearchControllerApi();

  const body = {
    // string (optional)
    bauvorhaben: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchKommentarGet2Request;

  try {
    const data = await api.executeSearchKommentarGet2(body);
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
| **bauvorhaben** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelKommentar**](EntityModelKommentar.md)

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


## executeSearchKommentarGet3

> EntityModelKommentar executeSearchKommentarGet3(infrastruktureinrichtung)



### Example

```ts
import {
  Configuration,
  KommentarSearchControllerApi,
} from '';
import type { ExecuteSearchKommentarGet3Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KommentarSearchControllerApi();

  const body = {
    // string (optional)
    infrastruktureinrichtung: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchKommentarGet3Request;

  try {
    const data = await api.executeSearchKommentarGet3(body);
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
| **infrastruktureinrichtung** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelKommentar**](EntityModelKommentar.md)

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

