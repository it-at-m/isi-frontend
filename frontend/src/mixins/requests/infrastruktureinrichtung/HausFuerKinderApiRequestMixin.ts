import {Component, Mixins} from "vue-property-decorator";
import {
  HausFuerKinderDto,
  HausFuerKinderApi,
  GetHausFuerKinderByIdRequest,
  CreateHausFuerKinderRequest,
  UpdateHausFuerKinderRequest,
  DeleteHausFuerKinderByIdRequest
} from "@/api/api-client";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class HausFuerKinderApiRequestMixin extends Mixins(
  SaveLeaveMixin,
  ErrorHandler
) {
  
  private hausFuerKinderApi: HausFuerKinderApi;
  
  constructor() {
    super();
    this.hausFuerKinderApi = new HausFuerKinderApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  createHausFuerKinder(dto: HausFuerKinderDto, showInInformationList: boolean): Promise<HausFuerKinderDto> {
    const requestObject: CreateHausFuerKinderRequest = {
      hausFuerKinderDto: dto
    };
    return this.hausFuerKinderApi.createHausFuerKinder(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateHausFuerKinder(dto: HausFuerKinderDto, showInInformationList: boolean): Promise<HausFuerKinderDto> {
    const requestObject: UpdateHausFuerKinderRequest = {
      hausFuerKinderDto: dto
    };
    return this.hausFuerKinderApi.updateHausFuerKinder(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getHaeuserFuerKinder(showInInformationList: boolean): Promise<Array<HausFuerKinderDto>> {
    return this.hausFuerKinderApi.getHaeuserFuerKinder(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getHausFuerKinderById(id: string, showInInformationList: boolean): Promise<HausFuerKinderDto> {
    const requestObject: GetHausFuerKinderByIdRequest = {
      id: id
    };
    return this.hausFuerKinderApi.getHausFuerKinderById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
  deleteHausFuerKinderById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteHausFuerKinderByIdRequest = {
      id: id
    };
    return this.hausFuerKinderApi.deleteHausFuerKinderById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
}
