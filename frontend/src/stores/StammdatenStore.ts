import { defineStore } from "pinia";
import {
  FileInfoStammApi,
  FileInformationDto,
  FoerdermixStammApi,
  FoerdermixStammDto,
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
    initializeFoerdermixStamm(): void {
      const foerdermixStammApi = new FoerdermixStammApi(RequestUtils.getBasicFetchConfigurationForBackend());
      foerdermixStammApi.getFoerdermixStaemme(RequestUtils.getGETConfig()).then((foerdermixStammdatenDto) => {
        this.setFoerdermixStammdaten(foerdermixStammdatenDto);
      });
    },
    initializeFileStamm(): void {
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
