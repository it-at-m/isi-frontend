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

  async function createFoerdermixStamm(dto: FoerdermixStammDto): Promise<FoerdermixStammDto> {
    const requestObject: SaveFoerdermixStammRequest = {
      foerdermixStammDto: dto,
    };
    try {
      const response = await foerdermixStammApi.saveFoerdermixStamm(requestObject, RequestUtils.getPOSTConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function updateFoerdermixStamm(dto: FoerdermixStammDto): Promise<FoerdermixStammDto> {
    const requestObject: UpdateFoerdermixStammRequest = {
      foerdermixStammDto: dto,
    };
    try {
      const response = await foerdermixStammApi.updateFoerdermixStamm(requestObject, RequestUtils.getPUTConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getFoerdermixStaemme(): Promise<FoerdermixStammDto[]> {
    try {
      const response = await foerdermixStammApi.getFoerdermixStaemme();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getFoerdermix(id: string): Promise<FoerdermixStammDto> {
    const requestObject: GetFoerdermixStammByIdRequest = {
      id: id,
    };
    try {
      const response = await foerdermixStammApi.getFoerdermixStammById(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteFoerdermixStamm(id: string): Promise<void> {
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
      throw handleError(error);
    }
  }

  return { createFoerdermixStamm, updateFoerdermixStamm, getFoerdermixStaemme, getFoerdermix, deleteFoerdermixStamm };
}
