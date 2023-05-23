import { Component, Mixins } from "vue-property-decorator";
import {
  AbfrageApi,
  CreateInfrastrukturabfrageRequest,
  DeleteInfrastrukturabfrageByIdRequest,
  InfrastrukturabfrageDto,
  GetInfrastrukturabfrageByIdRequest,
  PatchAbfrageAngelegtRequest,
  PatchAbfrageInBearbeitungSachbearbeitungRequest,
  SachbearbeitungInfrastrukturabfrageOffenInBearbeitungDto,
  AbfrageerstellungInfrastrukturabfrageAngelegtDto,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class AbfrageApiRequestMixin extends Mixins(SaveLeaveMixin, ErrorHandler) {
  private abfrageApi: AbfrageApi;

  constructor() {
    super();
    this.abfrageApi = new AbfrageApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  createInfrastrukturabfrage(
    dto: AbfrageerstellungInfrastrukturabfrageAngelegtDto,
    showInInformationList: boolean
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: CreateInfrastrukturabfrageRequest = {
      abfrageerstellungInfrastrukturabfrageAngelegtDto: dto,
    };
    return this.abfrageApi
      .createInfrastrukturabfrage(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  patchAbfrageAngelegt(
    dto: AbfrageerstellungInfrastrukturabfrageAngelegtDto,
    showInInformationList: boolean
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PatchAbfrageAngelegtRequest = {
      abfrageerstellungInfrastrukturabfrageAngelegtDto: dto,
    };
    return this.abfrageApi
      .patchAbfrageAngelegt(requestObject, RequestUtils.getPATCHConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  patchAbfrageInBearbeitungOffen(
    dto: SachbearbeitungInfrastrukturabfrageOffenInBearbeitungDto,
    showInInformationList: boolean
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PatchAbfrageInBearbeitungSachbearbeitungRequest = {
      sachbearbeitungInfrastrukturabfrageOffenInBearbeitungDto: dto,
    };
    return this.abfrageApi
      .patchAbfrageInBearbeitungSachbearbeitung(requestObject, RequestUtils.getPATCHConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getInfrastrukturabfragen(showInInformationList: boolean): Promise<Array<InfrastrukturabfrageDto>> {
    return this.abfrageApi
      .getInfrastrukturabfragen(RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getInfrastrukturabfrageById(id: string, showInInformationList: boolean): Promise<InfrastrukturabfrageDto> {
    const requestObject: GetInfrastrukturabfrageByIdRequest = {
      id: id,
    };
    return this.abfrageApi
      .getInfrastrukturabfrageById(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  deleteInfrastrukturabfrageById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteInfrastrukturabfrageByIdRequest = {
      id: id,
    };
    return this.abfrageApi
      .deleteInfrastrukturabfrageById(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        this.resetDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
