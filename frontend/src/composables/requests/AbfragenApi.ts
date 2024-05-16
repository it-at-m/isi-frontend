import type {
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
} from "@/api/api-client/isi-backend";
import { AbfragenApi, AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";

// eslint-disable-next-line
export function useAbfragenApi() {
  const abfragenApi = new AbfragenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const { resetFormDirty } = useSaveLeave();

  async function save(
    dto: BauleitplanverfahrenAngelegtDto | BaugenehmigungsverfahrenAngelegtDto | WeiteresVerfahrenAngelegtDto,
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

    try {
      const response = await abfragenApi.save(requestObject, RequestUtils.getPOSTConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function patchAngelegt(
    dto: BauleitplanverfahrenAngelegtDto | BaugenehmigungsverfahrenAngelegtDto | WeiteresVerfahrenAngelegtDto,
    id: string,
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

    try {
      const response = await abfragenApi.patchAngelegt(requestObject, RequestUtils.getPATCHConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function patchInBearbeitungSachbearbeitung(
    dto:
      | BauleitplanverfahrenInBearbeitungSachbearbeitungDto
      | BaugenehmigungsverfahrenInBearbeitungSachbearbeitungDto
      | WeiteresVerfahrenInBearbeitungSachbearbeitungDto,
    id: string,
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
    try {
      const response = await abfragenApi.patchInBearbeitungSachbearbeitung(
        requestObject,
        RequestUtils.getPATCHConfig(),
      );
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function patchInBearbeitungFachreferat(
    dto:
      | BauleitplanverfahrenInBearbeitungFachreferatDto
      | BaugenehmigungsverfahrenInBearbeitungFachreferatDto
      | WeiteresVerfahrenInBearbeitungFachreferatDto,
    id: string,
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
    try {
      const response = await abfragenApi.patchInBearbeitungFachreferat(requestObject, RequestUtils.getPATCHConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function patchBedarfsmeldungErfolgt(
    dto:
      | BauleitplanverfahrenBedarfsmeldungErfolgtDto
      | BaugenehmigungsverfahrenBedarfsmeldungErfolgtDto
      | WeiteresVerfahrenBedarfsmeldungErfolgtDto,
    id: string,
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
    try {
      const response = await abfragenApi.patchBedarfsmeldungErfolgt(requestObject, RequestUtils.getPATCHConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getById(
    id: string,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    const requestObject: GetByIdRequest = {
      id: id,
    };
    try {
      const response = await abfragenApi.getById(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteById(id: string): Promise<void> {
    const requestObject: DeleteByIdRequest = {
      id: id,
    };
    try {
      const response = await abfragenApi.deleteById(requestObject, RequestUtils.getDELETEConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  return {
    save,
    patchAngelegt,
    patchInBearbeitungSachbearbeitung,
    patchInBearbeitungFachreferat,
    patchBedarfsmeldungErfolgt,
    getById,
    deleteById,
  };
}
