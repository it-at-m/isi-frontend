import { TransitionDto } from "@/api/api-client/isi-backend";
import { Component, Vue } from "vue-property-decorator";
import RequestUtils from "@/utils/RequestUtils";
import Toaster from "@/components/common/toaster.type";
import { Levels } from "@/api/error";

@Component
export default class StatusUebergangApiRequestMixin extends Vue {

  async statusUebergangRequest(transition: TransitionDto, abfrageId: string | undefined): Promise<boolean> {
    let successFullRequest = false;
    const fetchUrl =
      import.meta.env.VITE_VUE_APP_API_URL +
      `/api/isi-backend-service//infrastruktur-abfrage/${abfrageId}/${transition.url}`;
    await fetch(fetchUrl, RequestUtils.getPUTConfig())
    .then((response) => {
      if(response.status == 200) {
        successFullRequest = true;
      }
    })
    .catch(() => {
      Toaster.toast(`Beim ${transition.buttonName} ist ein Fehler aufgetreten`, Levels.ERROR);
      successFullRequest = false;
    });
    return successFullRequest;
  }
}
