import { type Wgs84Dto, type UtmDto, type Wgs84toUtm32Request, KoordinatenApi } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";

// eslint-disable-next-line
export function useKoordinatenApi() {
  const koordinatenApi = new KoordinatenApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function wgs84toUtm32(dto: Wgs84Dto, showInInformationList: boolean): Promise<UtmDto> {
    const requestObject: Wgs84toUtm32Request = {
      wgs84Dto: dto,
    };
    try {
      const response = await koordinatenApi.wgs84toUtm32(requestObject, RequestUtils.getPOSTConfig());
      return response;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return { wgs84toUtm32 };
}
