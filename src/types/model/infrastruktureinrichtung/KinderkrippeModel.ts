import type { KinderkrippeDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KinderkrippeModel extends KinderkrippeDto {}
class KinderkrippeModel {
  constructor(kinderkrippe: KinderkrippeDto) {
    Object.assign(this, kinderkrippe, {});
    if (_.isNil(kinderkrippe.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(kinderkrippe.adresse);
    }
  }
}
export { KinderkrippeModel as default };
