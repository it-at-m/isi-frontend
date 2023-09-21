import { AbfragevarianteDto } from "@/api/api-client/isi-backend";
import { AnzeigeContextAbfragevariante } from "@/views/Abfrage.vue";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbfragevarianteModel extends AbfragevarianteDto {}
class AbfragevarianteModel {
  constructor(abfragevariante: AbfragevarianteDto) {
    Object.assign(this, abfragevariante, {});
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
export { AbfragevarianteModel as default };
