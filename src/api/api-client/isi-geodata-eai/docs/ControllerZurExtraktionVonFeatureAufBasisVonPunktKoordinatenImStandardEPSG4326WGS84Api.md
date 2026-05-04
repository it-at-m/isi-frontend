# ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api

All URIs are relative to *http://localhost:8085*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getBaubloecke**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getbaubloecke) | **POST** /point/baubloecke | Holt die Baublöcke die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getBebauungsplaene**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getbebauungsplaene) | **POST** /point/bebauungsplaene | Holt die Bebauungsplan-Umgriffe die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getBezirksteile1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getbezirksteile1) | **POST** /point/bezirksteile | Holt die Bezirksteile die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getFlurstuecke1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getflurstuecke1) | **POST** /point/flurstuecke | Holt die Flurstücke die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getGemarkungen1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getgemarkungen1) | **POST** /point/gemarkungen | Holt die Gemarkungen die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getGrundschulsprengel1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getgrundschulsprengel1) | **POST** /point/grundschulsprengel | Holt die Grundschulsprengel die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getKitaplanungsbereiche1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getkitaplanungsbereiche1) | **POST** /point/kitaplanungsbereiche | Holt die Kitaplanungsbereiche die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getMittelschulsprengel1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getmittelschulsprengel1) | **POST** /point/mittelschulsprengel | Holt die Mittelschulsprengel die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getStadtbezirke1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getstadtbezirke1) | **POST** /point/stadtbezirke | Holt die Stadtbezirke die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |
| [**getViertel1**](ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api.md#getviertel1) | **POST** /point/viertel | Holt die Viertel die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden. |



## getBaubloecke

> FeatureCollectionDtoFeatureDtoBaublockDto getBaubloecke(pointGeometryDto)

Holt die Baublöcke die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetBaubloeckeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetBaubloeckeRequest;

  try {
    const data = await api.getBaubloecke(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

### Return type

[**FeatureCollectionDtoFeatureDtoBaublockDto**](FeatureCollectionDtoFeatureDtoBaublockDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Baublöcke erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getBebauungsplaene

> FeatureCollectionDtoFeatureDtoBebauungsplanUmgriffDto getBebauungsplaene(pointGeometryDto)

Holt die Bebauungsplan-Umgriffe die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetBebauungsplaeneRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetBebauungsplaeneRequest;

  try {
    const data = await api.getBebauungsplaene(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

### Return type

[**FeatureCollectionDtoFeatureDtoBebauungsplanUmgriffDto**](FeatureCollectionDtoFeatureDtoBebauungsplanUmgriffDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/hal+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Bebauungsplan-Umgriffe erfolgreich abgefragt. |  -  |
| **500** | Bei der Erstellung oder Durchführung des Requests ist ein Fehler aufgetreten. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getBezirksteile1

> FeatureCollectionDtoFeatureDtoBezirksteilDto getBezirksteile1(pointGeometryDto)

Holt die Bezirksteile die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetBezirksteile1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetBezirksteile1Request;

  try {
    const data = await api.getBezirksteile1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getFlurstuecke1

> FeatureCollectionDtoFeatureDtoFlurstueckDto getFlurstuecke1(pointGeometryDto)

Holt die Flurstücke die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetFlurstuecke1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetFlurstuecke1Request;

  try {
    const data = await api.getFlurstuecke1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getGemarkungen1

> FeatureCollectionDtoFeatureDtoGemarkungDto getGemarkungen1(pointGeometryDto)

Holt die Gemarkungen die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetGemarkungen1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetGemarkungen1Request;

  try {
    const data = await api.getGemarkungen1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getGrundschulsprengel1

> FeatureCollectionDtoFeatureDtoGrundschulsprengelDto getGrundschulsprengel1(pointGeometryDto)

Holt die Grundschulsprengel die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetGrundschulsprengel1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetGrundschulsprengel1Request;

  try {
    const data = await api.getGrundschulsprengel1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getKitaplanungsbereiche1

> FeatureCollectionDtoFeatureDtoKitaplanungsbereichDto getKitaplanungsbereiche1(pointGeometryDto)

Holt die Kitaplanungsbereiche die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetKitaplanungsbereiche1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetKitaplanungsbereiche1Request;

  try {
    const data = await api.getKitaplanungsbereiche1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getMittelschulsprengel1

> FeatureCollectionDtoFeatureDtoMittelschulsprengelDto getMittelschulsprengel1(pointGeometryDto)

Holt die Mittelschulsprengel die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetMittelschulsprengel1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetMittelschulsprengel1Request;

  try {
    const data = await api.getMittelschulsprengel1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getStadtbezirke1

> FeatureCollectionDtoFeatureDtoStadtbezirkDto getStadtbezirke1(pointGeometryDto)

Holt die Stadtbezirke die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetStadtbezirke1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetStadtbezirke1Request;

  try {
    const data = await api.getStadtbezirke1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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


## getViertel1

> FeatureCollectionDtoFeatureDtoViertelDto getViertel1(pointGeometryDto)

Holt die Viertel die sich mit dem Punkt (im Standard EPSG:4326 (WGS84)) überschneiden.

### Example

```ts
import {
  Configuration,
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api,
} from '';
import type { GetViertel1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api();

  const body = {
    // PointGeometryDto
    pointGeometryDto: ...,
  } satisfies GetViertel1Request;

  try {
    const data = await api.getViertel1(body);
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
| **pointGeometryDto** | [PointGeometryDto](PointGeometryDto.md) |  | |

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

