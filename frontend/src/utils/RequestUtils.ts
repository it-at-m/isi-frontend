import {Configuration, ConfigurationParameters} from "@/api/api-client";
import XsrfTokenExtractorUtil from "@/utils/XsrfTokenExtractorUtil";


export default class RequestUtils {
  
  public static getBaseUrl(): string {
    return import.meta.env.VITE_VUE_APP_API_URL + "/api/isi-backend-service";
  }
  
  public static getBasicFetchConfiguration(): Configuration {
    const configuration: ConfigurationParameters = {
      basePath: this.getBaseUrl(),
    };
    return new Configuration(configuration);
  }
  
  /**
   * Liefert eine default GET-Config für fetch
   */
  public static getGETConfig(): RequestInit {
    const headers: Headers = this.getHeaders();
    return {
      headers: headers,
      mode: 'cors',
      credentials: 'same-origin',
      redirect: 'manual'
    };
  }
  
  /**
   * Liefert eine default POST-Config für fetch
   * @param body zu übertragender Body
   */
  public static getPOSTConfig(): RequestInit {
    const headers: Headers = this.getHeaders();
    return {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      credentials: 'same-origin',
      redirect: "manual"
    };
  }
  
  /**
   * Liefert eine default PUT-Config für fetch
   * In dieser wird, wenn vorhanden, die Version der zu aktualisierenden Entität
   * als "If-Match"-Header mitgesetzt.
   * @param body zu übertragender Body
   */
  public static getPUTConfig(): RequestInit {
    const headers = this.getHeaders();
    return {
      method: 'PUT',
      headers: headers,
      mode: 'cors',
      credentials: 'same-origin',
      redirect: "manual"
    };
  }
  
  /**
   * Liefert eine default PATCH-Config für fetch
   * In dieser wird, wenn vorhanden, die Version der zu aktualisierenden Entität
   * als "If-Match"-Header mitgesetzt.
   *
   * @param body zu übertragender Body
   */
  public static getPATCHConfig(): RequestInit {
    const headers: Headers = this.getHeaders();
    return {
      method: 'PATCH',
      headers: headers,
      mode: 'cors',
      credentials: 'same-origin',
      redirect: "manual"
    };
  }
  
  /**
   * Liefert eine default DELETE-Config für fetch
   */
  public static getDELETEConfig(): RequestInit {
    const headers: Headers = this.getHeaders();
    return {
      method: 'DELETE',
      headers: headers,
      mode: 'cors',
      credentials: 'same-origin',
      redirect: "manual"
    };
  }
  
  /**
   *  Baut den Header fuer den Request auf
   * @returns {Headers}
   */
  public static getHeaders(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept-Language': 'de-DE',
      'X-XSRF-TOKEN': XsrfTokenExtractorUtil.getXsrfToken()
        .toString()
    });
    return headers;
  }
  
}
