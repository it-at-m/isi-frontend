import {Component, Mixins} from "vue-property-decorator";
import {
  KindergartenDto,
  KindergartenApi,
  GetKindergartenByIdRequest,
  CreateKindergartenRequest,
  UpdateKindergartenRequest,
  DeleteKindergartenByIdRequest
} from "@/api/api-client";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class KindergartenApiRequestMixin extends Mixins(
  SaveLeaveMixin,
  ErrorHandler
) {
  
  private kindergartenApi: KindergartenApi;
  
  constructor() {
    super();
    this.kindergartenApi = new KindergartenApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  createKindergarten(dto: KindergartenDto, showInInformationList: boolean): Promise<KindergartenDto> {
    const requestObject: CreateKindergartenRequest = {
      kindergartenDto: dto
    };
    return this.kindergartenApi.createKindergarten(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateKindergarten(dto: KindergartenDto, showInInformationList: boolean): Promise<KindergartenDto> {
    const requestObject: UpdateKindergartenRequest = {
      kindergartenDto: dto
    };
    return this.kindergartenApi.updateKindergarten(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getKindergaerten(showInInformationList: boolean): Promise<Array<KindergartenDto>> {
    return this.kindergartenApi.getKindergaerten(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getKindergartenById(id: string, showInInformationList: boolean): Promise<KindergartenDto> {
    const requestObject: GetKindergartenByIdRequest = {
      id: id
    };
    return this.kindergartenApi.getKindergartenById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
  deleteKindergartenById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteKindergartenByIdRequest = {
      id: id
    };
    return this.kindergartenApi.deleteKindergartenById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
}
