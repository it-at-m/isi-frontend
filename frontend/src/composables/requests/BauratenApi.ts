import { BaurateApi, BaurateDto, DetermineBauratenRequest } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";
import _ from "lodash";

// eslint-disable-next-line
export function useBauratenApi() {
  const bauratenApi = new BaurateApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function determineBauraten(
    realisierungsbeginn: number,
    wohneinheiten: number | undefined,
    geschossflaecheWohnen: number | undefined,
    showInInformationList: boolean,
  ): Promise<Array<BaurateDto>> {
    const requestParameters = {
      realisierungsbeginn: realisierungsbeginn,
      wohneinheiten: _.isNil(wohneinheiten) ? undefined : wohneinheiten,
      geschossflaecheWohnen: _.isNil(geschossflaecheWohnen) ? undefined : geschossflaecheWohnen,
    } as DetermineBauratenRequest;
    try {
      const response = await bauratenApi.determineBauraten(requestParameters, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return { determineBauraten };
}
