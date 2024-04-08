import {
  DateihandlingApi,
  FilepathDto,
  GetFileRequest,
  PresignedUrlDto,
  SaveFileRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useInformationList } from "./InformationList";
import _ from "lodash";

// eslint-disable-next-line
export function useDokumenteApi() {
  const dateihandlingApi = new DateihandlingApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const { showErrorInInformationList } = useInformationList();
  const errorMessage = "Beim Speichern eines Dokuments ist ein Fehler aufgetreten.";

  async function getPresignedUrlForSaveDokument(
    dto: FilepathDto,
    showInInformationList: boolean,
  ): Promise<PresignedUrlDto> {
    const requestObject: SaveFileRequest = {
      filepathDto: dto,
    };
    try {
      const response = await dateihandlingApi.saveFile(requestObject, RequestUtils.getPOSTConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getPresignedUrlForGetDokument(
    dto: FilepathDto,
    showInInformationList: boolean,
  ): Promise<PresignedUrlDto> {
    const requestObject: GetFileRequest = {
      pathToFile: dto.pathToFile,
    };
    try {
      const response = await dateihandlingApi.getFile(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
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
          showErrorInInformationList(errorMessage);
        }
      } catch {
        showErrorInInformationList(errorMessage);
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
          showErrorInInformationList(errorMessage);
        }
      } catch {
        showErrorInInformationList(errorMessage);
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
