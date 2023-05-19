import { Userinfo } from "@/types/common/Userinfo";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import _ from "lodash";

const state = {
  userinfo: undefined as Userinfo | undefined,
};

export type UserinfoState = typeof state;

export default {
  namespaced: true,

  state,

  getters: {
    userinfo: (state: UserinfoState): Userinfo | undefined => {
      return state.userinfo;
    },
    hasRoleAdmin: (state: UserinfoState): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("admin")
        : false;
    },

    hasRoleAbfrageerstellung: (state: UserinfoState): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("abfrageerstellung")
        : false;
    },

    hasRoleSachbearbeitung: (state: UserinfoState): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("sachbearbeitung")
        : false;
    },

    hasRoleBedarfsmeldung: (state: UserinfoState): boolean => {
      return !_.isNil(state.userinfo) && !_.isNil(state.userinfo.roles)
        ? state.userinfo?.roles?.includes("bedarfsmeldung")
        : false;
    },
  },

  mutations: {
    userinfo(state: UserinfoState, value: Userinfo): void {
      state.userinfo = value;
    },
  },

  actions: {
    userinfo(context: ActionContext<UserinfoState, RootState>, value: Userinfo): void {
      context.commit("userinfo", value);
    },
  },
};
