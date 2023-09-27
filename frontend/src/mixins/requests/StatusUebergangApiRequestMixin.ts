import {
  InformationResponseDto,
  InformationResponseDtoFromJSON,
  ResponseError,
  TransitionDto,
} from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "./ErrorHandler";

@Component
export default class StatusUebergangApiRequestMixin extends Mixins(ErrorHandler) {
  async statusUebergangRequest(
    transition: TransitionDto,
    abfrageId: string | undefined,
    anmerkung: string | undefined
  ): Promise<Response> {
    const fetchUrl =
      import.meta.env.VITE_VUE_APP_API_URL +
      `/api/isi-backend-service/infrastruktur-abfrage/${abfrageId}/${transition.url}?anmerkung=${anmerkung}`;
    const encodedUrl = encodeURI(fetchUrl);
    return fetch(encodedUrl, RequestUtils.getPUTConfig())
      .then(async (response) => {
        if (response.ok) {
          return response;
        }
        throw new ResponseError(response, "Response returned an error code");
      })
      .catch((error: Error) => {
        throw this.handleError(true, error);
      });
  }
}
