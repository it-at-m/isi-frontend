# DateihandlingApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getFile**](DateihandlingApi.md#getfile) | **GET** /presigned-url | Stellt die Presigned-Url zum Holen einer Datei zur Verfügung. |
| [**saveFile**](DateihandlingApi.md#savefile) | **POST** /presigned-url | Stellt die Presigned-Url zum Initialen Speichern einer Datei zur Verfügung. |



## getFile

> PresignedUrlDto getFile(pathToFile)

Stellt die Presigned-Url zum Holen einer Datei zur Verfügung.

Die Presigned-Url ist vom Aufrufer mit der Http-Methode GET zu verwenden.

### Example

```ts
import {
  Configuration,
  DateihandlingApi,
} from '';
import type { GetFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DateihandlingApi();

  const body = {
    // string | Der Dateipfad muss absolut, ohne Angabe des Buckets und ohne führenden Pfadtrenner angegeben werden. Beispiel: outerFolder/innerFolder/thefile.pdf
    pathToFile: pathToFile_example,
  } satisfies GetFileRequest;

  try {
    const data = await api.getFile(body);
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
| **pathToFile** | `string` | Der Dateipfad muss absolut, ohne Angabe des Buckets und ohne führenden Pfadtrenner angegeben werden. Beispiel: outerFolder/innerFolder/thefile.pdf | [Defaults to `undefined`] |

### Return type

[**PresignedUrlDto**](PresignedUrlDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | BAD REQUEST -&gt; Der JSON-Body des Requests ist fehlerhaft oder nicht vorhanden. |  -  |
| **404** | NOT FOUND -&gt; Die Datei ist im S3-Storage nicht verfügbar. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Die Presigned-Url konnte nicht erzeugt werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## saveFile

> PresignedUrlDto saveFile(filepathDto)

Stellt die Presigned-Url zum Initialen Speichern einer Datei zur Verfügung.

Die Presigned-Url ist vom Aufrufer mit der Http-Methode PUT zu verwenden.

### Example

```ts
import {
  Configuration,
  DateihandlingApi,
} from '';
import type { SaveFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DateihandlingApi();

  const body = {
    // FilepathDto
    filepathDto: ...,
  } satisfies SaveFileRequest;

  try {
    const data = await api.saveFile(body);
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

[**PresignedUrlDto**](PresignedUrlDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | BAD REQUEST -&gt; Der Request ist fehlerhaft. |  -  |
| **409** | CONFLICT -&gt; Die Datei existiert bereits im S3-Storage unter dem Dateipfad. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Die Presigned-Url konnte nicht erzeugt werden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

