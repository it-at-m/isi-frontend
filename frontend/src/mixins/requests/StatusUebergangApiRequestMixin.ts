import { TransitionDto } from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "./ErrorHandler";

@Component
export default class StatusUebergangApiRequestMixin extends Mixins(ErrorHandler) {
  async statusUebergangRequest(
    transition: TransitionDto,
    abfrageId: string | undefined,
    anmerkung: string | undefined
  ): Promise<boolean> {
    const fetchUrl =
      import.meta.env.VITE_VUE_APP_API_URL +
      `/api/isi-backend-service/infrastruktur-abfrage/${abfrageId}/${transition.url}?anmerkung=${anmerkung}`;
    return fetch(fetchUrl, RequestUtils.getPUTConfig())
      .then((response) => response.ok)
      .catch((error) => {
        this.handleError(true, error);
        return false;
      });
  }
}
