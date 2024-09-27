import {
  type FilepathDto,
  type GetFileRequest,
  type PresignedUrlDto,
  type SaveFileRequest,
  DateihandlingApi,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import _ from "lodash";
import { useToast } from "vue-toastification";

// eslint-disable-next-line
export function useDokumenteApi() {
  const dateihandlingApi = new DateihandlingApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const toast = useToast();
  const errorMessage = "Beim Speichern eines Dokuments ist ein Fehler aufgetreten.";

  async function getPresignedUrlForSaveDokument(dto: FilepathDto): Promise<PresignedUrlDto> {
    const requestObject: SaveFileRequest = {
      filepathDto: dto,
    };
    try {
      const response = await dateihandlingApi.saveFile(requestObject, RequestUtils.getPOSTConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getPresignedUrlForGetDokument(dto: FilepathDto): Promise<PresignedUrlDto> {
    const requestObject: GetFileRequest = {
      pathToFile: dto.pathToFile,
    };
    try {
      const response = await dateihandlingApi.getFile(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function saveDokumentWithUrl(dto: PresignedUrlDto, file: File): Promise<void> {
    if (!_.isNil(dto.url)) {
      try {
        const response = await fetch(dto.url, {
          method: dto.httpMethodToUse as string,
          body: file,
          headers: { "Content-Type": "application/octet-stream" },
        });
        if (!response.ok) {
          toast.error(errorMessage, { timeout: false });
        }
      } catch {
        toast.error(errorMessage, { timeout: false });
      }
    }
  }

  async function deleteDokumentWithUrl(dto: PresignedUrlDto): Promise<void> {
    if (!_.isNil(dto.url)) {
      try {
        const response = await fetch(dto.url, {
          method: dto.httpMethodToUse as string,
        });
        if (!response.ok) {
          toast.error(errorMessage, { timeout: false });
        }
      } catch {
        toast.error(errorMessage, { timeout: false });
      }
    }
  }

  return {
    getPresignedUrlForSaveDokument,
    getPresignedUrlForGetDokument,
    saveDokumentWithUrl,
    deleteDokumentWithUrl,
  };
}
