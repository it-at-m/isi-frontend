# MetabaseReportingInformationApi

All URIs are relative to *http://localhost:8089*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMetabaseReporting**](MetabaseReportingInformationApi.md#getmetabasereporting) | **GET** /stammdaten/metabase-reporting |  |



## getMetabaseReporting

> MetabaseReportingDto getMetabaseReporting()



Gibt für die Anwendung notwendigen Informationen über Metabase Reporting zurück (z.B. URL und aufrufbare Reports)

### Example

```ts
import {
  Configuration,
  MetabaseReportingInformationApi,
} from '';
import type { GetMetabaseReportingRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetabaseReportingInformationApi();

  try {
    const data = await api.getMetabaseReporting();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**MetabaseReportingDto**](MetabaseReportingDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

