import { FileInfoStammApi, FileInformationDto } from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";
import { ActionContext } from "vuex/types/index";
import { RootState } from "..";

const state = {
  fileInformation: {} as FileInformationDto
};

export type FileInfoStammState = typeof state;

export default {
  namespaced: true,
  
  state,

  getters: {
    fileInformation: (state: FileInfoStammState): FileInformationDto => {
      return state.fileInformation;
    }
  },

  mutations: {
    fileInformation(state: FileInfoStammState, dto: FileInformationDto): void {
      state.fileInformation = dto;
    }
  },

  actions: {
    initialize(context: ActionContext<FileInfoStammState, RootState>): void {
      const fileInfoStammApi = new FileInfoStammApi(RequestUtils.getBasicFetchConfiguration());
      fileInfoStammApi.getFileInformation(RequestUtils.getGETConfig()).then(dto => {
        context.commit("fileInformation", dto);
      });
    },
    allowedFileExtensions(context: ActionContext<FileInfoStammState, RootState>, dto: FileInformationDto[]): void {
      context.commit("fileInformation", dto);
    }
  }
};

