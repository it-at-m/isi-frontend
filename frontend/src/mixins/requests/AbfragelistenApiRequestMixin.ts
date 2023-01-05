import {Component, Mixins} from "vue-property-decorator";
import {AbfrageListElementsDto, AbfragelistenApi} from "@/api/api-client";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class AbfragelistenApiRequestMixin extends Mixins(ErrorHandler) {
  
  private abfragelistenApi: AbfragelistenApi;
  
  constructor() {
    super();
    this.abfragelistenApi = new AbfragelistenApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  getAbfrageListElements(showInInformationList: boolean): Promise<AbfrageListElementsDto> {
    return this.abfragelistenApi.getAbfrageListElements(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
