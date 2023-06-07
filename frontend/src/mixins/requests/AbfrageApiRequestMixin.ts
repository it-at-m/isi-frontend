import {
  AbfrageApi,
  AbfrageerstellungInfrastrukturabfrageAngelegtDto,
  CreateInfrastrukturabfrageRequest,
  DeleteInfrastrukturabfrageByIdRequest,
  GetInfrastrukturabfrageByIdRequest,
  InfrastrukturabfrageDto,
  PatchAbfrageAngelegtRequest,
  PutAbfragevarianteRelevantRequest,
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
    id: string,
    showInInformationList: boolean
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PatchAbfrageAngelegtRequest = {
      abfrageerstellungInfrastrukturabfrageAngelegtDto: dto,
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

  changeAbfragevarianteRelevant(
    abfrageId: string,
    abfragevarianteId: string,
    showInInformationList: boolean
  ): Promise<InfrastrukturabfrageDto> {
    const requestObject: PutAbfragevarianteRelevantRequest = {
      abfrageId: abfrageId,
      abfragevarianteId: abfragevarianteId,
    };
    return this.abfrageApi
      .putChangeAbfragevarianteRelevant(requestObject, RequestUtils.getPUTConfig())
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
