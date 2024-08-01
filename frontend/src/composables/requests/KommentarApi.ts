import {
  type CreateKommentarForBauvorhabenRequest,
  type CreateKommentarForInfrastruktureinrichtungRequest,
  type DeleteKommentarForBauvorhabenRequest,
  type DeleteKommentarForInfrastruktureinrichtungRequest,
  type GetKommentareForBauvorhabenRequest,
  type GetKommentareForInfrastruktureinrichtungRequest,
  type KommentarBauvorhabenDto,
  type KommentarInfrastruktureinrichtungDto,
  type UpdateKommentarForBauvorhabenRequest,
  type UpdateKommentarForInfrastruktureinrichtungRequest,
  KommentareApi,
  KommentarBauvorhabenDto,
  KommentarInfrastruktureinrichtungDto,
  UpdateKommentarForBauvorhabenRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";

// eslint-disable-next-line
export function useKommentarApi() {
  const kommentareApi = new KommentareApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const { resetCommentDirty } = useSaveLeave();

  async function getKommentareForBauvorhaben(bauvorhabenId: string): Promise<Array<KommentarBauvorhabenDto>> {
    const requestObject: GetKommentareForBauvorhabenRequest = {
      bauvorhabenId: bauvorhabenId,
    };
    try {
      const response = await kommentareApi.getKommentareForBauvorhaben(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getKommentareForInfrastruktureinrichtung(
    infrastruktureinrichtungId: string,
  ): Promise<Array<KommentarInfrastruktureinrichtungDto>> {
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
      throw handleError(error);
    }
  }

  async function createKommentarForBauvorhaben(
    kommentarBauvorhabenDto: KommentarBauvorhabenDto,
  ): Promise<KommentarBauvorhabenDto> {
    const requestObject: CreateKommentarForBauvorhabenRequest = {
      kommentarBauvorhabenDto: kommentarBauvorhabenDto,
    };
    try {
      const response = await kommentareApi.createKommentarForBauvorhaben(requestObject, RequestUtils.getPOSTConfig());
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function createKommentarForInfrastruktureinrichtung(
    kommentarInfrastruktureinrichtungDto: KommentarInfrastruktureinrichtungDto,
  ): Promise<KommentarInfrastruktureinrichtungDto> {
    const requestObject: CreateKommentarForInfrastruktureinrichtungRequest = {
      kommentarInfrastruktureinrichtungDto: kommentarInfrastruktureinrichtungDto,
    };
    try {
      const response = await kommentareApi.createKommentarForInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getPOSTConfig(),
      );
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function updateKommentarForBauvorhaben(
    kommentarBauvorhabenDto: KommentarBauvorhabenDto,
  ): Promise<KommentarBauvorhabenDto> {
    const requestObject: UpdateKommentarForBauvorhabenRequest = {
      kommentarBauvorhabenDto: kommentarBauvorhabenDto,
    };
    try {
      const response = await kommentareApi.updateKommentarForBauvorhaben(requestObject, RequestUtils.getPUTConfig());
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function updateKommentarForInfrastruktureinrichtung(
    kommentarInfrastruktureinrichtungDto: KommentarInfrastruktureinrichtungDto,
  ): Promise<KommentarInfrastruktureinrichtungDto> {
    const requestObject: UpdateKommentarForInfrastruktureinrichtungRequest = {
      kommentarInfrastruktureinrichtungDto: kommentarInfrastruktureinrichtungDto,
    };
    try {
      const response = await kommentareApi.updateKommentarForInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getPUTConfig(),
      );
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteKommentarForBauvorhaben(id: string): Promise<void> {
    const requestObject: DeleteKommentarForBauvorhabenRequest = {
      id: id,
    };
    try {
      const response = await kommentareApi.deleteKommentarForBauvorhaben(requestObject, RequestUtils.getDELETEConfig());
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteKommentarForInfrastruktureinrichtung(id: string): Promise<void> {
    const requestObject: DeleteKommentarForInfrastruktureinrichtungRequest = {
      id: id,
    };
    try {
      const response = await kommentareApi.deleteKommentarForInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getDELETEConfig(),
      );
      resetCommentDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  return {
    getKommentareForBauvorhaben,
    getKommentareForInfrastruktureinrichtung,
    createKommentarForBauvorhaben,
    createKommentarForInfrastruktureinrichtung,
    updateKommentarForBauvorhaben,
    updateKommentarForInfrastruktureinrichtung,
    deleteKommentarForBauvorhaben,
    deleteKommentarForInfrastruktureinrichtung,
  };
}
