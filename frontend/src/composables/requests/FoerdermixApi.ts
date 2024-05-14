import RequestUtils from "@/utils/RequestUtils";
import {
  type DeleteFoerdermixStammByIdRequest,
  type FoerdermixStammDto,
  type GetFoerdermixStammByIdRequest,
  type SaveFoerdermixStammRequest,
  type UpdateFoerdermixStammRequest,
  FoerdermixStammApi,
} from "@/api/api-client/isi-backend";
import { useErrorHandler } from "./ErrorHandler";

// eslint-disable-next-line
export function useFoerdermixApi() {
  const foerdermixStammApi = new FoerdermixStammApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function createFoerdermixStamm(
    dto: FoerdermixStammDto,
    showInInformationList: boolean,
  ): Promise<FoerdermixStammDto> {
    const requestObject: SaveFoerdermixStammRequest = {
      foerdermixStammDto: dto,
    };
    try {
      const response = await foerdermixStammApi.saveFoerdermixStamm(requestObject, RequestUtils.getPOSTConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function updateFoerdermixStamm(
    dto: FoerdermixStammDto,
    showInInformationList: boolean,
  ): Promise<FoerdermixStammDto> {
    const requestObject: UpdateFoerdermixStammRequest = {
      foerdermixStammDto: dto,
    };
    try {
      const response = await foerdermixStammApi.updateFoerdermixStamm(requestObject, RequestUtils.getPUTConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getFoerdermixStaemme(showInInformationList: boolean): Promise<FoerdermixStammDto[]> {
    try {
      const response = await foerdermixStammApi.getFoerdermixStaemme();
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function getFoerdermix(id: string, showInInformationList: boolean): Promise<FoerdermixStammDto> {
    const requestObject: GetFoerdermixStammByIdRequest = {
      id: id,
    };
    try {
      const response = await foerdermixStammApi.getFoerdermixStammById(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  async function deleteFoerdermixStamm(id: string, showInInformationList: boolean): Promise<void> {
    const requestObject: DeleteFoerdermixStammByIdRequest = {
      id: id,
    };
    try {
      const response = await foerdermixStammApi.deleteFoerdermixStammById(
        requestObject,
        RequestUtils.getDELETEConfig(),
      );
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return { createFoerdermixStamm, updateFoerdermixStamm, getFoerdermixStaemme, getFoerdermix, deleteFoerdermixStamm };
}
