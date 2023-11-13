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
    const dtoTyped =
      dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren
        ? (dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenAngelegtDto)
        : dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren
        ? (dto as { artAbfrage: "BAUGENEHMIGUNGSVERFAHREN" } & BaugenehmigungsverfahrenAngelegtDto)
        : (dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenAngelegtDto);
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
    const dtoTyped =
      dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren
        ? (dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenAngelegtDto)
        : dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren
        ? (dto as { artAbfrage: "BAUGENEHMIGUNGSVERFAHREN" } & BaugenehmigungsverfahrenAngelegtDto)
        : (dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenAngelegtDto);
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
    const dtoTyped =
      dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren
        ? (dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenInBearbeitungSachbearbeitungDto)
        : dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren
        ? (dto as { artAbfrage: "BAUGENEHMIGUNGSVERFAHREN" } & BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto)
        : (dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenInBearbeitungSachbearbeitungDto);
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
    const dtoTyped =
      dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren
        ? (dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenInBearbeitungFachreferatDto)
        : dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren
        ? (dto as { artAbfrage: "BAUGENEHMIGUNGSVERFAHREN" } & BaugenehmigungsverfahrenInBearbeitungFachreferatDto)
        : (dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenInBearbeitungFachreferatDto);
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
