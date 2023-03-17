import { Component, Mixins } from "vue-property-decorator";
import {
  MittelschuleDto,
  MittelschuleApi,
  GetMittelschuleByIdRequest,
  CreateMittelschuleRequest,
  UpdateMittelschuleRequest,
  DeleteMittelschuleByIdRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class MittelschuleApiRequestMixin extends Mixins(SaveLeaveMixin, ErrorHandler) {
  private mittelschuleApi: MittelschuleApi;

  constructor() {
    super();
    this.mittelschuleApi = new MittelschuleApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  createMittelschule(dto: MittelschuleDto, showInInformationList: boolean): Promise<MittelschuleDto> {
    const requestObject: CreateMittelschuleRequest = {
      mittelschuleDto: dto,
    };
    return this.mittelschuleApi
      .createMittelschule(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  updateMittelschule(dto: MittelschuleDto, showInInformationList: boolean): Promise<MittelschuleDto> {
    const requestObject: UpdateMittelschuleRequest = {
      mittelschuleDto: dto,
    };
    return this.mittelschuleApi
      .updateMittelschule(requestObject, RequestUtils.getPUTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getMittelschulen(showInInformationList: boolean): Promise<Array<MittelschuleDto>> {
    return this.mittelschuleApi
      .getMittelschulen(RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getMittelschuleById(id: string, showInInformationList: boolean): Promise<MittelschuleDto> {
    const requestObject: GetMittelschuleByIdRequest = {
      id: id,
    };
    return this.mittelschuleApi
      .getMittelschuleById(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  deleteMittelschuleById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteMittelschuleByIdRequest = {
      id: id,
    };
    return this.mittelschuleApi
      .deleteMittelschuleById(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
