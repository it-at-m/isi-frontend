import {Component, Mixins} from "vue-property-decorator";
import {
  MasterEaiApi,
  GetAdressenRequest,
  AdressSucheDto,
  MuenchenAdresseDto
} from "@/api/api-client/isi-master-eai";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import _ from "lodash";

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
        return _.isNil(response.adressen) ? [] : response.adressen;
      })
      .catch(error => {
        throw this.handleError(showInInformationList, error);
      });
  }
  
}
