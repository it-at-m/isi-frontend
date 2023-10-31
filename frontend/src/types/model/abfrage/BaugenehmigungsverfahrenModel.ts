import { BaugenehmigungsverfahrenDto } from "@/api/api-client/isi-backend";
import AdresseModel from "@/types/model/common/AdresseModel";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import { createAdresseDto } from "@/utils/Factories";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaugenehmigungsverfahrenModel extends BaugenehmigungsverfahrenDto {}
class BaugenehmigungsverfahrenModel {
  constructor(baugenehmigungsverfahren: BaugenehmigungsverfahrenDto) {
    Object.assign(this, baugenehmigungsverfahren, {});
    if (_.isNil(this.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(this.adresse);
    }
    this.abfragevarianten = _.toArray(baugenehmigungsverfahren.abfragevarianten).map(
      (abfragevariante) => new AbfragevarianteBaugenehmigungsverfahrenModel(abfragevariante),
    );
    this.abfragevariantenSachbearbeitung = _.toArray(baugenehmigungsverfahren.abfragevariantenSachbearbeitung).map(
      (abfragevariante) => new AbfragevarianteBaugenehmigungsverfahrenModel(abfragevariante),
    );
  }
}
export { BaugenehmigungsverfahrenModel as default };
