import { AbfrageDto } from "@/api/api-client/isi-backend";
import { createAdresseDto, createVerortungDto } from "@/utils/Factories";
import AdresseModel from "@/types/model/common/AdresseModel";
import _ from "lodash";
import VerortungModel from "@/types/model/common/VerortungModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfrageModel extends AbfrageDto {}
class AbfrageModel {
  constructor(abfrage: AbfrageDto) {
    Object.assign(this, abfrage, {});
    if (_.isNil(abfrage.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(abfrage.adresse);
    }
    if (_.isNil(abfrage.verortung)) {
      this.verortung = new VerortungModel(createVerortungDto());
    } else {
      this.verortung = new VerortungModel(abfrage.verortung);
    }
  }
}
export { AbfrageModel as default };
