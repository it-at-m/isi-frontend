# FileInfoStammApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getFileInformation**](FileInfoStammApi.md#getfileinformation) | **GET** /stammdaten/file-information |  |



## getFileInformation

> FileInformationDto getFileInformation()



Gibt die in der Anwendung erlaubten Dateiendungen, maximalen Dateigrößen, ... zurück (z.B. .pdf).

### Example

```ts
import {
  Configuration,
  FileInfoStammApi,
} from '';
import type { GetFileInformationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FileInfoStammApi();

  try {
    const data = await api.getFileInformation();
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

[**FileInformationDto**](FileInformationDto.md)

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

