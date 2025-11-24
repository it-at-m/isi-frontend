import { defineStore } from "pinia";
import {
  type FileInformationDto,
  type FoerdermixStammDto,
  FileInfoStammApi,
  FoerdermixStammApi,
} from "@/api/api-client/isi-backend";
import RequestUtils from "@/utils/RequestUtils";

interface State {
  foerdermixStammdaten: FoerdermixStammDto[];
  fileInformation: FileInformationDto;
}

export const useStammdatenStore = defineStore("stammdaten", {
  state: () =>
    ({
      foerdermixStammdaten: [],
      fileInformation: {},
    }) as State,
  getters: {},
  actions: {
    setFoerdermixStammdaten(payload: FoerdermixStammDto[]) {
      this.foerdermixStammdaten = payload;
    },
    async initializeFoerdermixStamm(): Promise<void> {
      const foerdermixStammApi = new FoerdermixStammApi(RequestUtils.getBasicFetchConfigurationForBackend());
      await foerdermixStammApi.getFoerdermixStaemme(RequestUtils.getGETConfig()).then((foerdermixStammdatenDto) => {
        this.setFoerdermixStammdaten(foerdermixStammdatenDto);
      });
    },
    async initializeFileStamm(): Promise<void> {
      const fileInfoStammApi = new FileInfoStammApi(RequestUtils.getBasicFetchConfigurationForBackend());
      await fileInfoStammApi.getFileInformation(RequestUtils.getGETConfig()).then((dto) => {
        this.setFileInformation(dto);
      });
    },
    setFileInformation(payload: FileInformationDto): void {
      this.fileInformation = payload;
    },
  },
});
