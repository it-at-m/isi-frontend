import {Component, Mixins} from "vue-property-decorator";
import {
  BaurateApi,
  BaurateDto,
  CreateBaurateRequest,
  DeleteBaurateByIdRequest,
  GetBaurateByIdRequest,
  UpdateBaurateRequest
} from "@/api/api-client";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class BauratenApiRequestMixin extends Mixins(ErrorHandler) {
  
  private bauratenApi: BaurateApi;
  
  constructor() {
    super();
    this.bauratenApi = new BaurateApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  createBaurate(dto: BaurateDto, showInInformationList: boolean): Promise<BaurateDto> {
    const requestObject: CreateBaurateRequest = {
      baurateDto: dto
    };
    return this.bauratenApi.createBaurate(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateBaurate(dto: BaurateDto, showInInformationList: boolean): Promise<BaurateDto> {
    const requestObject: UpdateBaurateRequest = {
      baurateDto: dto
    };
    return this.bauratenApi.updateBaurate(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  getBaurate(id: string, showInInformationList: boolean): Promise<BaurateDto> {
    const requestObject: GetBaurateByIdRequest = {
      id: id
    };
    return this.bauratenApi.getBaurateById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  getBauraten(showInInformationList: boolean): Promise<Array<BaurateDto>> {
    return this.bauratenApi.getBauraten(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  deleteBaurate(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteBaurateByIdRequest = {
      id: id
    };
    return this.bauratenApi.deleteBaurateById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
