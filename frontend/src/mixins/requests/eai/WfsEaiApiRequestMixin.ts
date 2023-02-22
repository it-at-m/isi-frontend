import {Component, Mixins} from "vue-property-decorator";
import {
  ControllerFrPunktKoordinatenImStandardEPSG4326WGS84Api,
  GetFlurstuecke1Request,
  FlurstueckFeatureDto,
  CoordinateDto,
} from "@/api/api-client/isi-wfs-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import _ from "lodash";

@Component
export default class WfsEaiApiRequestMixin extends Mixins(
  ErrorHandler
) {
  
  private wfsEaiApi: ControllerFrPunktKoordinatenImStandardEPSG4326WGS84Api;
  
  constructor() {
    super();
    this.wfsEaiApi = new ControllerFrPunktKoordinatenImStandardEPSG4326WGS84Api(RequestUtils.getBasicFetchConfigurationForWfsEai());
  }

  async getFlurstuecke(coordinateDto: CoordinateDto, showInInformationList: boolean): Promise<FlurstueckFeatureDto[]> {
    const request: GetFlurstuecke1Request = { coordinateDto };
    let flurstuecke: FlurstueckFeatureDto[] = [];

    await this.wfsEaiApi.getFlurstuecke1(request)
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
}
