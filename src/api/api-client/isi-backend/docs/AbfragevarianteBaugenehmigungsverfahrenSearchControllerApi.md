# AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchAbfragevariantebaugenehmigungsverfahrenGet**](AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi.md#executesearchabfragevariantebaugenehmigungsverfahrenget) | **GET** /abfragevarianteBaugenehmigungsverfahrens/search/findAbfrageIdForAbfragevarianteById |  |
| [**executeSearchAbfragevariantebaugenehmigungsverfahrenGet1**](AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi.md#executesearchabfragevariantebaugenehmigungsverfahrenget1) | **GET** /abfragevarianteBaugenehmigungsverfahrens/search/findAbfrageIdForAbfragevarianteSachbearbeitungById |  |



## executeSearchAbfragevariantebaugenehmigungsverfahrenGet

> EntityModelAbfragevarianteBaugenehmigungsverfahren executeSearchAbfragevariantebaugenehmigungsverfahrenGet(id)



### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi,
} from '';
import type { ExecuteSearchAbfragevariantebaugenehmigungsverfahrenGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfragevariantebaugenehmigungsverfahrenGetRequest;

  try {
    const data = await api.executeSearchAbfragevariantebaugenehmigungsverfahrenGet(body);
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

[**EntityModelAbfragevarianteBaugenehmigungsverfahren**](EntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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


## executeSearchAbfragevariantebaugenehmigungsverfahrenGet1

> EntityModelAbfragevarianteBaugenehmigungsverfahren executeSearchAbfragevariantebaugenehmigungsverfahrenGet1(id)



### Example

```ts
import {
  Configuration,
  AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi,
} from '';
import type { ExecuteSearchAbfragevariantebaugenehmigungsverfahrenGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfragevarianteBaugenehmigungsverfahrenSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfragevariantebaugenehmigungsverfahrenGet1Request;

  try {
    const data = await api.executeSearchAbfragevariantebaugenehmigungsverfahrenGet1(body);
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

[**EntityModelAbfragevarianteBaugenehmigungsverfahren**](EntityModelAbfragevarianteBaugenehmigungsverfahren.md)

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

