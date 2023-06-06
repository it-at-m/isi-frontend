import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";
import { AbfragevarianteDto } from "@/api/api-client/isi-backend";

/**
 * Addiert alle Anteile eines Fördermixes zusammen und gibt die Summe zurück
 */
export function addiereAnteile(foerdermix: FoerdermixModel): number {
  if (_.isNil(foerdermix.foerderarten)) {
    return 0;
  }

  let sum = 0;
  foerdermix.foerderarten.forEach((foerderart) => {
    sum += _.isNil(foerderart.anteilProzent) ? 0 : foerderart.anteilProzent;
  });

  return sum;
}

export function anzahlVerteilterWohneinheiten(abfragevariante: AbfragevarianteDto): number {
  _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .filter((baugebiet) => !baugebiet.technical)
    .map((baugebiet) => (_.isNil(baugebiet.gesamtanzahlWe) ? 0 : baugebiet.gesamtanzahlWe));

  return sum;
}
