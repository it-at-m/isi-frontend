import { defineStore } from "pinia";
import { Userinfo } from "@/types/common/Userinfo";
import _ from "lodash";

interface State {
  userinfo: Userinfo | undefined;
}

export const useUserinfoStore = defineStore("userinfo", {
  state: () =>
    ({
      userinfo: undefined,
    }) as State,
  getters: {
    hasRoleAdmin: (state: State): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("admin")
        : false;
    },
    hasRoleAbfrageerstellung: (state: State): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("abfrageerstellung")
        : false;
    },
    hasRoleSachbearbeitung: (state: State): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("sachbearbeitung")
        : false;
    },
    hasRoleBedarfsmeldung: (state: State): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("bedarfsmeldung")
        : false;
    },
    hasOnlyRoleAnwender: (state: State): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.every((rolle) => rolle === "anwender")
        : false;
    },
  },
  actions: {
    setUserinfo(payload: Userinfo): void {
      this.userinfo = payload;
    },
  },
});
