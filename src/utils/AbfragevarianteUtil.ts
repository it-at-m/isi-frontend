import { AnzeigeContextAbfragevariante, type AnyAbfragevarianteModel } from "@/types/common/Abfrage";

export const helpTextSoBoNUrsaechlich: string =
  "Es handelt sich um die Geschossfläche neugeschaffenen Wohnbaurechts, die durch den Bebauungsplan entsteht. Bestandswohnbaurecht und anders genutzte Flächen werden nicht eingerechnet (z.B. 10% der Geschossfläche in WA-Gebieten, 40-60% in MI,...)";
export const helpTextBestandwohnbaurecht: string =
  "Es handelt sich um Wohnbaurecht, welches schon auf der Fläche besteht. Sollte Ihnen die schon genehmigte Fläche an Wohnbaurecht bekannt sein, tragen Sie diese bitte ein.";
export const helpTextSonderwohnform: string =
  "Sonderwohnformen werden in Bebauungsplänen nicht festgesetzt. Sollten Ihnen Informationen von Investoren zu besonderen Wohnformen vorliegen, tragen Sie diese bitte trotzdem ein.";
export const helpTextGesamtflaecheWohnen: string =
  "Es handelt sich um die gesamte geplante Geschossfläche <b>Wohnen</b> angelehnt an den städtebaulichen Kennwert, nicht um die gesamte geplante Geschossfläche (z.B. Gewerbeflächen).";
export const helpTextSoBoNUrsaechlicheVersorgungsquoteHort: string =
  "&bull; 55% Versorgungsquote: nur wenn zwischen 27.11.2022 und 27.11.2025 ein förmlicher Verfahrensschritt stattgefunden hat.<br>&bull; 90% Versorgungsquote: bei Verfahren, die nach dem 27.11.2025 begonnen haben oder zwischen 27.11.2022 und 27.11.2025 <u>keinen</u> Verfahrensschritt hatten.";

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
