import { BauleitplanverfahrenDto } from "@/api/api-client/isi-backend";
import AdresseModel from "@/types/model/common/AdresseModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { createAdresseDto } from "@/utils/Factories";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BauleitplanverfahrenModel extends BauleitplanverfahrenDto {}
class BauleitplanverfahrenModel {
  constructor(bauleitplanverfahren: BauleitplanverfahrenDto) {
    Object.assign(this, bauleitplanverfahren, {});
    if (_.isNil(this.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(this.adresse);
    }
    this.abfragevarianten = _.toArray(bauleitplanverfahren.abfragevarianten).map(
      (abfragevariante) => new AbfragevarianteBauleitplanverfahrenModel(abfragevariante),
    );
    this.abfragevariantenSachbearbeitung = _.toArray(bauleitplanverfahren.abfragevariantenSachbearbeitung).map(
      (abfragevariante) => new AbfragevarianteBauleitplanverfahrenModel(abfragevariante),
    );
  }
}
export { BauleitplanverfahrenModel as default };
