import type { WeiteresVerfahrenDto } from "@/api/api-client/isi-backend";
import AdresseModel from "@/types/model/common/AdresseModel";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import { createAdresseDto } from "@/utils/Factories";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WeiteresVerfahrenModel extends WeiteresVerfahrenDto {}
class WeiteresVerfahrenModel {
  constructor(weiteresVerfahren: WeiteresVerfahrenDto) {
    Object.assign(this, weiteresVerfahren, {});
    if (_.isNil(this.adresse)) {
      this.adresse = new AdresseModel(createAdresseDto());
    } else {
      this.adresse = new AdresseModel(this.adresse);
    }
    this.abfragevariantenWeiteresVerfahren = _.toArray(weiteresVerfahren.abfragevariantenWeiteresVerfahren).map(
      (abfragevariante) => new AbfragevarianteWeiteresVerfahrenModel(abfragevariante),
    );
    this.abfragevariantenSachbearbeitungWeiteresVerfahren = _.toArray(
      weiteresVerfahren.abfragevariantenSachbearbeitungWeiteresVerfahren,
    ).map((abfragevariante) => new AbfragevarianteWeiteresVerfahrenModel(abfragevariante));
  }
}
export { WeiteresVerfahrenModel as default };
