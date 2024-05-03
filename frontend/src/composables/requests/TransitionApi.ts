import { AbfrageStatusApi, TransitionDto, TransitionsAbfrageRequest } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";

// eslint-disable-next-line
export function useTransitionApi() {
  const abfrageStatusApi = new AbfrageStatusApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function getTransitions(uuid: string, showInInformationList: boolean): Promise<TransitionDto[]> {
    const requestObject: TransitionsAbfrageRequest = {
      id: uuid,
    };
    try {
      const response = await abfrageStatusApi.transitionsAbfrage(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return { getTransitions };
}
