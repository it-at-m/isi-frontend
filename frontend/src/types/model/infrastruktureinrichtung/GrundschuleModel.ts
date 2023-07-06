import { GrundschuleDto } from "@/api/api-client/isi-backend";
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GrundschuleModel extends GrundschuleDto {}
class GrundschuleModel {
  constructor(grundschule: GrundschuleDto) {
    Object.assign(this, grundschule, {});
    this.schule = new SchuleModel(grundschule.schule);
    if (_.isNil(grundschule.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(grundschule.adresse);
    }
  }
}
export { GrundschuleModel as default };
