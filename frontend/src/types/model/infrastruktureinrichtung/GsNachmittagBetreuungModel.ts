import { GsNachmittagBetreuungDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import AdresseModel from "@/types/model/common/AdresseModel";
import { createAdresseDto } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GsNachmittagBetreuungModel extends GsNachmittagBetreuungDto {}
class GsNachmittagBetreuungModel {
  constructor(gsNachmittagBetreuung: GsNachmittagBetreuungDto) {
    Object.assign(this, gsNachmittagBetreuung, {});
    if (_.isNil(gsNachmittagBetreuung.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(gsNachmittagBetreuung.adresse);
    }
  }
}
export { GsNachmittagBetreuungModel as default };
