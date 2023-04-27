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

  async getFlurstuecke(
    point: PointGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoFlurstueckDto>> {
    const request: GetFlurstuecke1Request = { pointGeometryDto: point };
    let flurstuecke: Array<FeatureDtoFlurstueckDto> = [];

    await this.punktApi
      .getFlurstuecke1(request, RequestUtils.getPOSTConfig())
      .then((response) => {
        if (!_.isNil(response.feature)) {
          flurstuecke = response.feature;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return flurstuecke;
  }

  async getGemarkungen(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoGemarkungDto>> {
    const request: GetGemarkungenRequest = { multiPolygonGeometryDto: multiPolygon };
    let gemarkungen: Array<FeatureDtoGemarkungDto> = [];

    await this.polygonApi
      .getGemarkungen(request)
      .then((response) => {
        if (!_.isNil(response.feature)) {
          gemarkungen = response.feature;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return gemarkungen;
  }

  async getStadtbezirke(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<Array<FeatureDtoStadtbezirkDto>> {
    const request: GetStadtbezirkeRequest = { multiPolygonGeometryDto: multiPolygon };
    let stadtbezirke: Array<FeatureDtoStadtbezirkDto> = [];

    await this.polygonApi
      .getStadtbezirke(request)
      .then((response) => {
        if (!_.isNil(response.feature)) {
          stadtbezirke = response.feature;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return stadtbezirke;
  }

  async getUnion(
    multiPolygon: MultiPolygonGeometryDto,
    showInInformationList: boolean
  ): Promise<MultiPolygonGeometryDto> {
    const request: UnifyRequest = { multiPolygonGeometryDto: multiPolygon };
    let unifiedMultipolygon: MultiPolygonGeometryDto = {
      type: "MultiPolygon",
      coordinates: undefined,
    };

    await this.operationApi
      .unify(request)
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
