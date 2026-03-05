import type { AbfragevarianteBaugenehmigungsverfahrenDto } from "@/api/api-client/isi-backend";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteBaugenehmigungsverfahrenModel extends AbfragevarianteBaugenehmigungsverfahrenDto {}
class AbfragevarianteBaugenehmigungsverfahrenModel {
  constructor(abfragevariante: AbfragevarianteBaugenehmigungsverfahrenDto) {
    Object.assign(this, abfragevariante, {});
    this.bauabschnitte = _.toArray(abfragevariante.bauabschnitte).map(
      (bauabschnitt) => new BauabschnittModel(bauabschnitt),
    );
  }
}
export { AbfragevarianteBaugenehmigungsverfahrenModel as default };
