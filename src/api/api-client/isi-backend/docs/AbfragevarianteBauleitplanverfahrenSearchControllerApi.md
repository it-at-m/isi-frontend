# AbfragevarianteBauleitplanverfahrenSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchAbfragevariantebauleitplanverfahrenGet**](AbfragevarianteBauleitplanverfahrenSearchControllerApi.md#executesearchabfragevariantebauleitplanverfahrenget) | **GET** /abfragevarianteBauleitplanverfahrens/search/findAbfrageIdForAbfragevarianteById |  |
| [**executeSearchAbfragevariantebauleitplanverfahrenGet1**](AbfragevarianteBauleitplanverfahrenSearchControllerApi.md#executesearchabfragevariantebauleitplanverfahrenget1) | **GET** /abfragevarianteBauleitplanverfahrens/search/findAbfrageIdForAbfragevarianteSachbearbeitungById |  |



## executeSearchAbfragevariantebauleitplanverfahrenGet

> EntityModelAbfragevarianteBauleitplanverfahren executeSearchAbfragevariantebauleitplanverfahrenGet(id)



### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenSearchControllerApi,
} from '';
import type { ExecuteSearchAbfragevariantebauleitplanverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfragevariantebauleitplanverfahrenGetRequest;

  try {
    const data = await api.executeSearchAbfragevariantebauleitplanverfahrenGet(body);
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
| **id** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelAbfragevarianteBauleitplanverfahren**](EntityModelAbfragevarianteBauleitplanverfahren.md)

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


## executeSearchAbfragevariantebauleitplanverfahrenGet1

> EntityModelAbfragevarianteBauleitplanverfahren executeSearchAbfragevariantebauleitplanverfahrenGet1(id)



### Example

```ts
import {
  Configuration,
  AbfragevarianteBauleitplanverfahrenSearchControllerApi,
} from '';
import type { ExecuteSearchAbfragevariantebauleitplanverfahrenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBauleitplanverfahrenSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfragevariantebauleitplanverfahrenGet1Request;

  try {
    const data = await api.executeSearchAbfragevariantebauleitplanverfahrenGet1(body);
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
| **id** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelAbfragevarianteBauleitplanverfahren**](EntityModelAbfragevarianteBauleitplanverfahren.md)

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

