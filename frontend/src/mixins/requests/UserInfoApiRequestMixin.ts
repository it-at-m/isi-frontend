import RequestUtils from "@/utils/RequestUtils";
import { Component, Mixins } from "vue-property-decorator";
import ErrorHandler from "./ErrorHandler";
import { Userinfo } from "@/types/common/Userinfo";
import Toaster from "@/components/common/toaster.type";
import { Levels } from "@/api/error";
import { UserInfo } from "os";

@Component
export default class UserInfoApiRequestMixin extends Mixins(ErrorHandler) {
  async getUserinfo(): Promise<Userinfo> {
    const fetchServicesUrl = import.meta.env.VITE_VUE_APP_API_URL + "/api/sso/userinfo";
    let userinfo = new Userinfo();
    await fetch(fetchServicesUrl, RequestUtils.getGETConfig())
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        userinfo = this.mapJson(json);
      })
      .catch(() => {
        // Wenn die Nutzerinformationen nicht geladen werden können geben wir einen Testnutzer zurück
        Toaster.toast(`Nutzerinformationen konnten nicht geladen werden`, Levels.ERROR);
        userinfo.givenname = "Max";
        userinfo.surname = "Mustermann";
        userinfo.department = "Abteilung";
        userinfo.email = "test@muenchen.de";
        userinfo.roles = ["Test-Rolle"];
      });

    return userinfo;
  }

  private mapJson(json: any): Userinfo {
    const userinfo: Userinfo = new Userinfo();
    userinfo.surname = this.isNotUndefinedOrNull(json.surname) ? json.surname : undefined;
    userinfo.givenname = this.isNotUndefinedOrNull(json.givenname) ? json.givenname : undefined;
    userinfo.email = this.isNotUndefinedOrNull(json.email) ? json.email : undefined;
    userinfo.department = this.isNotUndefinedOrNull(json.department) ? json.department : undefined;
    userinfo.roles = this.isNotUndefinedOrNull(json.resource_access.isi.roles)
      ? json.resource_access.isi.roles
      : undefined;
    return userinfo;
  }

  private isNotUndefinedOrNull(value: string): boolean {
    return value !== null && value !== undefined;
  }
}
