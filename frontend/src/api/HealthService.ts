import HealthState from "@/types/HealthState";
import RequestUtils from "@/utils/RequestUtils";

export default class HealthService {
  
  private static base: string = import.meta.env.VITE_VUE_APP_API_URL + '/actuator/health';
  
  static checkHealth(): Promise<HealthState> {
    return fetch(this.base, RequestUtils.getGETConfig())
      .then(response => {
        return response.json();
      });
  }
  
}
