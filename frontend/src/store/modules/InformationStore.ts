import { InformationResponseDto } from "@/api/api-client";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";
import _ from "lodash";

const state = {
  informationList: [] as Array<InformationResponseDto>
};

export type InformationState = typeof state;

export default {
  namespaced: true,
  
  state,

  getters: {
    informationList: (state: InformationState): Array<InformationResponseDto> => {
      return state.informationList;
    }
  },

  mutations: {
    addInformation(state: InformationState, value: InformationResponseDto): void {
      state.informationList.unshift(value);
    },
    overwriteInformationList(state: InformationState, value: Array<InformationResponseDto>): void {
      if (_.isNil(value)) {
        state.informationList = [];
      } else {
        state.informationList = value;
      }
    }
  },

  actions: {
    addInformation(context: ActionContext<InformationState, RootState>, value: InformationResponseDto): void {
      context.commit("addInformation", value);
    },
    overwriteInformationList(context: ActionContext<InformationState, RootState>, value: Array<InformationResponseDto>): void {
      context.commit("overwriteInformationList", value);
    }
  }
};
