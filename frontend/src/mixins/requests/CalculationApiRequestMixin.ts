import { Mixins } from "vue-property-decorator";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import {
  BerechnungenApi,
  CalculateLangfristigerPlanungsursaechlicherBedarfRequest,
  LangfristigerPlanungsursaechlicherBedarfDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";

export default class CalculationApiRequestMixin extends Mixins(ErrorHandler) {
  private calculationApi: BerechnungenApi;

  constructor() {
    super();
    this.calculationApi = new BerechnungenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  public calculateLangfristigerPlanungsursaechlicherBedarf(
    abfrageId: string,
    abfragevarianteId: string,
    showInInformationList: boolean,
  ): Promise<LangfristigerPlanungsursaechlicherBedarfDto> {
    const requestObject: CalculateLangfristigerPlanungsursaechlicherBedarfRequest = {
      calculationRequestDto: {
        abfrageId,
        abfragevarianteId,
      },
    };

    return this.calculationApi
      .calculateLangfristigerPlanungsursaechlicherBedarf(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
