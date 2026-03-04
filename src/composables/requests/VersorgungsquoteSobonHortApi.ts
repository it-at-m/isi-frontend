import { VersorgungsquoteApi, VersorgungsquoteSobonHortDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "@/composables/requests/ErrorHandler";

export function useVersorgungsquoteSobonHortApi() {
  const versorgungsquoteSobonHortDtoApi = new VersorgungsquoteApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function getVersorungsquoteHortSobon(): Promise<VersorgungsquoteSobonHortDto[]> {
    try {
      return await versorgungsquoteSobonHortDtoApi.getVersorungsquoteSobonHort();
    } catch (error) {
      throw handleError(error);
    }
  }

  return { getVersorungsquoteHortSobon };
}
