import {
  type ApiResponse,
  type CreateInfrastruktureinrichtungRequest,
  type CreateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest,
  type DeleteInfrastruktureinrichtungByIdRequest,
  type DeleteInfrastruktureinrichtungBedarfsmeldungSozialplanungByIdRequest,
  type GetInfrastruktureinrichtungByIdRequest,
  type InfrastruktureinrichtungDto,
  type UpdateInfrastruktureinrichtungOperationRequest,
  type UpdateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest,
  type UpdateInfrastruktureinrichtungRequest,
  InfrastruktureinrichtungApi,
  InfrastruktureinrichtungDtoFromJSON,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";
import { toBackendJson } from "@/utils/SerializationUtils";

// eslint-disable-next-line
export function useInfrastruktureinrichtungApi() {
  const infrastruktureinrichtungApi = new InfrastruktureinrichtungApi(
    RequestUtils.getBasicFetchConfigurationForBackend(),
  );
  const { handleError } = useErrorHandler();
  const { resetFormDirty } = useSaveLeave();

  /**
   * Der generierte oneOf-Mapper (UpdateInfrastruktureinrichtungRequestFromJSON) wählt den Typ anhand von
   * Pflichtfeldern. Da HausFuerKinderDto keine Pflichtfelder besitzt, greift dieser für alle nachfolgenden Typen
   * (z. B. Nachbarschaftstreff) und verwirft deren spezifische Attribute. Daher wird hier über den Discriminator
   * "infrastruktureinrichtungTyp" gemappt.
   */
  async function mapResponse(response: ApiResponse<unknown>): Promise<InfrastruktureinrichtungDto> {
    return InfrastruktureinrichtungDtoFromJSON(await response.raw.json());
  }

  async function getInfrastruktureinrichtungById(id: string): Promise<InfrastruktureinrichtungDto> {
    const requestObject: GetInfrastruktureinrichtungByIdRequest = {
      id: id,
    };
    try {
      const response = await infrastruktureinrichtungApi.getInfrastruktureinrichtungByIdRaw(
        requestObject,
        RequestUtils.getGETConfig(),
      );
      return await mapResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  async function createInfrastruktureinrichtung(
    dto: InfrastruktureinrichtungDto,
  ): Promise<InfrastruktureinrichtungDto> {
    // create
    const requestObject: CreateInfrastruktureinrichtungRequest = {
      updateInfrastruktureinrichtungRequest: dto as unknown as UpdateInfrastruktureinrichtungRequest,
    };
    try {
      const response = await infrastruktureinrichtungApi.createInfrastruktureinrichtungRaw(
        requestObject,
        RequestUtils.getPOSTConfig(),
      );
      const mapped = await mapResponse(response);
      resetFormDirty();
      return mapped;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function createInfrastruktureinrichtungBedarfsmeldungSozialplanung(
    dto: InfrastruktureinrichtungDto,
  ): Promise<InfrastruktureinrichtungDto> {
    // create
    const requestObject: CreateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest = {
      updateInfrastruktureinrichtungRequest: dto as unknown as UpdateInfrastruktureinrichtungRequest,
    };
    try {
      const response = await infrastruktureinrichtungApi.createInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw(
        requestObject,
        RequestUtils.getPOSTConfig(),
      );
      const mapped = await mapResponse(response);
      resetFormDirty();
      return mapped;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function updateInfrastruktureinrichtung(
    dto: InfrastruktureinrichtungDto,
  ): Promise<InfrastruktureinrichtungDto> {
    // update
    const requestObject: UpdateInfrastruktureinrichtungOperationRequest = {
      updateInfrastruktureinrichtungRequest: dto as unknown as UpdateInfrastruktureinrichtungRequest,
    };
    try {
      const response = await infrastruktureinrichtungApi.updateInfrastruktureinrichtungRaw(
        requestObject,
        RequestUtils.getPUTConfig(),
      );
      const mapped = await mapResponse(response);
      resetFormDirty();
      return mapped;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function updateInfrastruktureinrichtungBedarfsmeldungSozialplanung(
    dto: InfrastruktureinrichtungDto,
  ): Promise<InfrastruktureinrichtungDto> {
    // update
    const requestObject: UpdateInfrastruktureinrichtungBedarfsmeldungSozialplanungRequest = {
      updateInfrastruktureinrichtungRequest: dto as unknown as UpdateInfrastruktureinrichtungRequest,
    };
    try {
      const response = await infrastruktureinrichtungApi.updateInfrastruktureinrichtungBedarfsmeldungSozialplanungRaw(
        requestObject,
        RequestUtils.getPUTConfig(),
      );
      const mapped = await mapResponse(response);
      resetFormDirty();
      return mapped;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteInfrastruktureinrichtungById(id: string): Promise<void> {
    const requestObject: DeleteInfrastruktureinrichtungByIdRequest = {
      id: id,
    };
    try {
      const response = await infrastruktureinrichtungApi.deleteInfrastruktureinrichtungById(
        requestObject,
        RequestUtils.getDELETEConfig(),
      );
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById(id: string): Promise<void> {
    const requestObject: DeleteInfrastruktureinrichtungBedarfsmeldungSozialplanungByIdRequest = {
      id: id,
    };
    try {
      const response = await infrastruktureinrichtungApi.deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById(
        requestObject,
        RequestUtils.getDELETEConfig(),
      );
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  return {
    getInfrastruktureinrichtungById,
    createInfrastruktureinrichtung,
    createInfrastruktureinrichtungBedarfsmeldungSozialplanung,
    updateInfrastruktureinrichtung,
    updateInfrastruktureinrichtungBedarfsmeldungSozialplanung,
    deleteInfrastruktureinrichtungById,
    deleteInfrastruktureinrichtungBedarfsmeldungSozialplanungById,
  };
}
