import { AbfrageStatusApi, TransitionDto, TransitionsRequest } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class TransitionApiRequestMixin extends Mixins(ErrorHandler) {
  private abfrageStatusApi: AbfrageStatusApi;

  constructor() {
    super();
    this.abfrageStatusApi = new AbfrageStatusApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  freigabInfrastrukturabfrage(uuid: string, showInInformationList: boolean): Promise<TransitionDto[]> {
    const requestObject: TransitionsRequest = {
      id: uuid,
    };
    return this.abfrageStatusApi
      .transitions(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}