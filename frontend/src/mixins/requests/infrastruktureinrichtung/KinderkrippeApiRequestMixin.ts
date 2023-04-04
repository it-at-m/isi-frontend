import { Component, Mixins } from "vue-property-decorator";
import {
  KinderkrippeDto,
  KinderkrippeApi,
  GetKinderkrippeByIdRequest,
  CreateKinderkrippeRequest,
  UpdateKinderkrippeRequest,
  DeleteKinderkrippeByIdRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class KinderkrippeApiRequestMixin extends Mixins(SaveLeaveMixin, ErrorHandler) {
  private kinderkrippeApi: KinderkrippeApi;

  constructor() {
    super();
    this.kinderkrippeApi = new KinderkrippeApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  createKinderkrippe(dto: KinderkrippeDto, showInInformationList: boolean): Promise<KinderkrippeDto> {
    const requestObject: CreateKinderkrippeRequest = {
      kinderkrippeDto: dto,
    };
    return this.kinderkrippeApi
      .createKinderkrippe(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  updateKinderkrippe(dto: KinderkrippeDto, showInInformationList: boolean): Promise<KinderkrippeDto> {
    const requestObject: UpdateKinderkrippeRequest = {
      kinderkrippeDto: dto,
    };
    return this.kinderkrippeApi
      .updateKinderkrippe(requestObject, RequestUtils.getPUTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getKinderkrippen(showInInformationList: boolean): Promise<Array<KinderkrippeDto>> {
    return this.kinderkrippeApi
      .getKinderkrippen(RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getKinderkrippeById(id: string, showInInformationList: boolean): Promise<KinderkrippeDto> {
    const requestObject: GetKinderkrippeByIdRequest = {
      id: id,
    };
    return this.kinderkrippeApi
      .getKinderkrippeById(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  deleteKinderkrippeById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteKinderkrippeByIdRequest = {
      id: id,
    };
    return this.kinderkrippeApi
      .deleteKinderkrippeById(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
