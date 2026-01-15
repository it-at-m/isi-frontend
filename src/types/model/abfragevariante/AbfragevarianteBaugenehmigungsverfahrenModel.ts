import type { AbfragevarianteBaugenehmigungsverfahrenDto } from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
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

  public getAbfragevariantenNrForContextAnzeigeAbfragevariante(
    contextAnzeigeAbfragevariante: AnzeigeContextAbfragevariante,
  ): string {
    let numberContext = "";
    if (contextAnzeigeAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
      numberContext = `1.${this.abfragevariantenNr}`;
    } else if (contextAnzeigeAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
      numberContext = `2.${this.abfragevariantenNr}`;
    }
    return numberContext;
  }
}
export { AbfragevarianteBaugenehmigungsverfahrenModel as default };
