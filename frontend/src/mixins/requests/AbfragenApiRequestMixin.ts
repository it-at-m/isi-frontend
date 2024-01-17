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
  BauleitplanverfahrenBedarfsmeldungErfolgtDto,
  BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto,
  WeiteresVerfahrenBedarfsmeldungErfolgtDto,
  SaveOperationRequest,
  PatchAngelegtRequest,
  PatchInBearbeitungSachbearbeitungOperationRequest,
  PatchInBearbeitungFachreferatOperationRequest,
  PatchBedarfsmeldungErfolgtOperationRequest,
  GetByIdRequest,
  DeleteByIdRequest,
  AbfrageDtoArtAbfrageEnum,
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
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenAngelegtDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as { artAbfrage: "BAUGENEHMIGUNGSVERFAHREN" } & BaugenehmigungsverfahrenAngelegtDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenAngelegtDto;
    }

    const requestObject: SaveOperationRequest = {
      saveRequest: dtoTyped,
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
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenAngelegtDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as { artAbfrage: "BAUGENEHMIGUNGSVERFAHREN" } & BaugenehmigungsverfahrenAngelegtDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenAngelegtDto;
    }

    const requestObject: PatchAngelegtRequest = {
      saveRequest: dtoTyped,
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
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenInBearbeitungSachbearbeitungDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as {
        artAbfrage: "BAUGENEHMIGUNGSVERFAHREN";
      } & BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenInBearbeitungSachbearbeitungDto;
    }

    const requestObject: PatchInBearbeitungSachbearbeitungOperationRequest = {
      patchInBearbeitungSachbearbeitungRequest: dtoTyped,
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
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenInBearbeitungFachreferatDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as {
        artAbfrage: "BAUGENEHMIGUNGSVERFAHREN";
      } & BaugenehmigungsverfahrenInBearbeitungFachreferatDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenInBearbeitungFachreferatDto;
    }

    const requestObject: PatchInBearbeitungFachreferatOperationRequest = {
      patchInBearbeitungFachreferatRequest: dtoTyped,
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

  patchBedarfsmeldungErfolgt(
    dto:
      | BauleitplanverfahrenBedarfsmeldungErfolgtDto
      | BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
      | WeiteresVerfahrenBedarfsmeldungErfolgtDto,
    id: string,
    showInInformationList: boolean,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenBedarfsmeldungErfolgtDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as {
        artAbfrage: "BAUGENEHMIGUNGSVERFAHREN";
      } & BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenBedarfsmeldungErfolgtDto;
    }

    const requestObject: PatchBedarfsmeldungErfolgtOperationRequest = {
      patchBedarfsmeldungErfolgtRequest: dtoTyped,
      id: id,
    };
    return this.abfragenApi
      .patchBedarfsmeldungErfolgt(requestObject, RequestUtils.getPATCHConfig())
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
