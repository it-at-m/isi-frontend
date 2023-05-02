import { Component, Mixins } from "vue-property-decorator";
import {
  ControllerZurExtraktionVonFeatureAufBasisVonPunktKoordinatenImStandardEPSG4326WGS84Api as PunktApi,
  ControllerZurExtraktionVonFeatureAufBasisVonMultiPolygoneImStandardEPSG4326WGS84Api as PolygonApi,
  ControllerFrGeometriespezifischeOperationenImStandardEPSG4326WGS84Api as PolygonOperationenApi,
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
} from "@/api/api-client/isi-geodata-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import _ from "lodash";

@Component
export default class GeodataEaiApiRequestMixin extends Mixins(ErrorHandler) {
  private punktApi: PunktApi;

  private polygonApi: PolygonApi;

  private operationApi: PolygonOperationenApi;

  constructor() {
    super();
    this.punktApi = new PunktApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
    this.polygonApi = new PolygonApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
    this.operationApi = new PolygonOperationenApi(RequestUtils.getBasicFetchConfigurationForGeodataEai());
  }

  async getFlurstueckeForPoint(
    point: PointGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstuecke1Request = { pointGeometryDto: point };
    let flurstuecke: Array<FeatureDtoFlurstueckDto> = [];

    await this.punktApi
      .getFlurstuecke1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          flurstuecke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return flurstuecke;
  }

  async getFlurstueckeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstueckeRequest = { multiPolygonGeometryDto: multiPolygon };
    let flurstuecke: Array<FeatureDtoFlurstueckDto> = [];

    await this.polygonApi
      .getFlurstuecke(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          flurstuecke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return flurstuecke;
  }

  async getGemarkungenForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungenRequest = { multiPolygonGeometryDto: multiPolygon };
    let gemarkungen: Array<FeatureDtoGemarkungDto> = [];

    await this.polygonApi
      .getGemarkungen(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          gemarkungen = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return gemarkungen;
  }

  async getStadtbezirkeForMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirkeRequest = { multiPolygonGeometryDto: multiPolygon };
    let stadtbezirke: Array<FeatureDtoStadtbezirkDto> = [];

    await this.polygonApi
      .getStadtbezirke(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.features)) {
          stadtbezirke = response.features;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return stadtbezirke;
  }

  async getUnionOfMultipolygon(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<MultiPolygonGeometryDto> {
    const request: UnifyRequest = { multiPolygonGeometryDto: multiPolygon };
    let unifiedMultipolygon: MultiPolygonGeometryDto = {
      type: "MultiPolygon",
      coordinates: undefined,
    };

    await this.operationApi
      .unify(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response)) {
          unifiedMultipolygon = response;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return unifiedMultipolygon;
  }
}
