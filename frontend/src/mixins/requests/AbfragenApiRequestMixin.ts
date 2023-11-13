import {
  AbfragenApi,
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
  BauleitplanverfahrenAngelegtDto,
  BaugenehmigungsverfahrenAngelegtDto,
  WeiteresVerfahrenAngelegtDto,
  BauleitplanverfahrenInBearbeitungSachbearbeitungDto,
  BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto,
  WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
  BauleitplanverfahrenInBearbeitungFachreferatDto,
  BaugenehmigungsverfahrenInBearbeitungFachreferatDto,
  WeiteresVerfahrenInBearbeitungFachreferatDto,
  SaveOperationRequest,
  PatchAngelegtRequest,
  PatchInBearbeitungSachbearbeitungOperationRequest,
  PatchInBearbeitungFachreferatOperationRequest,
  GetByIdRequest,
  DeleteByIdRequest,
} from "@/api/api-client/isi-backend";
import ErrorHandler from "@/mixins/requests/ErrorHandler";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";

@Component
export default class AbfragenApiRequestMixin extends Mixins(SaveLeaveMixin, ErrorHandler) {
  private abfragenApi: AbfragenApi;

  constructor() {
    super();
    this.abfragenApi = new AbfragenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  }

  save(
    dto: BauleitplanverfahrenAngelegtDto | BaugenehmigungsverfahrenAngelegtDto | WeiteresVerfahrenAngelegtDto,
    showInInformationList: boolean,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    const requestObject: SaveOperationRequest = {
      saveRequest: dto,
    };

    return this.abfragenApi
      .save(requestObject, RequestUtils.getPOSTConfig())
      .then((response) => {
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  patchAngelegt(
    dto: BauleitplanverfahrenAngelegtDto | BaugenehmigungsverfahrenAngelegtDto | WeiteresVerfahrenAngelegtDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    const requestObject: PatchAngelegtRequest = {
      saveRequest: dto,
      id: id,
    };

    return this.abfragenApi
      .patchAngelegt(requestObject, RequestUtils.getPATCHConfig())
      .then((response) => {
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  patchInBearbeitungSachbearbeitung(
    dto:
      | BauleitplanverfahrenInBearbeitungSachbearbeitungDto
      | BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
      | WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    const requestObject: PatchInBearbeitungSachbearbeitungOperationRequest = {
      patchInBearbeitungSachbearbeitungRequest: dto,
      id: id,
    };
    return this.abfragenApi
      .patchInBearbeitungSachbearbeitung(requestObject, RequestUtils.getPATCHConfig())
      .then((response) => {
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  patchInBearbeitungFachreferat(
    dto:
      | BauleitplanverfahrenInBearbeitungFachreferatDto
      | BaugenehmigungsverfahrenInBearbeitungFachreferatDto
      | WeiteresVerfahrenInBearbeitungFachreferatDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    const requestObject: PatchInBearbeitungFachreferatOperationRequest = {
      patchInBearbeitungFachreferatRequest: dto,
      id: id,
    };
    return this.abfragenApi
      .patchInBearbeitungFachreferat(requestObject, RequestUtils.getPATCHConfig())
      .then((response) => {
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  getById(
    id: string,
    showInInformationList: boolean,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    const requestObject: GetByIdRequest = {
      id: id,
    };
    return this.abfragenApi
      .getById(requestObject, RequestUtils.getGETConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }

  deleteById(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteByIdRequest = {
      id: id,
    };
    return this.abfragenApi
      .deleteById(requestObject, RequestUtils.getDELETEConfig())
      .then((response) => {
        this.resetFormDirty();
        return response;
      })
      .catch((error) => {
        throw this.handleError(showInInformationList, error);
      });
  }
}
