import {Component, Mixins} from "vue-property-decorator";
import {
  MasterEaiApi,
  GetAdressenRequest,
  AdressSucheDto,
  MuenchenAdresseDto
} from "@/api/api-client/isi-master-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";

@Component
export default class MasterEaiApiRequestMixin extends Mixins(
  ErrorHandler
) {
  
  private masterEaiApi: MasterEaiApi;
  
  constructor() {
    super();
    this.masterEaiApi = new MasterEaiApi(RequestUtils.getBasicFetchConfigurationForMasterEai());
  }
  
  getAdressen(dto: AdressSucheDto, showInInformationList: boolean): Promise<MuenchenAdresseDto[]> {
    const requestObject: GetAdressenRequest = {
      adressSucheDto: dto
    };
    return this.masterEaiApi.getAdressen(requestObject, RequestUtils.getPOSTConfig())
      .then(response => {
        return response;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
