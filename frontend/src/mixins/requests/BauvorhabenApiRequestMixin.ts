import {
  AbfrageSearchResultDto,
  AbfragevarianteBauleitplanverfahrenDto,
  BauvorhabenApi,
  BauvorhabenDto,
  CreateBauvorhabenRequest,
  DeleteBauvorhabenRequest,
  GetBauvorhabenByIdRequest,
  GetReferencedAbfrageRequest,
  GetReferencedInfrastruktureinrichtungRequest,
  InformationResponseDtoFromJSON,
  InfrastruktureinrichtungSearchResultDto,
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

  getReferencedAbfrageList(
    bauvorhabenId: string,
    showInInformationList: boolean,
  ): Promise<Array<AbfrageSearchResultDto>> {
    const requestObject: GetReferencedAbfrageRequest = {
      id: bauvorhabenId,
    };
    return this.bauvorhabenApi
      .getReferencedAbfrage(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getReferencedInfrastruktureinrichtungenList(
    bauvorhabenId: string,
    showInInformationList: boolean,
  ): Promise<Array<InfrastruktureinrichtungSearchResultDto>> {
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

  postBauvorhaben(
    bauvorhabenDto: BauvorhabenDto,
    datenuebernahmeAbfrageId: string | undefined,
    showInInformationList: boolean,
  ): Promise<BauvorhabenDto> {
    const requestObject: CreateBauvorhabenRequest = {
      bauvorhabenDto: bauvorhabenDto,
      abfrageId: datenuebernahmeAbfrageId,
    };

    return this.bauvorhabenApi
      .createBauvorhaben(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetFormDirty();
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
        this.resetFormDirty();
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
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  async changeRelevanteAbfragevariante(
    abfragevarianteId: string,
    showInInformationList: boolean,
  ): Promise<BauvorhabenDto | string> {
    const requestObject: PutChangeRelevanteAbfragevarianteRequest = {
      abfragevarianteId: abfragevarianteId,
    };
    try {
      const response = await this.bauvorhabenApi.putChangeRelevanteAbfragevariante(
        requestObject,
        RequestUtils.getPUTConfig(),
      );
      return response;
    } catch (error) {
      /* 
      Ein 409 bedeutet, dass bereits eine andere relevante Abfragevariante existiert.
      Dies soll aber nicht als Fehler behandelt werden und außerdem soll die Message ausgelesen werden.
      Wegen dieser spezifischen Logik wird die handleError-Methode unter Umständen umgangen.
      */
      if (error instanceof ResponseError && error.response.status === 409) {
        const json = await error.response.json();
        const dto = InformationResponseDtoFromJSON(json);
        return dto.messages?.[0] ?? "";
      }

      throw this.handleError(showInInformationList, error as Error);
    }
  }
}
