import { Component, Mixins } from "vue-property-decorator";
import {
  BauvorhabenApi,
  BauvorhabenDto,
  CreateBauvorhabenRequest,
  DeleteBauvorhabenRequest,
  GetBauvorhabenByIdRequest,
  UpdateBauvorhabenRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class BauvorhabenApiRequestMixin extends Mixins(ErrorHandler, SaveLeaveMixin) {
  private bauvorhabenApi: BauvorhabenApi;

  constructor() {
    super();
    this.bauvorhabenApi = new BauvorhabenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  getBauvorhaben(showInInformationList: boolean): Promise<Array<BauvorhabenDto>> {
    return this.bauvorhabenApi
      .getBauvorhaben(RequestUtils.getGETConfig())
      .then((response) => response)
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getBauvorhabenById(id: string, showInInformationList: boolean): Promise<BauvorhabenDto> {
    const requestObject: GetBauvorhabenByIdRequest = { id };

    return this.bauvorhabenApi
      .getBauvorhabenById(requestObject, RequestUtils.getGETConfig())
      .then((response) => response)
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  postBauvorhaben(bauvorhabenDto: BauvorhabenDto, showInInformationList: boolean): Promise<BauvorhabenDto> {
    const requestObject: CreateBauvorhabenRequest = { bauvorhabenDto };

    return this.bauvorhabenApi
      .createBauvorhaben(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  putBauvorhaben(bauvorhabenDto: BauvorhabenDto, showInInformationList: boolean): Promise<BauvorhabenDto> {
    const requestObject: UpdateBauvorhabenRequest = { bauvorhabenDto };

    return this.bauvorhabenApi
      .updateBauvorhaben(requestObject, RequestUtils.getPUTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  deleteBauvorhaben(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteBauvorhabenRequest = { id };

    return this.bauvorhabenApi
      .deleteBauvorhaben(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
