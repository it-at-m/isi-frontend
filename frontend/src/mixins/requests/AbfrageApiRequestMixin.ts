import {
  AbfrageApi,
  InfrastrukturabfrageAngelegtDto,
  CreateInfrastrukturabfrageRequest,
  DeleteInfrastrukturabfrageByIdRequest,
  GetInfrastrukturabfrageByIdRequest,
  InfrastrukturabfrageDto,
  PatchAbfrageAngelegtRequest,
  InfrastrukturabfrageInBearbeitungSachbearbeitungDto,
  InfrastrukturabfrageInBearbeitungFachreferateDto,
  PatchAbfrageInBearbeitungSachbearbeitungRequest,
  PatchAbfrageInBearbeitungFachreferateRequest,
} from "@/api/api-client/isi-backend";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";

@Component
export default class AbfrageApiRequestMixin extends Mixins(SaveLeaveMixin, ErrorHandler) {
  private abfrageApi: AbfrageApi;

  constructor() {
    super();
    this.abfrageApi = new AbfrageApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  createInfrastrukturabfrage(
    dto: InfrastrukturabfrageAngelegtDto,
    showInInformationList: boolean,
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: CreateInfrastrukturabfrageRequest = {
      infrastrukturabfrageAngelegtDto: dto,
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
    dto: InfrastrukturabfrageAngelegtDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PatchAbfrageAngelegtRequest = {
      infrastrukturabfrageAngelegtDto: dto,
      id: id,
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

  patchAbfrageInBearbeitungSachbearbeitung(
    dto: InfrastrukturabfrageInBearbeitungSachbearbeitungDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PatchAbfrageInBearbeitungSachbearbeitungRequest = {
      infrastrukturabfrageInBearbeitungSachbearbeitungDto: dto,
      id: id,
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

  patchAbfrageInBearbeitungFachreferate(
    dto: InfrastrukturabfrageInBearbeitungFachreferateDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PatchAbfrageInBearbeitungFachreferateRequest = {
      infrastrukturabfrageInBearbeitungFachreferateDto: dto,
      id: id,
    };
    return this.abfrageApi
      .patchAbfrageInBearbeitungFachreferate(requestObject, RequestUtils.getPATCHConfig())
      .then((response) => {
        this.resetDirty();
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
