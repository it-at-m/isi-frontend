import type {
  MultiPolygonGeometryDto,
  FeatureDtoFlurstueckDto,
  FeatureDtoBaublockDto,
  FeatureDtoBebauungsplanUmgriffDto,
  GetFlurstuecke1Request,
  GetBaubloeckeRequest,
  GetBebauungsplaeneRequest,
  PointGeometryDto,
  FeatureDtoGemarkungDto,
  GetGemarkungenRequest,
  FeatureDtoStadtbezirkDto,
  GetStadtbezirkeRequest,
  UnifyRequest,
  GetFlurstueckeInnerhalbUmgriffRequest,
  GetStadtbezirke1Request,
  GetGemarkungen1Request,
  FeatureDtoBezirksteilDto,
  FeatureDtoKitaplanungsbereichDto,
  GetKitaplanungsbereicheRequest,
  GetBezirksteileRequest,
  FeatureDtoGrundschulsprengelDto,
  GetGrundschulsprengelRequest,
  FeatureDtoMittelschulsprengelDto,
  GetMittelschulsprengelRequest,
  GetBezirksteile1Request,
  GetKitaplanungsbereiche1Request,
  GetGrundschulsprengel1Request,
  GetMittelschulsprengel1Request,
  FeatureDtoViertelDto,
  GetViertel1Request,
  GetViertelRequest,
} from "@/api/api-client/isi-geodata-eai";
import {
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api as PunktApi,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api as PolygonApi,
  ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api as PolygonOperationenApi,
} from "@/api/api-client/isi-geodata-eai";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "../ErrorHandler";
import GeodataEaiError from "@/types/common/error/GeodataEaiError";

