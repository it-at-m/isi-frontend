import type { NachbarschaftstreffDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NachbarschaftstreffModel extends NachbarschaftstreffDto {}
class NachbarschaftstreffModel {
  constructor(nachbarschaftstreff: NachbarschaftstreffDto) {
    Object.assign(this, nachbarschaftstreff, {});
    if (_.isNil(nachbarschaftstreff.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(nachbarschaftstreff.adresse);
    }
  }
}
export { NachbarschaftstreffModel as default };
