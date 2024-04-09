import { ResponseError, TransitionDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";

// eslint-disable-next-line
export function useStatusUebergangApi() {
  const { handleError } = useErrorHandler();

  async function statusUebergangRequest(
    transition: TransitionDto,
    abfrageId: string | undefined,
    anmerkung: string | undefined,
  ): Promise<Response> {
    const fetchUrl =
      import.meta.env.VITE_VUE_APP_API_URL +
      `/api/isi-backend-service/abfrage-status/${abfrageId}/${transition.url}?anmerkung=${anmerkung}`;
    const encodedUrl = encodeURI(fetchUrl);
    try {
      const response = await fetch(encodedUrl, RequestUtils.getPUTConfig());
      if (response.ok) {
        return response;
      }
      throw new ResponseError(response, "Response returned an error code");
    } catch (error) {
      throw handleError(true, error);
    }
  }

  return { statusUebergangRequest };
}
