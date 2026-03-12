# ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api

All URIs are relative to *http://localhost:8085*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**unify**](ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api.md#unify) | **POST** /geometry/operation/union | Ermittelt die Vereinigung der Polygone für Multipolygon (im Standard EPSG:4326 (WGS84)). |



## unify

> MultiPolygonGeometryDto unify(multiPolygonGeometryDto)

Ermittelt die Vereinigung der Polygone für Multipolygon (im Standard EPSG:4326 (WGS84)).

### Example

```ts
import {
  Configuration,
  ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api,
} from '';
import type { UnifyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies UnifyRequest;

  try {
    const data = await api.unify(body);
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
| **multiPolygonGeometryDto** | [MultiPolygonGeometryDto](MultiPolygonGeometryDto.md) |  | |

### Return type

[**MultiPolygonGeometryDto**](MultiPolygonGeometryDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Multipolygon erfolgreich vereinigt. |  -  |
| **500** | Bei der Erstellung oder Durchführung der Logik ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

