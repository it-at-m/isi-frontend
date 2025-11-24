export default class XsrfTokenExtractorUtil {
  /**
   *
   * Extrahiert den XSRF-Token aus den Cookies und gibt diesen als String zurück.
   *
   * @return den XSRF-Token als String.
   */
  public static getXsrfToken(): string {
    const help = document.cookie.match("(^|;)\\s*" + "XSRF-TOKEN" + "\\s*=\\s*([^;]+)");
    const csrfCookie = help ? help.pop() : "";
    if (csrfCookie === undefined) {
      return "";
    } else {
      return csrfCookie.toString();
    }
  }
}
