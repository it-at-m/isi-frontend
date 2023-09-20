import {
  CreateKommentarRequest,
  DeleteKommentarRequest,
  GetKommentareForBauvorhabenRequest,
  GetKommentareForInfrastruktureinrichtungRequest,
  KommentarDto,
  KommentareApi,
  UpdateKommentarRequest,
} from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "./ErrorHandler";

@Component
export default class KommentarApiRequestMixin extends Mixins(ErrorHandler) {
  private kommentareApi: KommentareApi;

  constructor() {
    super();
    this.kommentareApi = new KommentareApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  async getKommentareForBauvorhaben(
    bauvorhabenId: string,
    showInInformationList: boolean
  ): Promise<Array<KommentarDto>> {
    const requestObject: GetKommentareForBauvorhabenRequest = {
      bauvorhabenId: bauvorhabenId,
    };
    return await this.kommentareApi
      .getKommentareForBauvorhaben(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  async getKommentareForInfrastruktureinrichtung(
    infrastruktureinrichtungId: string,
    showInInformationList: boolean
  ): Promise<Array<KommentarDto>> {
    const requestObject: GetKommentareForInfrastruktureinrichtungRequest = {
      infrastruktureinrichtungId: infrastruktureinrichtungId,
    };
    return await this.kommentareApi
      .getKommentareForInfrastruktureinrichtung(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  async createKommentar(kommentarDto: KommentarDto, showInInformationList: boolean): Promise<KommentarDto> {
    const requestObject: CreateKommentarRequest = {
      kommentarDto: kommentarDto,
    };
    return await this.kommentareApi
      .createKommentar(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  async updateKommentar(kommentarDto: KommentarDto, showInInformationList: boolean): Promise<KommentarDto> {
    const requestObject: UpdateKommentarRequest = {
      kommentarDto: kommentarDto,
    };
    return await this.kommentareApi
      .updateKommentar(requestObject, RequestUtils.getPUTConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  async delete(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteKommentarRequest = {
      id: id,
    };
    return await this.kommentareApi
      .deleteKommentar(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
