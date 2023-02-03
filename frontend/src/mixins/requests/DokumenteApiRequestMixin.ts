import {
  DateihandlingApi,
  DeleteFileRequest,
  FilepathDto,
  GetFileRequest,
  PresignedUrlDto,
  SaveFileRequest,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import {Component, Mixins} from "vue-property-decorator";
import _ from "lodash";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class DokumenteApiRequestMixin extends Mixins(ErrorHandler) {
  
  private dateihandlingApi: DateihandlingApi;
  
  constructor() {
    super();
    this.dateihandlingApi = new DateihandlingApi(RequestUtils.getBasicFetchConfiguration());
  }
  
  async getPresignedUrlForSaveDokument(dto: FilepathDto, showInInformationList: boolean): Promise<PresignedUrlDto> {
    const requestObject: SaveFileRequest = {
      filepathDto: dto
    };
    return await this.dateihandlingApi.saveFile(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  getPresignedUrlForGetDokument(dto: FilepathDto, showInInformationList: boolean): Promise<PresignedUrlDto> {
    const requestObject: GetFileRequest = {
      pathToFile: dto.pathToFile
    };
    return this.dateihandlingApi.getFile(requestObject, RequestUtils.getGETConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  getPresignedUrlForDeleteDokument(dto: FilepathDto, showInInformationList: boolean): Promise<PresignedUrlDto> {
    const requestObject: DeleteFileRequest = {
      filepathDto: dto
    };
    return this.dateihandlingApi.deleteFile(requestObject, RequestUtils.getDELETEConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
  async saveDokumentWithUrl(dto: PresignedUrlDto, file: File): Promise<void> {
    if (!_.isNil(dto.url)) {
      fetch(dto.url, {
        method: dto.httpMethodToUse as string,
        body: file,
        headers: {'Content-Type': 'application/octet-stream'}
      })
        .then((response) => {
          if (!response.ok) {
            this.showErrorInInformationList("Beim Speichern eines Dokuments ist ein Fehler aufgetreten.");
          }
        })
        .catch(() => {
          this.showErrorInInformationList("Beim Speichern eines Dokuments ist ein Fehler aufgetreten.");
        });
    }
  }
  
  async deleteDokumentWithUrl(dto: PresignedUrlDto): Promise<void> {
    if (!_.isNil(dto.url)) {
      fetch(dto.url, {
        method: dto.httpMethodToUse as string,
      })
        .then((response) => {
          if (!response.ok) {
            this.showErrorInInformationList("Beim Löschen eines Dokuments ist ein Fehler aufgetreten.");
          }
        })
        .catch(() => {
          this.showErrorInInformationList("Beim Löschen eines Dokuments ist ein Fehler aufgetreten.");
        });
    }
  }
  
}
  