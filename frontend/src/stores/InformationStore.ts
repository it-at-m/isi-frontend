import { InformationResponseDto } from "@/api/api-client/isi-backend";
import { defineStore } from "pinia";
import { InformationState } from "@/store/modules/InformationStore";
import _ from "lodash";

interface State {
  informationList: InformationResponseDto[];
}

export const informationStore = defineStore("information", {
  state: () =>
    ({
      informationList: [],
    }) as State,
  getters: {
    getInformationList: (state: InformationState): Array<InformationResponseDto> => {
      return state.informationList;
    },
  },
  actions: {
    addInformation(payload: InformationResponseDto): void {
      this.informationList.unshift(payload);
    },
    overwriteInformationList(payload: Array<InformationResponseDto>): void {
      if (_.isNil(payload)) {
        this.informationList = [];
      } else {
        this.informationList = payload;
      }
    },
  },
});
