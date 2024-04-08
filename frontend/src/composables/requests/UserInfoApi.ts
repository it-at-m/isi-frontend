import RequestUtils from "@/utils/RequestUtils";
import { Userinfo } from "@/types/common/Userinfo";
import Toaster from "@/components/common/toaster.type";
import { Levels } from "@/api/error";
import _ from "lodash";

// eslint-disable-next-line
export function useUserInfoApi() {
  async function getUserinfo(): Promise<Userinfo> {
    const fetchServicesUrl = import.meta.env.VITE_VUE_APP_API_URL + "/api/sso/userinfo";
    let userinfo = new Userinfo();

    try {
      const response = await fetch(fetchServicesUrl, RequestUtils.getGETConfig());
      const json = await response.json();
      userinfo = mapJson(json);
    } catch {
      // Wenn die Nutzerinformationen nicht geladen werden können wird ein leeres Nutzerobjekt zurückgegeben.
      Toaster.toast(`Die Nutzerinformationen konnten nicht geladen werden.`, Levels.ERROR);
      userinfo.givenname = "";
      userinfo.surname = "";
      userinfo.department = "";
      userinfo.email = "";
      userinfo.roles = [""];
    }

    return userinfo;
  }

  // eslint-disable-next-line
  function mapJson(json: any): Userinfo {
    const userinfo: Userinfo = new Userinfo();
    userinfo.surname = !_.isNil(json.surname) ? json.surname : undefined;
    userinfo.givenname = !_.isNil(json.givenname) ? json.givenname : undefined;
    userinfo.email = !_.isNil(json.email) ? json.email : undefined;
    userinfo.department = !_.isNil(json.department) ? json.department : undefined;
    userinfo.roles = !_.isNil(json.resource_access.isi.roles) ? json.resource_access.isi.roles : undefined;
    return userinfo;
  }

  return { getUserinfo };
}
