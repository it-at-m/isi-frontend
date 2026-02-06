import { type GetLayerRequest, MapApi } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "../ErrorHandler";
import _ from "lodash";

// eslint-disable-next-line
export function useMapGeodataEaiApi() {
  const mapGeodataEaiApi = new MapApi(RequestUtils.getBasicFetchConfigurationForBackend());
  const { handleError } = useErrorHandler();

  async function getLayer(url: string): Promise<string> {
    const requestObject: GetLayerRequest = {
      urlLayer = url,
    };
    try {
      const response = await mapGeodataEaiApi.getLayer(requestObject, RequestUtils.getGETConfig());
      return response;
    } catch (error) {
      throw handleError(error);
    }
  }
  return {
    getLayer,
  };
}
