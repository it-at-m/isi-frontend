import {
  type ExtractMediaTypeInformationForAllowedMediaTypeRequest,
  type FilepathDto,
  type MimeTypeInformationDto,
  MimeTypeApi,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";

// eslint-disable-next-line
export function useMimeTypeApi() {
  const mimeTypeApi = new MimeTypeApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function extractMediaTypeInformationForAllowedMediaType(
    dto: FilepathDto,
    showInInformationList: boolean,
  ): Promise<MimeTypeInformationDto> {
    const requestObject: ExtractMediaTypeInformationForAllowedMediaTypeRequest = {
      filepathDto: dto,
    };
    try {
      const response = await mimeTypeApi.extractMediaTypeInformationForAllowedMediaType(
        requestObject,
        RequestUtils.getPOSTConfig(),
      );
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return { extractMediaTypeInformationForAllowedMediaType };
}
