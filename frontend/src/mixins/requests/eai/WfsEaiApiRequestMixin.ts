import {Component, Mixins} from "vue-property-decorator";
import {
  PunktApi,
  GetFlurstuecke1Request,
  FlurstueckFeatureDto,
  CoordinateDto,
  PolygonOperationenApi,
  UnifyRequest,
  CoordinatesDto,
} from "@/api/api-client/isi-wfs-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import _ from "lodash";

@Component
export default class WfsEaiApiRequestMixin extends Mixins(
  ErrorHandler
) {
  
  private punktApi: PunktApi;
  private operationApi: PolygonOperationenApi;
  
  constructor() {
    super();
    this.punktApi = new PunktApi(RequestUtils.getBasicFetchConfigurationForWfsEai());
    this.operationApi = new PolygonOperationenApi(RequestUtils.getBasicFetchConfigurationForWfsEai());
  }

  async getFlurstuecke(coordinate: CoordinateDto, showInInformationList: boolean): Promise<FlurstueckFeatureDto[]> {
    const request: GetFlurstuecke1Request = { coordinateDto: coordinate };
    let flurstuecke: FlurstueckFeatureDto[] = [];

    await this.punktApi.getFlurstuecke1(request)
      .then(response => {
        if (!_.isNil(response.flurstuecke)) {
          flurstuecke = response.flurstuecke;
        }
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
    
    return flurstuecke;
  }

  async getUnion(coordinates: CoordinatesDto[], showInInformationList: boolean): Promise<CoordinatesDto[]> {
    const request: UnifyRequest = { polygonsDto: { polygons: coordinates } };
    let flurstuecke: CoordinatesDto[] = [];

    await this.operationApi.unify(request)
      .then(response => {
        if (!_.isNil(response.polygons)) {
          flurstuecke = response.polygons;
        }
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
    
    return flurstuecke;
  }
}
