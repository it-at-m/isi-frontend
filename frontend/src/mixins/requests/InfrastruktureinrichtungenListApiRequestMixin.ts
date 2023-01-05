import {Component, Mixins} from "vue-property-decorator";
import {InfrastruktureinrichtungListElementsDto, InfrastruktureinrichtunglistenApi} from "@/api/api-client";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class InfrastruktureinrichtungenListApiRequestMixin extends Mixins(ErrorHandler) {
  
  private infrastruktureiInfrastruktureinrichtunglistenApi: InfrastruktureinrichtunglistenApi;
  
  constructor() {
    super();
    this.infrastruktureiInfrastruktureinrichtunglistenApi = new InfrastruktureinrichtunglistenApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  getInfrastruktureinrichtungenListElements(showInInformationList: boolean): Promise<InfrastruktureinrichtungListElementsDto> {
    return this.infrastruktureiInfrastruktureinrichtunglistenApi.getInfrastruktureinrichtungListElements(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
