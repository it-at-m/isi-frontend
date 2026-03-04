import type { AbfragevarianteWeiteresVerfahrenDto } from "@/api/api-client/isi-backend";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import _ from "lodash";
import SobonBerechnungModel from "@/types/model/abfragevariante/SobonBerechnungModel";
import { createSobonBerechnungWeiteresVerfahren } from "@/utils/Factories";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteWeiteresVerfahrenModel extends AbfragevarianteWeiteresVerfahrenDto {}
class AbfragevarianteWeiteresVerfahrenModel {
  constructor(abfragevariante: AbfragevarianteWeiteresVerfahrenDto) {
    Object.assign(this, abfragevariante, {});
    this.bauabschnitte = _.toArray(abfragevariante.bauabschnitte).map(
      (bauabschnitt) => new BauabschnittModel(bauabschnitt),
    );
    if (!_.isNil(abfragevariante.sobonBerechnung)) {
      this.sobonBerechnung = new SobonBerechnungModel(abfragevariante.sobonBerechnung);
    } else {
      this.sobonBerechnung = createSobonBerechnungWeiteresVerfahren();
    }
  }
}
export { AbfragevarianteWeiteresVerfahrenModel as default };
