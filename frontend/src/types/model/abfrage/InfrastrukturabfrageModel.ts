import { InfrastrukturabfrageDto } from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InfrastrukturabfrageModel extends InfrastrukturabfrageDto {}
class InfrastrukturabfrageModel {
  constructor(infrastrukturabfrage: InfrastrukturabfrageDto) {
    Object.assign(this, infrastrukturabfrage, {});
    if (!_.isNil(infrastrukturabfrage.abfrage)) {
      this.abfrage = new AbfrageModel(infrastrukturabfrage.abfrage);
    }
    this.abfragevarianten = _.toArray(infrastrukturabfrage.abfragevarianten).map(
      (abfragevariante) => new AbfragevarianteModel(abfragevariante)
    );
    this.abfragevariantenSachbearbeitung = _.toArray(infrastrukturabfrage.abfragevariantenSachbearbeitung).map(
      (abfragevariante) => new AbfragevarianteModel(abfragevariante)
    );
  }
}
export { InfrastrukturabfrageModel as default };
