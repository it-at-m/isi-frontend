# PersonalFilterSearchControllerApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeSearchPersonalfilterGet**](PersonalFilterSearchControllerApi.md#executesearchpersonalfilterget) | **GET** /personalFilters/search/findByIdAndPersonalID |  |
| [**executeSearchPersonalfilterGet1**](PersonalFilterSearchControllerApi.md#executesearchpersonalfilterget1) | **GET** /personalFilters/search/findByPersonalID |  |



## executeSearchPersonalfilterGet

> EntityModelPersonalFilter executeSearchPersonalfilterGet(id, personalid)



### Example

```ts
import {
  Configuration,
  PersonalFilterSearchControllerApi,
} from '';
import type { ExecuteSearchPersonalfilterGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterSearchControllerApi();

  const body = {
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    personalid: personalid_example,
  } satisfies ExecuteSearchPersonalfilterGetRequest;

  try {
    const data = await api.executeSearchPersonalfilterGet(body);
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
| **personalid** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EntityModelPersonalFilter**](EntityModelPersonalFilter.md)

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


## executeSearchPersonalfilterGet1

> CollectionModelEntityModelPersonalFilter executeSearchPersonalfilterGet1(personalid)



### Example

```ts
import {
  Configuration,
  PersonalFilterSearchControllerApi,
} from '';
import type { ExecuteSearchPersonalfilterGet1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonalFilterSearchControllerApi();

  const body = {
    // string (optional)
    personalid: personalid_example,
  } satisfies ExecuteSearchPersonalfilterGet1Request;

  try {
    const data = await api.executeSearchPersonalfilterGet1(body);
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
| **personalid** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**CollectionModelEntityModelPersonalFilter**](CollectionModelEntityModelPersonalFilter.md)

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

