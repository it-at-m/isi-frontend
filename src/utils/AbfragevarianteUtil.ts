import { AnzeigeContextAbfragevariante } from "@/types/common/Abfrage";
import AnyAbfragevarianteModel from "@/types/common/Abfrage";

export function getAbfragevariantenNrForContextAnzeigeAbfragevariante(
  abfragevarianteModel: AnyAbfragevarianteModel,
  contextAnzeigeAbfragevariante: AnzeigeContextAbfragevariante,
): string {
  let numberContext = "";
  if (contextAnzeigeAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE) {
    numberContext = `1.${abfragevarianteModel.abfragevariantenNr}`;
  } else if (contextAnzeigeAbfragevariante === AnzeigeContextAbfragevariante.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
    numberContext = `2.${abfragevarianteModel.abfragevariantenNr}`;
  }
  return numberContext;
}
