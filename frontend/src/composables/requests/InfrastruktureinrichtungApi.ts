import {
  type CreateInfrastruktureinrichtungRequest,
  type DeleteInfrastruktureinrichtungByIdRequest,
  type GetInfrastruktureinrichtungByIdRequest,
  type InfrastruktureinrichtungDto,
  type UpdateInfrastruktureinrichtungOperationRequest,
  type UpdateInfrastruktureinrichtungRequest,
  InfrastruktureinrichtungApi,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";

// eslint-disable-next-line
export function useInfrastruktureinrichtungApi() {
  const infrastruktureinrichtungApi = new InfrastruktureinrichtungApi(
    RequestUtils.getBasicFetchConfigurationForBackend(),
  );
  const { handleError } = useErrorHandler();
  const { resetFormDirty } = useSaveLeave();

  async function getInfrastruktureinrichtungById(id: string): Promise<UpdateInfrastruktureinrichtungRequest> {
    const requestObject: GetInfrastruktureinrichtungByIdRequest = {
      id: id,
    };
    try {
      const response = await infrastruktureinrichtungApi.getInfrastruktureinrichtungById(
        requestObject,
        RequestUtils.getGETConfig(),
      );
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function createInfrastruktureinrichtung(
    dto: InfrastruktureinrichtungDto,
  ): Promise<InfrastruktureinrichtungDto> {
    const requestObject: CreateInfrastruktureinrichtungRequest = {
      updateInfrastruktureinrichtungRequest: dto as UpdateInfrastruktureinrichtungRequest,
    };
    try {
      const response = await infrastruktureinrichtungApi.createInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getPOSTConfig(),
      );
      resetFormDirty();
      return response as InfrastruktureinrichtungDto;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function updateInfrastruktureinrichtung(
    dto: InfrastruktureinrichtungDto,
  ): Promise<InfrastruktureinrichtungDto> {
    const requestObject: UpdateInfrastruktureinrichtungOperationRequest = {
      updateInfrastruktureinrichtungRequest: dto as UpdateInfrastruktureinrichtungRequest,
    };
    try {
      const response = await infrastruktureinrichtungApi.updateInfrastruktureinrichtung(
        requestObject,
        RequestUtils.getPUTConfig(),
      );
      resetFormDirty();
      return response as InfrastruktureinrichtungDto;
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

  return {
    getInfrastruktureinrichtungById,
    createInfrastruktureinrichtung,
    updateInfrastruktureinrichtung,
    deleteInfrastruktureinrichtungById,
  };
}
