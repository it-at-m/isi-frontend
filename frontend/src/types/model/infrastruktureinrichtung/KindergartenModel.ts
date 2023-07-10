import { KindergartenDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KindergartenModel extends KindergartenDto {}
class KindergartenModel {
  constructor(kindergarten: KindergartenDto) {
    Object.assign(this, kindergarten, {});
    if (_.isNil(kindergarten.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(kindergarten.adresse);
    }
  }
}
export { KindergartenModel as default };
