import { FileInformationDto, FileInfoStammApi } from "@/api/api-client/isi-backend";
import { defineStore } from "pinia";
import RequestUtils from "@/utils/RequestUtils";

interface State {
  fileInformation: FileInformationDto;
}

export const fileInfoStammStore = defineStore("fileInfoStamm", {
  state: () =>
    ({
      fileInformation: {},
    }) as State,

  getters: {
    getFileInformation: (state: State): FileInformationDto => {
      return state.fileInformation;
    },
  },

  actions: {
    initialize(): void {
      const fileInfoStammApi = new FileInfoStammApi(RequestUtils.getBasicFetchConfigurationForBackend());
      fileInfoStammApi.getFileInformation(RequestUtils.getGETConfig()).then((dto) => {
        this.setFileInformation(dto);
      });
    },
    setFileInformation(payload: FileInformationDto): void {
      this.fileInformation = payload;
    },
  },
});
