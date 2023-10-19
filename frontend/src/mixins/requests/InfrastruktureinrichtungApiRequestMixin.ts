import { Component, Mixins } from "vue-property-decorator";
import {
  CreateInfrastruktureinrichtungRequest,
  DeleteInfrastruktureinrichtungByIdRequest,
  GetInfrastruktureinrichtungByIdRequest,
  InfrastruktureinrichtungApi,
  InfrastruktureinrichtungDto,
  UpdateInfrastruktureinrichtungOperationRequest,
  UpdateInfrastruktureinrichtungRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class InfrastruktureinrichtungApiRequestMixin extends Mixins(ErrorHandler, SaveLeaveMixin) {
  private infrastruktureinrichtungApi: InfrastruktureinrichtungApi;

  constructor() {
    super();
    this.infrastruktureinrichtungApi = new InfrastruktureinrichtungApi(
      RequestUtils.getBasicFetchConfigurationForBackend(),
    );
  }

  getInfrastruktureinrichtungById(
    id: string,
    showInInformationList: boolean,
  ): Promise<UpdateInfrastruktureinrichtungRequest> {
    const requestObject: GetInfrastruktureinrichtungByIdRequest = {
      id: id,
    };
    return this.infrastruktureinrichtungApi
      .getInfrastruktureinrichtungById(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  createInfrastruktureinrichtung(
    dto: InfrastruktureinrichtungDto,
    showInInformationList: boolean,
  ): Promise<InfrastruktureinrichtungDto> {
    const requestObject: CreateInfrastruktureinrichtungRequest = {
      updateInfrastruktureinrichtungRequest: dto as UpdateInfrastruktureinrichtungRequest,
    };
    return this.infrastruktureinrichtungApi
      .createInfrastruktureinrichtung(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetDirty();
        return response as InfrastruktureinrichtungDto;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  updateInfrastruktureinrichtung(
    dto: InfrastruktureinrichtungDto,
    showInInformationList: boolean,
  ): Promise<InfrastruktureinrichtungDto> {
    const requestObject: UpdateInfrastruktureinrichtungOperationRequest = {
      updateInfrastruktureinrichtungRequest: dto as UpdateInfrastruktureinrichtungRequest,
    };
    return this.infrastruktureinrichtungApi
      .updateInfrastruktureinrichtung(requestObject, RequestUtils.getPUTConfig())
      .then((response) => {
        this.resetDirty();
        return response as InfrastruktureinrichtungDto;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  deleteInfrastruktureinrichtungById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteInfrastruktureinrichtungByIdRequest = {
      id: id,
    };
    return this.infrastruktureinrichtungApi
      .deleteInfrastruktureinrichtungById(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
