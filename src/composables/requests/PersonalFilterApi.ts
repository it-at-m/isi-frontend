import type {
  PersonalFilterRequestDto,
  PersonalFilterResponseDto,
  CreateFilterRequest,
  DeleteFilterRequest,
  EditFilterRequest,
  GetByFilterIDRequest,
} from "@/api/api-client/isi-backend";
import { PersonalFilterApi } from "@/api/api-client/isi-backend";
import { useErrorHandler } from "./ErrorHandler";
import { useSaveLeave } from "../SaveLeave";
import RequestUtils from "@/utils/RequestUtils";
import { toBackendJson } from "@/utils/SerializationUtils";

export function usePersonalFilterApi() {
  const personalFilterApi = new PersonalFilterApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();
  const { resetFormDirty } = useSaveLeave();

  async function getPersonalFilters(): Promise<Array<PersonalFilterResponseDto>> {
    try {
      const response = await personalFilterApi.getPersonalFilters(RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getFilterById(filterId: string): Promise<PersonalFilterResponseDto> {
    const requestObject: GetByFilterIDRequest = { filterId: filterId };
    try {
      const response = await personalFilterApi.getByFilterID(requestObject, RequestUtils.getGETConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function createFilter(personalFilterRequestDto: PersonalFilterRequestDto): Promise<PersonalFilterResponseDto> {
    const requestObject: CreateFilterRequest = {
      personalFilterRequestDto: toBackendJson(personalFilterRequestDto) as unknown as PersonalFilterRequestDto,
    };
    try {
      const response = await personalFilterApi.createFilter(requestObject, RequestUtils.getPOSTConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function editFilter(personalFilterRequestDto: PersonalFilterRequestDto): Promise<PersonalFilterResponseDto> {
    const requestObject: EditFilterRequest = {
      personalFilterRequestDto: toBackendJson(personalFilterRequestDto) as unknown as PersonalFilterRequestDto,
    };
    try {
      const response = await personalFilterApi.editFilter(requestObject, RequestUtils.getPATCHConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteFilter(filterId: string): Promise<void> {
    const requestObject: DeleteFilterRequest = { filterId };
    try {
      const response = await personalFilterApi.deleteFilter(requestObject, RequestUtils.getDELETEConfig());
      resetFormDirty();
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }

  return {
    getPersonalFilters,
    getFilterById,
    createFilter,
    editFilter,
    deleteFilter,
  };
}
