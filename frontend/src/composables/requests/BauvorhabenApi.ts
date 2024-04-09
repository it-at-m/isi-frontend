import {
  AbfrageSearchResultDto,
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
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";
import RequestUtils from "@/utils/RequestUtils";

// eslint-disable-next-line
export function useBauvorhabenApi() {
  const bauvorhabenApi = new BauvorhabenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const { resetFormDirty } = useSaveLeave();

  async function getReferencedAbfrageList(
    bauvorhabenId: string,
    showInInformationList: boolean,
  ): Promise<Array<AbfrageSearchResultDto>> {
    const requestObject: GetReferencedAbfrageRequest = {
      id: bauvorhabenId,
    };
    try {
      const response = await bauvorhabenApi.getReferencedAbfrage(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getReferencedInfrastruktureinrichtungenList(
    bauvorhabenId: string,
    showInInformationList: boolean,
  ): Promise<Array<InfrastruktureinrichtungSearchResultDto>> {
    const requestObject: GetReferencedInfrastruktureinrichtungRequest = {
      id: bauvorhabenId,
    };
    try {
      const response = await bauvorhabenApi.getReferencedInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getGETConfig(),
      );
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getBauvorhabenById(id: string, showInInformationList: boolean): Promise<BauvorhabenDto> {
    const requestObject: GetBauvorhabenByIdRequest = { id };

    try {
      const response = await bauvorhabenApi.getBauvorhabenById(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function postBauvorhaben(
    bauvorhabenDto: BauvorhabenDto,
    datenuebernahmeAbfrageId: string | undefined,
    showInInformationList: boolean,
  ): Promise<BauvorhabenDto> {
    const requestObject: CreateBauvorhabenRequest = {
      bauvorhabenDto: bauvorhabenDto,
      abfrageId: datenuebernahmeAbfrageId,
    };

    try {
      const response = await bauvorhabenApi.createBauvorhaben(requestObject, RequestUtils.getPOSTConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function putBauvorhaben(
    bauvorhabenDto: BauvorhabenDto,
    showInInformationList: boolean,
  ): Promise<BauvorhabenDto> {
    const requestObject: UpdateBauvorhabenRequest = { bauvorhabenDto };

    try {
      const response = await bauvorhabenApi.updateBauvorhaben(requestObject, RequestUtils.getPUTConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function deleteBauvorhaben(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteBauvorhabenRequest = { id };

    try {
      const response = await bauvorhabenApi.deleteBauvorhaben(requestObject, RequestUtils.getDELETEConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function changeRelevanteAbfragevariante(
    abfragevarianteId: string,
    showInInformationList: boolean,
  ): Promise<BauvorhabenDto | string> {
    const requestObject: PutChangeRelevanteAbfragevarianteRequest = {
      abfragevarianteId: abfragevarianteId,
    };
    try {
      const response = await bauvorhabenApi.putChangeRelevanteAbfragevariante(
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

      throw handleError(showInInformationList, error);
    }
  }

  return {
    getReferencedAbfrageList,
    getReferencedInfrastruktureinrichtungenList,
    getBauvorhabenById,
    postBauvorhaben,
    putBauvorhaben,
    deleteBauvorhaben,
    changeRelevanteAbfragevariante,
  };
}
