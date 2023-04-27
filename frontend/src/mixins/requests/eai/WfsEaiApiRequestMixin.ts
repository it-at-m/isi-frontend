import { Component, Mixins } from "vue-property-decorator";
import {
  PunktApi,
  GetFlurstuecke1Request,
  FlurstueckFeatureDto,
  CoordinateDto,
  PolygonOperationenApi,
  UnifyRequest,
  CoordinatesDto,
  PolygonApi,
  GetGemarkungenRequest,
  GemarkungFeatureDto,
  StadtbezirkFeatureDto,
  GetStadtbezirkeRequest,
} from "@/api/api-client/isi-wfs-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import _ from "lodash";

@Component
export default class WfsEaiApiRequestMixin extends Mixins(ErrorHandler) {
  private punktApi: PunktApi;
  private polygonApi: PolygonApi;
  private operationApi: PolygonOperationenApi;

  constructor() {
    super();
    this.punktApi = new PunktApi(RequestUtils.getBasicFetchConfigurationForWfsEai());
    this.polygonApi = new PolygonApi(RequestUtils.getBasicFetchConfigurationForWfsEai());
    this.operationApi = new PolygonOperationenApi(RequestUtils.getBasicFetchConfigurationForWfsEai());
  }

  async getFlurstuecke(coordinate: CoordinateDto, showInInformationList: boolean): Promise<FlurstueckFeatureDto[]> {
    const request: GetFlurstuecke1Request = { coordinateDto: coordinate };
    let flurstuecke: FlurstueckFeatureDto[] = [];

    await this.punktApi
      .getFlurstuecke1(request)
      .then((response) => {
        if (!_.isNil(response.flurstuecke)) {
          flurstuecke = response.flurstuecke;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return flurstuecke;
  }

  async getGemarkungen(coordinates: CoordinatesDto, showInInformationList: boolean): Promise<GemarkungFeatureDto[]> {
    const request: GetGemarkungenRequest = { coordinatesDto: coordinates };
    let gemarkungen: GemarkungFeatureDto[] = [];

    await this.polygonApi
      .getGemarkungen(request)
      .then((response) => {
        if (!_.isNil(response.gemarkungen)) {
          gemarkungen = response.gemarkungen;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return gemarkungen;
  }

  async getStadtbezirke(coordinates: CoordinatesDto, showInInformationList: boolean): Promise<StadtbezirkFeatureDto[]> {
    const request: GetStadtbezirkeRequest = { coordinatesDto: coordinates };
    let stadtbezirke: GemarkungFeatureDto[] = [];

    await this.polygonApi
      .getStadtbezirke(request)
      .then((response) => {
        if (!_.isNil(response.stadtbezirke)) {
          stadtbezirke = response.stadtbezirke;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return stadtbezirke;
  }

  async getUnion(coordinates: CoordinatesDto[], showInInformationList: boolean): Promise<CoordinatesDto[]> {
    const request: UnifyRequest = { polygonsDto: { polygons: coordinates } };
    let union: CoordinatesDto[] = [];

    await this.operationApi
      .unify(request)
      .then((response) => {
        if (!_.isNil(response.polygons)) {
          union = response.polygons;
        }
      })
      .catch((error) => {
        this.handleError(showInInformationList, error);
      });

    return union;
  }
}
