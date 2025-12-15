import { type TransitionDto, ResponseError } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "./ErrorHandler";

const base = (import.meta.env.VITE_VUE_APP_API_URL ?? "").trim();

// eslint-disable-next-line
export function useStatusUebergangApi() {
  const { handleError } = useErrorHandler();
  async function statusUebergangRequest(
    transition: TransitionDto,
    abfrageId: string | undefined,
    anmerkung: string | undefined,
  ): Promise<Response> {
    const fetchUrl = base
      ? `${base.replace(/\/+$/, "")}/api/isi-backend-service/abfrage-status/${abfrageId}/${transition.url}?anmerkung=${anmerkung}`
      : `/api/isi-backend-service/abfrage-status/${abfrageId}/${transition.url}?anmerkung=${anmerkung}`;
    const encodedUrl = encodeURI(fetchUrl);
    try {
      const response = await fetch(encodedUrl, RequestUtils.getPUTConfig());
      if (response.ok) {
        return response;
      }
      throw new ResponseError(response, "Response returned an error code");
    } catch (error) {
      throw handleError(error);
    }
  }

  return { statusUebergangRequest };
}
