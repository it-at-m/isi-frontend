import {
  ExtractMediaTypeInformationForAllowedMediaTypeRequest,
  FilepathDto,
  MimeTypeApi,
  MimeTypeInformationDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class MimeTypeApiRequestMixin extends Mixins(ErrorHandler) {
  private mimeTypeApi: MimeTypeApi;

  constructor() {
    super();
    this.mimeTypeApi = new MimeTypeApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  async extractMediaTypeInformationForAllowedMediaType(
    dto: FilepathDto,
    showInInformationList: boolean
  ): Promise<MimeTypeInformationDto> {
    const requestObject: ExtractMediaTypeInformationForAllowedMediaTypeRequest = {
      filepathDto: dto,
    };
    return await this.mimeTypeApi
      .extractMediaTypeInformationForAllowedMediaType(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
