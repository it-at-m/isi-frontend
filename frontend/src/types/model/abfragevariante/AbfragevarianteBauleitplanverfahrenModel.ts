import { AbfragevarianteBauleitplanverfahrenDto } from "@/api/api-client/isi-backend";
import AnzeigeContextAbfragevariante from "@/views/Abfrage.vue";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteBauleitplanverfahrenModel extends AbfragevarianteBauleitplanverfahrenDto {}
class AbfragevarianteBauleitplanverfahrenModel {
  constructor(abfragevariante: AbfragevarianteBauleitplanverfahrenDto) {
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
export { AbfragevarianteBauleitplanverfahrenModel as default };
