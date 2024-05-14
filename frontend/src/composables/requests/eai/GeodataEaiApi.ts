import type {
  MultiPolygonGeometryDto,
  FeatureDtoFlurstueckDto,
  GetFlurstuecke1Request,
  PointGeometryDto,
  FeatureDtoGemarkungDto,
  GetGemarkungenRequest,
  FeatureDtoStadtbezirkDto,
  GetStadtbezirkeRequest,
  UnifyRequest,
  GetFlurstueckeRequest,
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

// eslint-disable-next-line
export function useGeodataEaiApi() {
  const punktApi = new PunktApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  const polygonApi = new PolygonApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  const operationApi = new PolygonOperationenApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  const { handleError } = useErrorHandler();

  async function getFlurstueckeForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstuecke1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getFlurstuecke1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getStadtbezirkeForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirke1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getStadtbezirke1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getGemarkungenForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungen1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getGemarkungen1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getBezirksteileForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoBezirksteilDto>> {
    const request: GetBezirksteile1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getBezirksteile1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getViertelForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoViertelDto>> {
    const request: GetViertel1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getViertel1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getKitaplanungsbereicheForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoKitaplanungsbereichDto>> {
    const request: GetKitaplanungsbereiche1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getKitaplanungsbereiche1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getGrundschulsprengelForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGrundschulsprengelDto>> {
    const request: GetGrundschulsprengel1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getGrundschulsprengel1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getMittelschulsprengelForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoMittelschulsprengelDto>> {
    const request: GetMittelschulsprengel1Request = { pointGeometryDto: point };
    try {
      const response = await punktApi.getMittelschulsprengel1(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getFlurstueckeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstueckeRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getFlurstuecke(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getGemarkungenForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungenRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getGemarkungen(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getStadtbezirkeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirkeRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getStadtbezirke(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getBezirksteileForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoBezirksteilDto>> {
    const request: GetBezirksteileRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getBezirksteile(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getViertelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoViertelDto>> {
    const request: GetViertelRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getViertel(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getKitaplanungsbereicheForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoKitaplanungsbereichDto>> {
    const request: GetKitaplanungsbereicheRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getKitaplanungsbereiche(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getGrundschulsprengelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoGrundschulsprengelDto>> {
    const request: GetGrundschulsprengelRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getGrundschulsprengel(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getMittelschulsprengelForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<Array<FeatureDtoMittelschulsprengelDto>> {
    const request: GetMittelschulsprengelRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await polygonApi.getMittelschulsprengel(request, RequestUtils.getPOSTConfig());
      return response.features ?? [];
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getUnionOfMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean,
  ): Promise<MultiPolygonGeometryDto> {
    const request: UnifyRequest = { multiPolygonGeometryDto: multiPolygon };
    try {
      const response = await operationApi.unify(request, RequestUtils.getPOSTConfig());
      return response ?? { type: "MultiPolygon", coordinates: undefined };
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return {
    getFlurstueckeForPoint,
    getStadtbezirkeForPoint,
    getGemarkungenForPoint,
    getBezirksteileForPoint,
    getViertelForPoint,
    getKitaplanungsbereicheForPoint,
    getGrundschulsprengelForPoint,
    getMittelschulsprengelForPoint,
    getFlurstueckeForMultipolygon,
    getStadtbezirkeForMultipolygon,
    getGemarkungenForMultipolygon,
    getBezirksteileForMultipolygon,
    getViertelForMultipolygon,
    getKitaplanungsbereicheForMultipolygon,
    getGrundschulsprengelForMultipolygon,
    getMittelschulsprengelForMultipolygon,
    getUnionOfMultipolygon,
  };
}
