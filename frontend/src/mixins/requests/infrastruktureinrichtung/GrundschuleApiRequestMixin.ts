import {Component, Mixins} from "vue-property-decorator";
import {
  GrundschuleDto,
  GrundschuleApi,
  GetGrundschuleByIdRequest,
  CreateGrundschuleRequest,
  UpdateGrundschuleRequest,
  DeleteGrundschuleByIdRequest
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class GrundschuleApiRequestMixin extends Mixins(
  SaveLeaveMixin,
  ErrorHandler
) {
  
  private grundschuleApi: GrundschuleApi;
  
  constructor() {
    super();
    this.grundschuleApi = new GrundschuleApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }
  
  createGrundschule(dto: GrundschuleDto, showInInformationList: boolean): Promise<GrundschuleDto> {
    const requestObject: CreateGrundschuleRequest = {
      grundschuleDto: dto
    };
    return this.grundschuleApi.createGrundschule(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateGrundschule(dto: GrundschuleDto, showInInformationList: boolean): Promise<GrundschuleDto> {
    const requestObject: UpdateGrundschuleRequest = {
      grundschuleDto: dto
    };
    return this.grundschuleApi.updateGrundschule(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getGrundschulen(showInInformationList: boolean): Promise<Array<GrundschuleDto>> {
    return this.grundschuleApi.getGrundschulen(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getGrundschuleById(id: string, showInInformationList: boolean): Promise<GrundschuleDto> {
    const requestObject: GetGrundschuleByIdRequest = {
      id: id
    };
    return this.grundschuleApi.getGrundschuleById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
  deleteGrundschuleById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteGrundschuleByIdRequest = {
      id: id
    };
    return this.grundschuleApi.deleteGrundschuleById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
}
