# MimeTypeApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**extractMediaTypeInformationForAllowedMediaType**](MimeTypeApi.md#extractmediatypeinformationforallowedmediatype) | **POST** /mime-type | Stellt die Mime-Type-Information für die im Parameter referenzierte und im S3-Storage befindliche Datei zur Verfügung. |



## extractMediaTypeInformationForAllowedMediaType

> MimeTypeInformationDto extractMediaTypeInformationForAllowedMediaType(filepathDto)

Stellt die Mime-Type-Information für die im Parameter referenzierte und im S3-Storage befindliche Datei zur Verfügung.

Handelt es sich um einen ungültigen Mime-Type wird die referenzierte Datei vom S3-Storage gelöscht.

### Example

```ts
import {
  Configuration,
  MimeTypeApi,
} from '';
import type { ExtractMediaTypeInformationForAllowedMediaTypeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MimeTypeApi();

  const body = {
    // FilepathDto
    filepathDto: ...,
  } satisfies ExtractMediaTypeInformationForAllowedMediaTypeRequest;

  try {
    const data = await api.extractMediaTypeInformationForAllowedMediaType(body);
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
| **filepathDto** | [FilepathDto](FilepathDto.md) |  | |

### Return type

[**MimeTypeInformationDto**](MimeTypeInformationDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **406** | NOT ACCEPTABLE -&gt; Die referenzierte und im S3-Storage befindliche Datei besitzt keinen zulässigen Mime-Type. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Bei der Ermittlung des Mime-Types ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

