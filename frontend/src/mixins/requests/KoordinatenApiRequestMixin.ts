import { KoordinatenApi, Wgs84Dto, UtmDto, Wgs84toUtm32Request } from "@/api/api-client/isi-backend";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";

@Component
export default class KoordinatenApiRequestMixin extends Mixins(SaveLeaveMixin, ErrorHandler) {
  private koordinatenApi: KoordinatenApi;

  constructor() {
    super();
    this.koordinatenApi = new KoordinatenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  wgs84toUtm32(dto: Wgs84Dto, showInInformationList: boolean): Promise<UtmDto> {
    const requestObject: Wgs84toUtm32Request = {
      wgs84Dto: dto,
    };

    return this.koordinatenApi
      .wgs84toUtm32(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
