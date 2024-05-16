import type { InformationResponseDto } from "@/api/api-client/isi-backend";
import { defineStore } from "pinia";
import _ from "lodash";

interface State {
  informationList: InformationResponseDto[];
}

export const useInformationStore = defineStore("information", {
  state: () =>
    ({
      informationList: [],
    }) as State,
  getters: {},
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
