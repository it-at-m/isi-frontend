# ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api

All URIs are relative to *http://localhost:8085*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getBezirksteile**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getbezirksteile) | **POST** /polygon/bezirksteile | Holt die Bezirksteile die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getFlurstuecke**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getflurstuecke) | **POST** /polygon/flurstuecke | Holt die Flurstücke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getFlurstueckeInnerhalbUmgriff**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getflurstueckeinnerhalbumgriff) | **POST** /polygon/flurstuecke-innerhalb-umgriff | Holt die Flurstücke, deren Zentroid innerhalb des Multipolygons (im Standard EPSG:4326 (WGS84)) liegt, unter Ausschluss von Straßen-Flurstücken. |
| [**getGemarkungen**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getgemarkungen) | **POST** /polygon/gemarkungen | Holt die Gemarkungen die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getGrundschulsprengel**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getgrundschulsprengel) | **POST** /polygon/grundschulsprengel | Holt die Grundschulsprengel die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getKitaplanungsbereiche**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getkitaplanungsbereiche) | **POST** /polygon/kitaplanungsbereiche | Holt die Kitaplanungsbereiche die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getMittelschulsprengel**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getmittelschulsprengel) | **POST** /polygon/mittelschulsprengel | Holt die Mittelschulsprengel die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getSchulstandorte**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getschulstandorte) | **POST** /polygon/schulstandorte | Holt die Schulstandorte die sich mit dem Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getStadtbezirke**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getstadtbezirke) | **POST** /polygon/stadtbezirke | Holt die Stadtbezirke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getViertel**](ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api.md#getviertel) | **POST** /polygon/viertel | Holt die Viertel die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden. |



## getBezirksteile

> FeatureCollectionDtoFeatureDtoBezirksteilDto getBezirksteile(multiPolygonGeometryDto)

Holt die Bezirksteile die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetBezirksteileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetBezirksteileRequest;

  try {
    const data = await api.getBezirksteile(body);
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

[**FeatureCollectionDtoFeatureDtoBezirksteilDto**](FeatureCollectionDtoFeatureDtoBezirksteilDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Bezirksteile erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFlurstuecke

> FeatureCollectionDtoFeatureDtoFlurstueckDto getFlurstuecke(multiPolygonGeometryDto)

Holt die Flurstücke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetFlurstueckeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetFlurstueckeRequest;

  try {
    const data = await api.getFlurstuecke(body);
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

[**FeatureCollectionDtoFeatureDtoFlurstueckDto**](FeatureCollectionDtoFeatureDtoFlurstueckDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Flurstücke erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFlurstueckeInnerhalbUmgriff

> FeatureCollectionDtoFeatureDtoFlurstueckDto getFlurstueckeInnerhalbUmgriff(multiPolygonGeometryDto)

Holt die Flurstücke, deren Zentroid innerhalb des Multipolygons (im Standard EPSG:4326 (WGS84)) liegt, unter Ausschluss von Straßen-Flurstücken.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetFlurstueckeInnerhalbUmgriffRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetFlurstueckeInnerhalbUmgriffRequest;

  try {
    const data = await api.getFlurstueckeInnerhalbUmgriff(body);
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

[**FeatureCollectionDtoFeatureDtoFlurstueckDto**](FeatureCollectionDtoFeatureDtoFlurstueckDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Flurstücke erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGemarkungen

> FeatureCollectionDtoFeatureDtoGemarkungDto getGemarkungen(multiPolygonGeometryDto)

Holt die Gemarkungen die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetGemarkungenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetGemarkungenRequest;

  try {
    const data = await api.getGemarkungen(body);
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

[**FeatureCollectionDtoFeatureDtoGemarkungDto**](FeatureCollectionDtoFeatureDtoGemarkungDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Gemarkungen erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGrundschulsprengel

> FeatureCollectionDtoFeatureDtoGrundschulsprengelDto getGrundschulsprengel(multiPolygonGeometryDto)

Holt die Grundschulsprengel die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetGrundschulsprengelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetGrundschulsprengelRequest;

  try {
    const data = await api.getGrundschulsprengel(body);
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

[**FeatureCollectionDtoFeatureDtoGrundschulsprengelDto**](FeatureCollectionDtoFeatureDtoGrundschulsprengelDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Grundschulsprengel erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getKitaplanungsbereiche

> FeatureCollectionDtoFeatureDtoKitaplanungsbereichDto getKitaplanungsbereiche(multiPolygonGeometryDto)

Holt die Kitaplanungsbereiche die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetKitaplanungsbereicheRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetKitaplanungsbereicheRequest;

  try {
    const data = await api.getKitaplanungsbereiche(body);
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

[**FeatureCollectionDtoFeatureDtoKitaplanungsbereichDto**](FeatureCollectionDtoFeatureDtoKitaplanungsbereichDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Kitaplanungsbereiche erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMittelschulsprengel

> FeatureCollectionDtoFeatureDtoMittelschulsprengelDto getMittelschulsprengel(multiPolygonGeometryDto)

Holt die Mittelschulsprengel die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetMittelschulsprengelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetMittelschulsprengelRequest;

  try {
    const data = await api.getMittelschulsprengel(body);
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

[**FeatureCollectionDtoFeatureDtoMittelschulsprengelDto**](FeatureCollectionDtoFeatureDtoMittelschulsprengelDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Mittelschulsprengel erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSchulstandorte

> FeatureCollectionDtoFeatureDtoSchulstandortDto getSchulstandorte(multiPolygonGeometryDto)

Holt die Schulstandorte die sich mit dem Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetSchulstandorteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetSchulstandorteRequest;

  try {
    const data = await api.getSchulstandorte(body);
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

[**FeatureCollectionDtoFeatureDtoSchulstandortDto**](FeatureCollectionDtoFeatureDtoSchulstandortDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Schulstandorte erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getStadtbezirke

> FeatureCollectionDtoFeatureDtoStadtbezirkDto getStadtbezirke(multiPolygonGeometryDto)

Holt die Stadtbezirke die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetStadtbezirkeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetStadtbezirkeRequest;

  try {
    const data = await api.getStadtbezirke(body);
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

[**FeatureCollectionDtoFeatureDtoStadtbezirkDto**](FeatureCollectionDtoFeatureDtoStadtbezirkDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stadtbezirke erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getViertel

> FeatureCollectionDtoFeatureDtoViertelDto getViertel(multiPolygonGeometryDto)

Holt die Viertel die sich mit den Multipolygon (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api,
} from '';
import type { GetViertelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api();

  const body = {
    // MultiPolygonGeometryDto
    multiPolygonGeometryDto: ...,
  } satisfies GetViertelRequest;

  try {
    const data = await api.getViertel(body);
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

[**FeatureCollectionDtoFeatureDtoViertelDto**](FeatureCollectionDtoFeatureDtoViertelDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Viertel erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