// eslint-disable-next-line
export function useGeodataEaiApi() {
  const punktApi = new PunktApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  const polygonApi = new PolygonApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  const operationApi = new PolygonOperationenApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  const { handleError } = useErrorHandler();
  const ERROR_MESSAGE_GEODATA_EAI =
    "Die Session ist abgelaufen oder die Geodaten-Anbindung ist nicht verfügbar. Versuchen Sie es erneut mit F5. Ansonsten kontaktieren Sie bitte den Servicedesk.";

  async function getFlurstueckeForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstuecke1Request = { pointGeometryDto: point };
    const maxIterations = 3; // Prävention für den Fall, dass noch keine Session zu Geodata-EAI aufgebaut ist
    for (let i = 0; i < maxIterations; i++) {
      try {
        const response = await punktApi.getFlurstuecke1(request, RequestUtils.getPOSTConfig());
        return response.features ?? [];
      } catch (error) {
        if (i === maxIterations - 1) {
          throw handleErrorInternal(error, showError);
        }
      }
    }
  }

  async function getStadtbezirkeForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirke1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getStadtbezirke1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getGemarkungenForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungen1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getGemarkungen1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getBezirksteileForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoBezirksteilDto>> {
    const request: GetBezirksteile1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getBezirksteile1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getViertelForPoint(point: PointGeometryDto, showError = true): Promise<Array<FeatureDtoViertelDto>> {
    const request: GetViertel1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getViertel1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getKitaplanungsbereicheForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoKitaplanungsbereichDto>> {
    const request: GetKitaplanungsbereiche1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getKitaplanungsbereiche1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getGrundschulsprengelForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoGrundschulsprengelDto>> {
    const request: GetGrundschulsprengel1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getGrundschulsprengel1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getMittelschulsprengelForPoint(
    point: PointGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoMittelschulsprengelDto>> {
    const request: GetMittelschulsprengel1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getMittelschulsprengel1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getBaubloeckeForPoint(point: PointGeometryDto): Promise<Array<FeatureDtoBaublockDto>> {
    const request: GetBaubloeckeRequest = { pointGeometryDto: point };
    const maxIterations = 3;
    for (let i = 0; i < maxIterations; i++) {
      try {
        const response = await punktApi.getBaubloecke(request, RequestUtils.getPOSTConfig());
        return response.features ?? [];
      } catch (error) {
        if (i === maxIterations - 1) {
          throw handleErrorInternal(error);
        }
      }
    }
  }

  async function getBebauungsplaeneForPoint(
    point: PointGeometryDto,
  ): Promise<Array<FeatureDtoBebauungsplanUmgriffDto>> {
    const request: GetBebauungsplaeneRequest = { pointGeometryDto: point };
    const maxIterations = 3;
    for (let i = 0; i < maxIterations; i++) {
      try {
        const response = await punktApi.getBebauungsplaene(request, RequestUtils.getPOSTConfig());
        return response.features ?? [];
      } catch (error) {
        if (i === maxIterations - 1) {
          throw handleErrorInternal(error);
        }
      }
    }
  }

  async function getFlurstueckeInnerhalbUmgriffForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstueckeInnerhalbUmgriffRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getFlurstueckeInnerhalbUmgriff(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error);
    }
  }

  async function getGemarkungenForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungenRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getGemarkungen(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error);
    }
  }

  async function getStadtbezirkeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirkeRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getStadtbezirke(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getBezirksteileForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoBezirksteilDto>> {
    const request: GetBezirksteileRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getBezirksteile(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getViertelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoViertelDto>> {
    const request: GetViertelRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getViertel(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getKitaplanungsbereicheForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoKitaplanungsbereichDto>> {
    const request: GetKitaplanungsbereicheRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getKitaplanungsbereiche(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getGrundschulsprengelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoGrundschulsprengelDto>> {
    const request: GetGrundschulsprengelRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getGrundschulsprengel(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getMittelschulsprengelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showError = true,
  ): Promise<Array<FeatureDtoMittelschulsprengelDto>> {
    const request: GetMittelschulsprengelRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getMittelschulsprengel(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleErrorInternal(error, showError);
    }
  }

  async function getUnionOfMultipolygon(multiPolygon: MultiPolygonGeometryDto): Promise<MultiPolygonGeometryDto> {
    const request: UnifyRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await operationApi.unify(request, RequestUtils.getPOSTConfig());
      return response ?? { type: "MultiPolygon", coordinates: undefined };
    } catch (error) {
      throw handleErrorInternal(error);
    }
  }

  function handleErrorInternal(error: unknown, showError = true) {
    if (!showError) {
      throw error;
    }
    throw handleError(new GeodataEaiError(error, ERROR_MESSAGE_GEODATA_EAI));
  }

  /**
   * Ermöglicht das fehlertolerante Laden mehrerer Geodaten für eine Verortung.
   *
   * Schlägt ein über "load" ausgeführter Request fehl, wird ein leeres Array zurückgegeben und der Fehler gemerkt,
   * sodass die übrigen Geodaten weiterhin angezeigt werden können. Die Requests müssen mit "showError = false"
   * aufgerufen werden. Über "showErrorIfOccurred" wird anschließend höchstens eine Fehlermeldung angezeigt.
   */
  function createTolerantLoader() {
    let occurredError: unknown = undefined;
    let errorOccurred = false;

    async function load<T>(request: Promise<Array<T>>): Promise<Array<T>> {
      try {
        return await request;
      } catch (error) {
        if (!errorOccurred) {
          occurredError = error;
          errorOccurred = true;
        }
        return [];
      }
    }

    function showErrorIfOccurred(): void {
      if (errorOccurred) {
        handleError(new GeodataEaiError(occurredError, ERROR_MESSAGE_GEODATA_EAI));
      }
    }

    return { load, showErrorIfOccurred };
  }

  return {
    getFlurstueckeForPoint,
    getBaubloeckeForPoint,
    getBebauungsplaeneForPoint,
    getStadtbezirkeForPoint,
    getGemarkungenForPoint,
    getBezirksteileForPoint,
    getViertelForPoint,
    getKitaplanungsbereicheForPoint,
    getGrundschulsprengelForPoint,
    getMittelschulsprengelForPoint,
    getFlurstueckeInnerhalbUmgriffForMultipolygon,
    getStadtbezirkeForMultipolygon,
    getGemarkungenForMultipolygon,
    getBezirksteileForMultipolygon,
    getViertelForMultipolygon,
    getKitaplanungsbereicheForMultipolygon,
    getGrundschulsprengelForMultipolygon,
    getMittelschulsprengelForMultipolygon,
    getUnionOfMultipolygon,
    createTolerantLoader,
  };
}
