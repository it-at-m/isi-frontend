import { AnzeigeContextAbfragevariante, type AnyAbfragevarianteModel } from "@/types/common/Abfrage";
import _ from "lodash";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";

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

export function existsBauraten(bauabschnitte: BauabschnittModel[]): boolean {
  return (
    bauabschnitte?.some((bauabschnitt) =>
      bauabschnitt.baugebiete?.some((baugebiet) => !_.isEmpty(baugebiet.bauraten)),
    ) ?? false
  );
}

export function deleteBauraten(bauabschnitte: BauabschnittModel[]): void {
  bauabschnitte?.forEach((bauabschnitt) => {
    bauabschnitt.baugebiete.forEach((baugebiet) => {
      baugebiet.bauraten = [];
    });
  });
}
