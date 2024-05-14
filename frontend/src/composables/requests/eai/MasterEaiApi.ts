import {
  type GetAdressenRequest,
  type AdressSucheDto,
  type MuenchenAdresseDto,
  MasterEaiApi,
} from "@/api/api-client/isi-master-eai";
import RequestUtils from "@/utils/RequestUtils";
import { useErrorHandler } from "../ErrorHandler";
import _ from "lodash";

// eslint-disable-next-line
export function useMasterEaiApi() {
  const masterEaiApi = new MasterEaiApi(RequestUtils.getBasicFetchConfigurationForMasterEai());
  const { handleError } = useErrorHandler();

  async function getAdressen(dto: AdressSucheDto, showInInformationList: boolean): Promise<MuenchenAdresseDto[]> {
    const requestObject: GetAdressenRequest = {
      adressSucheDto: dto,
    };
    try {
      const response = await masterEaiApi.getAdressen(requestObject, RequestUtils.getPOSTConfig());
      return _.isNil(response.adressen) ? [] : response.adressen;
    } catch (error) {
      throw handleError(showInInformationList, error);
    }
  }

  return { getAdressen };
}
