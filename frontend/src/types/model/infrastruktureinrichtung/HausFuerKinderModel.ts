import type { HausFuerKinderDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HausFuerKinderModel extends HausFuerKinderDto {}
class HausFuerKinderModel {
  constructor(hausFuerKinder: HausFuerKinderDto) {
    Object.assign(this, hausFuerKinder, {});
    if (_.isNil(hausFuerKinder.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(hausFuerKinder.adresse);
    }
  }
}
export { HausFuerKinderModel as default };
