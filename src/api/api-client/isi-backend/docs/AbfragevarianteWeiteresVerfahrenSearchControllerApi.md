# AbfragevarianteWeiteresVerfahrenSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchAbfragevarianteweiteresverfahrenGet**](AbfragevarianteWeiteresVerfahrenSearchControllerApi.md#executesearchabfragevarianteweiteresverfahrenget) | **GET** /abfragevarianteWeiteresVerfahrens/search/findAbfrageIdForAbfragevarianteById |  |
| [**executeSearchAbfragevarianteweiteresverfahrenGet1**](AbfragevarianteWeiteresVerfahrenSearchControllerApi.md#executesearchabfragevarianteweiteresverfahrenget1) | **GET** /abfragevarianteWeiteresVerfahrens/search/findAbfrageIdForAbfragevarianteSachbearbeitungById |  |



## executeSearchAbfragevarianteweiteresverfahrenGet

> EntityModelAbfragevarianteWeiteresVerfahren executeSearchAbfragevarianteweiteresverfahrenGet(id)



### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenSearchControllerApi,
} from '';
import type { ExecuteSearchAbfragevarianteweiteresverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfragevarianteweiteresverfahrenGetRequest;

  try {
    const data = await api.executeSearchAbfragevarianteweiteresverfahrenGet(body);
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

[**EntityModelAbfragevarianteWeiteresVerfahren**](EntityModelAbfragevarianteWeiteresVerfahren.md)

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


## executeSearchAbfragevarianteweiteresverfahrenGet1

> EntityModelAbfragevarianteWeiteresVerfahren executeSearchAbfragevarianteweiteresverfahrenGet1(id)



### Example

```ts
import {
  Configuration,
  AbfragevarianteWeiteresVerfahrenSearchControllerApi,
} from '';
import type { ExecuteSearchAbfragevarianteweiteresverfahrenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteWeiteresVerfahrenSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfragevarianteweiteresverfahrenGet1Request;

  try {
    const data = await api.executeSearchAbfragevarianteweiteresverfahrenGet1(body);
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

[**EntityModelAbfragevarianteWeiteresVerfahren**](EntityModelAbfragevarianteWeiteresVerfahren.md)

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

