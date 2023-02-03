import {Component, Mixins} from "vue-property-decorator";
import {
  AbfrageApi,
  CreateInfrastrukturabfrageRequest,
  DeleteInfrastrukturabfrageByIdRequest,
  InfrastrukturabfrageDto,
  GetInfrastrukturabfrageByIdRequest,
  UpdateInfrastrukturabfrageRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class AbfrageApiRequestMixin extends Mixins(
  SaveLeaveMixin,
  ErrorHandler
) {
  
  private abfrageApi: AbfrageApi;
  
  constructor() {
    super();
    this.abfrageApi = new AbfrageApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  createInfrastrukturabfrage(dto: InfrastrukturabfrageDto, showInInformationList: boolean): Promise<InfrastrukturabfrageDto> {
    const requestObject: CreateInfrastrukturabfrageRequest = {
      infrastrukturabfrageDto: dto
    };
    return this.abfrageApi.createInfrastrukturabfrage(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateInfrastrukturabfrage(dto: InfrastrukturabfrageDto, showInInformationList: boolean): Promise<InfrastrukturabfrageDto> {
    const requestObject: UpdateInfrastrukturabfrageRequest = {
      infrastrukturabfrageDto: dto
    };
    return this.abfrageApi.updateInfrastrukturabfrage(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getInfrastrukturabfragen(showInInformationList: boolean): Promise<Array<InfrastrukturabfrageDto>> {
    return this.abfrageApi.getInfrastrukturabfragen(RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
   
  getInfrastrukturabfrageById(id: string, showInInformationList: boolean): Promise<InfrastrukturabfrageDto> {
    const requestObject: GetInfrastrukturabfrageByIdRequest = {
      id: id
    };
    return this.abfrageApi.getInfrastrukturabfrageById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
  deleteInfrastrukturabfrageById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteInfrastrukturabfrageByIdRequest = {
      id: id
    };
    return this.abfrageApi.deleteInfrastrukturabfrageById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        this.resetDirty();
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
    
}
