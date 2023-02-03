import {Component, Mixins} from "vue-property-decorator";
import {
  GsNachmittagBetreuungDto,
  GsNachmittagBetreuungApi,
  GetGsNachmittagBetreuungByIdRequest,
  CreateGsNachmittagBetreuungRequest,
  UpdateGsNachmittagBetreuungRequest,
  DeleteGsNachmittagBetreuungByIdRequest
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class GsNachmittagBetreuungApiRequestMixin extends Mixins(
  SaveLeaveMixin,
  ErrorHandler
) {
  
  private gsNachmittagBetreuungApi: GsNachmittagBetreuungApi;
  
  constructor() {
    super();
    this.gsNachmittagBetreuungApi = new GsNachmittagBetreuungApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }
  
  createGsNachmittagBetreuung(dto: GsNachmittagBetreuungDto, showInInformationList: boolean): Promise<GsNachmittagBetreuungDto> {
    const requestObject: CreateGsNachmittagBetreuungRequest = {
      gsNachmittagBetreuungDto: dto
    };
    return this.gsNachmittagBetreuungApi.createGsNachmittagBetreuung(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateGsNachmittagBetreuung(dto: GsNachmittagBetreuungDto, showInInformationList: boolean): Promise<GsNachmittagBetreuungDto> {
    const requestObject: UpdateGsNachmittagBetreuungRequest = {
      gsNachmittagBetreuungDto: dto
    };
    return this.gsNachmittagBetreuungApi.updateGsNachmittagBetreuung(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getGsNachmittagBetreuungen(showInInformationList: boolean): Promise<Array<GsNachmittagBetreuungDto>> {
    return this.gsNachmittagBetreuungApi.getGsNachmittagBetreuungen(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getGsNachmittagBetreuungById(id: string, showInInformationList: boolean): Promise<GsNachmittagBetreuungDto> {
    const requestObject: GetGsNachmittagBetreuungByIdRequest = {
      id: id
    };
    return this.gsNachmittagBetreuungApi.getGsNachmittagBetreuungById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
  deleteGsNachmittagBetreuungById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteGsNachmittagBetreuungByIdRequest = {
      id: id
    };
    return this.gsNachmittagBetreuungApi.deleteGsNachmittagBetreuungById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
}
