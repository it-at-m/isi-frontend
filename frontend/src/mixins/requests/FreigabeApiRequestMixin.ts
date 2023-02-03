import {AbfrageStatusApi, FreigabeInfrastrukturabfrageRequest } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import {Component, Mixins} from "vue-property-decorator";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class FreigabeApiRequestMixin extends Mixins(ErrorHandler) {
  
  private abfrageStatusApi: AbfrageStatusApi;
  
  constructor() {
    super();
    this.abfrageStatusApi = new AbfrageStatusApi(RequestUtils.getBasicFetchConfiguration());
  }

  freigabInfrastrukturabfrage(uuid: string, showInInformationList: boolean): Promise<void> {
    const requestObject: FreigabeInfrastrukturabfrageRequest = {
      id: uuid
    };
    return this.abfrageStatusApi.freigabeInfrastrukturabfrage(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
  