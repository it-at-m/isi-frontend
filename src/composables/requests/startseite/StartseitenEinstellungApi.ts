import type { StartseitenEinstellungDto, SaveStartseitenEinstellungRequest } from "@/api/api-client/isi-backend";
import { StartseitenEinstellungApi } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { toBackendJson } from "@/utils/SerializationUtils";
import { useErrorHandler } from "../ErrorHandler";

export function useStartseitenEinstellungApi() {
  const startseitenEinstellungApi = new StartseitenEinstellungApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function getStartseitenEinstellung(): Promise<StartseitenEinstellungDto> {
    try {
      return await startseitenEinstellungApi.getStartseitenEinstellung(RequestUtils.getGETConfig());
    } catch (error) {
      throw handleError(error);
    }
  }

  async function saveStartseitenEinstellung(
    startseitenEinstellungDto: StartseitenEinstellungDto,
  ): Promise<StartseitenEinstellungDto> {
    const requestObject: SaveStartseitenEinstellungRequest = {
      startseitenEinstellungDto: toBackendJson(startseitenEinstellungDto) as unknown as StartseitenEinstellungDto,
    };
    try {
      return await startseitenEinstellungApi.saveStartseitenEinstellung(requestObject, RequestUtils.getPUTConfig());
    } catch (error) {
      throw handleError(error);
    }
  }

  return { getStartseitenEinstellung, saveStartseitenEinstellung };
}
