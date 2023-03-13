import { InfrastrukturabfrageDto } from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InfrastrukturabfrageModel extends InfrastrukturabfrageDto {}
class InfrastrukturabfrageModel {
  constructor(infrastrukturabfrage: InfrastrukturabfrageDto) {
    Object.assign(this, infrastrukturabfrage, {});
    this.abfrage = new AbfrageModel(infrastrukturabfrage.abfrage);
    if (!_.isNil(infrastrukturabfrage.abfragevarianten)) {
      for (let i = 0; i < infrastrukturabfrage.abfragevarianten.length; i++) {
        infrastrukturabfrage.abfragevarianten[i] = new AbfragevarianteModel(infrastrukturabfrage.abfragevarianten[i]);
      }
    }
  }
}
export { InfrastrukturabfrageModel as default };
