import { TransitionDto } from "@/api/api-client/isi-backend";
import { Component, Mixins } from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import ErrorHandler from "./ErrorHandler";

@Component
export default class StatusUebergangApiRequestMixin extends Mixins(ErrorHandler) {
  async statusUebergangRequest(transition: TransitionDto, abfrageId: string | undefined): Promise<boolean> {
    let successFullRequest = false;
    const fetchUrl =
      import.meta.env.VITE_VUE_APP_API_URL +
      `/api/isi-backend-service/infrastruktur-abfrage/${abfrageId}/${transition.url}`;
    await fetch(fetchUrl, RequestUtils.getPUTConfig())
      .then((response) => {
        if (response.ok) {
          successFullRequest = true;
        }
      })
      .catch((error) => {
        this.handleError(true, error);
        successFullRequest = false;
      });
    return successFullRequest;
  }
}
