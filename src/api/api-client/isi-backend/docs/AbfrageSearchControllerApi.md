# AbfrageSearchControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchAbfrageGet**](AbfrageSearchControllerApi.md#executesearchabfrageget) | **GET** /abfrages/search/findAllByBauvorhabenId |  |
| [**executeSearchAbfrageGet1**](AbfrageSearchControllerApi.md#executesearchabfrageget1) | **GET** /abfrages/search/findAllByBauvorhabenIdOrderByCreatedDateTimeDesc |  |



## executeSearchAbfrageGet

> EntityModelAbfrage executeSearchAbfrageGet(id)



### Example

```ts
import {
  Configuration,
  AbfrageSearchControllerApi,
} from '';
import type { ExecuteSearchAbfrageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfrageGetRequest;

  try {
    const data = await api.executeSearchAbfrageGet(body);
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

[**EntityModelAbfrage**](EntityModelAbfrage.md)

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


## executeSearchAbfrageGet1

> EntityModelAbfrage executeSearchAbfrageGet1(id)



### Example

```ts
import {
  Configuration,
  AbfrageSearchControllerApi,
} from '';
import type { ExecuteSearchAbfrageGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AbfrageSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ExecuteSearchAbfrageGet1Request;

  try {
    const data = await api.executeSearchAbfrageGet1(body);
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

[**EntityModelAbfrage**](EntityModelAbfrage.md)

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

