# KoordinatenApi

All URIs are relative to *http://localhost:39146*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**utm32ToWgs84**](KoordinatenApi.md#utm32towgs84) | **POST** /utm-to-wgs | Umrechnung UTM32 zu WGS84 |
| [**wgs84toUtm32**](KoordinatenApi.md#wgs84toutm32) | **POST** /wgs-to-utm | Umrechnung Wgs84 zu UTM |



## utm32ToWgs84

> Wgs84Dto utm32ToWgs84(utmDto)

Umrechnung UTM32 zu WGS84

### Example

```ts
import {
  Configuration,
  KoordinatenApi,
} from '';
import type { Utm32ToWgs84Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KoordinatenApi();

  const body = {
    // UtmDto
    utmDto: ...,
  } satisfies Utm32ToWgs84Request;

  try {
    const data = await api.utm32ToWgs84(body);
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
| **utmDto** | [UtmDto](UtmDto.md) |  | |

### Return type

[**Wgs84Dto**](Wgs84Dto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Transformation der Koordinate von UTM32 zu WGS84 war erfolgreich. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Bei der Transformation der Koordinate ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## wgs84toUtm32

> UtmDto wgs84toUtm32(wgs84Dto)

Umrechnung Wgs84 zu UTM

### Example

```ts
import {
  Configuration,
  KoordinatenApi,
} from '';
import type { Wgs84toUtm32Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new KoordinatenApi();

  const body = {
    // Wgs84Dto
    wgs84Dto: ...,
  } satisfies Wgs84toUtm32Request;

  try {
    const data = await api.wgs84toUtm32(body);
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
| **wgs84Dto** | [Wgs84Dto](Wgs84Dto.md) |  | |

### Return type

[**UtmDto**](UtmDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK -&gt; Transformation der Koordinate von WGS84 zu UTM32 war erfolgreich. |  -  |
| **555** | CUSTOM INTERNAL SERVER ERROR -&gt; Bei der Transformation der Koordinate ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

