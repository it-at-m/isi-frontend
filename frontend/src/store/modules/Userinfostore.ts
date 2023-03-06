import { Userinfo } from "@/types/common/Userinfo";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

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
