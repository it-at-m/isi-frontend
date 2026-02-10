import type {
  BauleitplanverfahrenDto,
  BaugenehmigungsverfahrenDto,
  WeiteresVerfahrenDto,
  BauleitplanverfahrenAngelegtDto,
  BaugenehmigungsverfahrenAngelegtDto,
  WeiteresVerfahrenAngelegtDto,
  SaveOperationRequest,
  PatchAngelegtRequest,
  GetByIdRequest,
  DeleteByIdRequest,
  BauleitplanverfahrenStartBearbeitungDto,
  BaugenehmigungsverfahrenStartBearbeitungDto,
  WeiteresVerfahrenStartBearbeitungDto,
  PatchStartBearbeitungOperationRequest,
  BauleitplanverfahrenEinpflegenBedarfsmeldungDto,
  BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto,
  WeiteresVerfahrenEinpflegenBedarfsmeldungDto,
  PatchEinpflegenBedarfsmeldungOperationRequest,
  BauleitplanverfahrenEinplanungBedarfeDto,
  BaugenehmigungsverfahrenEinplanungBedarfeDto,
  WeiteresVerfahrenEinplanungBedarfeDto,
  PatchEinplanungBedarfeOperationRequest,
} from "@/api/api-client/isi-backend";
import { AbfragenApi, AbfrageDtoArtAbfrageEnum } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";
import { toBackendJson } from "@/utils/SerializationUtils";

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
      saveRequest: toBackendJson(dtoTyped) as typeof dtoTyped,
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
      saveRequest: toBackendJson(dtoTyped) as typeof dtoTyped,
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

  async function patchStartBearbeitung(
    dto:
      | BauleitplanverfahrenStartBearbeitungDto
      | BaugenehmigungsverfahrenStartBearbeitungDto
      | WeiteresVerfahrenStartBearbeitungDto,
    id: string,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenStartBearbeitungDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as {
        artAbfrage: "BAUGENEHMIGUNGSVERFAHREN";
      } & BaugenehmigungsverfahrenStartBearbeitungDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenStartBearbeitungDto;
    }

    const requestObject: PatchStartBearbeitungOperationRequest = {
      patchStartBearbeitungRequest: toBackendJson(dtoTyped) as typeof dtoTyped,
      id: id,
    };
    try {
      const response = await abfragenApi.patchStartBearbeitung(requestObject, RequestUtils.getPATCHConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function patchEinpflegenBedarfsmeldung(
    dto:
      | BauleitplanverfahrenEinpflegenBedarfsmeldungDto
      | BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto
      | WeiteresVerfahrenEinpflegenBedarfsmeldungDto,
    id: string,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenEinpflegenBedarfsmeldungDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as {
        artAbfrage: "BAUGENEHMIGUNGSVERFAHREN";
      } & BaugenehmigungsverfahrenEinpflegenBedarfsmeldungDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenEinpflegenBedarfsmeldungDto;
    }

    const requestObject: PatchEinpflegenBedarfsmeldungOperationRequest = {
      patchEinpflegenBedarfsmeldungRequest: toBackendJson(dtoTyped) as typeof dtoTyped,
      id: id,
    };
    try {
      const response = await abfragenApi.patchEinpflegenBedarfsmeldung(requestObject, RequestUtils.getPATCHConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function patchEinplanungBedarfe(
    dto:
      | BauleitplanverfahrenEinplanungBedarfeDto
      | BaugenehmigungsverfahrenEinplanungBedarfeDto
      | WeiteresVerfahrenEinplanungBedarfeDto,
    id: string,
  ): Promise<BauleitplanverfahrenDto | BaugenehmigungsverfahrenDto | WeiteresVerfahrenDto> {
    let dtoTyped = undefined;
    if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      dtoTyped = dto as { artAbfrage: "BAULEITPLANVERFAHREN" } & BauleitplanverfahrenEinplanungBedarfeDto;
    } else if (dto.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      dtoTyped = dto as {
        artAbfrage: "BAUGENEHMIGUNGSVERFAHREN";
      } & BaugenehmigungsverfahrenEinplanungBedarfeDto;
    } else {
      dtoTyped = dto as { artAbfrage: "WEITERES_VERFAHREN" } & WeiteresVerfahrenEinplanungBedarfeDto;
    }

    const requestObject: PatchEinplanungBedarfeOperationRequest = {
      patchEinplanungBedarfeRequest: toBackendJson(dtoTyped) as typeof dtoTyped,
      id: id,
    };
    try {
      const response = await abfragenApi.patchEinplanungBedarfe(requestObject, RequestUtils.getPATCHConfig());
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
    patchStartBearbeitung,
    patchEinpflegenBedarfsmeldung,
    patchEinplanungBedarfe,
    getById,
    deleteById,
  };
}
