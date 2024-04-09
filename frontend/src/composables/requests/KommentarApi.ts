import {
  CreateKommentarRequest,
  DeleteKommentarRequest,
  GetKommentareForBauvorhabenRequest,
  GetKommentareForInfrastruktureinrichtungRequest,
  KommentarDto,
  KommentareApi,
  UpdateKommentarRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";

// eslint-disable-next-line
export function useKommentarApi() {
  const kommentareApi = new KommentareApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const { resetCommentDirty } = useSaveLeave();

  async function getKommentareForBauvorhaben(
    bauvorhabenId: string,
    showInInformationList: boolean,
  ): Promise<Array<KommentarDto>> {
    const requestObject: GetKommentareForBauvorhabenRequest = {
      bauvorhabenId: bauvorhabenId,
    };
    try {
      const response = await kommentareApi.getKommentareForBauvorhaben(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getKommentareForInfrastruktureinrichtung(
    infrastruktureinrichtungId: string,
    showInInformationList: boolean,
  ): Promise<Array<KommentarDto>> {
    const requestObject: GetKommentareForInfrastruktureinrichtungRequest = {
      infrastruktureinrichtungId: infrastruktureinrichtungId,
    };
    try {
      const response = await kommentareApi.getKommentareForInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getGETConfig(),
      );
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function createKommentar(kommentarDto: KommentarDto, showInInformationList: boolean): Promise<KommentarDto> {
    const requestObject: CreateKommentarRequest = {
      kommentarDto: kommentarDto,
    };
    try {
      const response = await kommentareApi.createKommentar(requestObject, RequestUtils.getPOSTConfig());
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function updateKommentar(kommentarDto: KommentarDto, showInInformationList: boolean): Promise<KommentarDto> {
    const requestObject: UpdateKommentarRequest = {
      kommentarDto: kommentarDto,
    };
    try {
      const response = await kommentareApi.updateKommentar(requestObject, RequestUtils.getPUTConfig());
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function deleteKommentar(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteKommentarRequest = {
      id: id,
    };
    try {
      const response = await kommentareApi.deleteKommentar(requestObject, RequestUtils.getDELETEConfig());
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return {
    getKommentareForBauvorhaben,
    getKommentareForInfrastruktureinrichtung,
    createKommentar,
    updateKommentar,
    deleteKommentar,
  };
}
