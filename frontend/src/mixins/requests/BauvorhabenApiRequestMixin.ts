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
  InformationResponseDtoFromJSON,
  InfrastruktureinrichtungListElementDto,
  PutChangeRelevanteAbfragevarianteRequest,
  ResponseError,
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

  async changeRelevanteAbfragevariante(
    abfragevarianteDto: AbfragevarianteDto,
    showInInformationList: boolean
  ): Promise<BauvorhabenDto | string> {
    const requestObject: PutChangeRelevanteAbfragevarianteRequest = {
      abfragevarianteDto,
    };
    try {
      const response = await this.bauvorhabenApi.putChangeRelevanteAbfragevariante(
        requestObject,
        RequestUtils.getPUTConfig()
      );
      return response;
    } catch (error) {
      if (error instanceof ResponseError && error.response.status === 409) {
        const json = await error.response.json();
        const dto = InformationResponseDtoFromJSON(json);
        return dto.messages?.[0] ?? "";
      }

      throw this.handleError(showInInformationList, error as Error);
    }
  }
}
