import { Component, Mixins } from "vue-property-decorator";
import { BaurateApi, BaurateDto, DetermineBauratenRequest } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class BauratenApiRequestMixin extends Mixins(ErrorHandler) {
  private bauratenApi: BaurateApi;

  constructor() {
    super();
    this.bauratenApi = new BaurateApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  determineBauraten(
    realisierungsbeginn: number,
    wohneinheiten: number | undefined,
    geschossflaecheWohnen: number,
    showInInformationList: boolean
  ): Promise<Array<BaurateDto>> {
    const requestParameters = {
      realisierungsbeginn: realisierungsbeginn,
      wohneinheiten: wohneinheiten,
      geschossflaecheWohnen: geschossflaecheWohnen,
    } as DetermineBauratenRequest;
    return this.bauratenApi
      .determineBauraten(requestParameters, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
