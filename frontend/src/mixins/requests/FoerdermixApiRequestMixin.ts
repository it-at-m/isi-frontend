import {Component, Mixins} from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import {
  DeleteFoerdermixStammByIdRequest,
  FoerdermixStammApi,
  FoerdermixStammDto,
  GetFoerdermixStammByIdRequest,
  SaveFoerdermixStammRequest,
  UpdateFoerdermixStammRequest
} from "@/api/api-client/isi-backend";
import ErrorHandler from "./ErrorHandler";

@Component
export default class FoerdermixApiRequestMixin extends Mixins(ErrorHandler) {
  
  private foerdermixStammApi: FoerdermixStammApi;
  
  constructor() {
    super();
    this.foerdermixStammApi = new FoerdermixStammApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  createFoerdermixStamm(dto: FoerdermixStammDto, showInInformationList: boolean): Promise<FoerdermixStammDto> {
    const requestObject: SaveFoerdermixStammRequest = {
      foerdermixStammDto: dto
    };
    return this.foerdermixStammApi.saveFoerdermixStamm(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  updateFoerdermixStamm(dto: FoerdermixStammDto, showInInformationList: boolean): Promise<FoerdermixStammDto> {
    const requestObject: UpdateFoerdermixStammRequest = {
      foerdermixStammDto: dto
    };
    return this.foerdermixStammApi.updateFoerdermixStamm(requestObject, RequestUtils.getPUTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  getFoerdermixStaemme(showInInformationList: boolean): Promise<FoerdermixStammDto[]> {
    return this.foerdermixStammApi.getFoerdermixStaemme()
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  getFoerdermix(id: string, showInInformationList: boolean): Promise<FoerdermixStammDto> {
    const requestObject: GetFoerdermixStammByIdRequest = {
      id: id
    };
    return this.foerdermixStammApi.getFoerdermixStammById(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  deleteFoerdermixStamm(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteFoerdermixStammByIdRequest = {
      id: id
    };
    return this.foerdermixStammApi.deleteFoerdermixStammById(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
