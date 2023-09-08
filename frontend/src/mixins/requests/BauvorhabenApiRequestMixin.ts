import {
  AbfrageListElementDto,
  AbfragevarianteDto,
  BauvorhabenApi,
  BauvorhabenDto,
  CreateBauvorhabenRequest,
  DeleteBauvorhabenRequest,
  GetBauvorhabenByIdRequest,
  GetReferencedInfrastrukturabfragenRequest,
  GetReferencedInfrastruktureinrichtungRequest,
  InfrastruktureinrichtungListElementDto,
  PutChangeRelevanteAbfragevarianteRequest,
  UpdateBauvorhabenRequest,
} from "@/api/api-client/isi-backend";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";

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

  getReferencedInfrastrukturabfragenList(
    bauvorhabenId: string,
    showInInformationList: boolean
  ): Promise<Array<AbfrageListElementDto>> {
    const requestObject: GetReferencedInfrastrukturabfragenRequest = {
      id: bauvorhabenId,
    };
    return this.bauvorhabenApi
      .getReferencedInfrastrukturabfragen(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getReferencedInfrastruktureinrichtungenList(
    bauvorhabenId: string,
    showInInformationList: boolean
  ): Promise<Array<InfrastruktureinrichtungListElementDto>> {
    const requestObject: GetReferencedInfrastruktureinrichtungRequest = {
      id: bauvorhabenId,
    };
    return this.bauvorhabenApi
      .getReferencedInfrastruktureinrichtung(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
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

  changeRelevanteAbfragevariante(
    abfragevarianteDto: AbfragevarianteDto,
    showInInformationList: boolean
  ): Promise<BauvorhabenDto> {
    const requestObject: PutChangeRelevanteAbfragevarianteRequest = {
      abfragevarianteDto,
    };
    return this.bauvorhabenApi
      .putChangeRelevanteAbfragevariante(requestObject, RequestUtils.getPUTConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
