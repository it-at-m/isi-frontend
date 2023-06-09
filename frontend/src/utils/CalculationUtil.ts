import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";
import { AbfragevarianteDto, BaugebietDto, BaurateDto } from "@/api/api-client/isi-backend";

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

export function anzahlUeberBaugebieteVerteilteWohneinheiten(abfragevariante: AbfragevarianteDto): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .map((baugebiet) => (_.isNil(baugebiet.gesamtanzahlWe) ? 0 : baugebiet.gesamtanzahlWe));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteWohneinheitenForAbfragevariante(
  abfragevariante: AbfragevarianteDto
): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
    .map((baurate) => (_.isNil(baurate.anzahlWeGeplant) ? 0 : baurate.anzahlWeGeplant));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteWohneinheitenForBaugebiet(baugebiet: BaugebietDto): number {
  const sumWohneinheiten = _.toArray(baugebiet.bauraten).map((baurate) =>
    _.isNil(baurate.anzahlWeGeplant) ? 0 : baurate.anzahlWeGeplant
  );
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBaugebieteVerteilteGeschossflaecheWohnen(abfragevariante: AbfragevarianteDto): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .map((baugebiet) => (_.isNil(baugebiet.geschossflaecheWohnen) ? 0 : baugebiet.geschossflaecheWohnen));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteGeschossflaecheWohnenForAbfragevariante(
  abfragevariante: AbfragevarianteDto
): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
    .map((baurate) => (_.isNil(baurate.geschossflaecheWohnenGeplant) ? 0 : baurate.geschossflaecheWohnenGeplant));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteGeschossflaecheWohnenForBaugebiet(baugebiet: BaugebietDto): number {
  const sumWohneinheiten = _.toArray(baugebiet.bauraten).map((baurate) =>
    _.isNil(baurate.geschossflaecheWohnenGeplant) ? 0 : baurate.geschossflaecheWohnenGeplant
  );
  return _.sum(sumWohneinheiten);
}

export function numberToFormattedStringTwoDecimals(number: number): string {
  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
}

export function numberToFormattedStringZeroDecimals(number: number): string {
  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(number);
}

export function getNonTechnicalBaugebiete(abfragevariante: AbfragevarianteDto): Array<BaugebietDto> {
  return _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .filter((baugebiet) => !baugebiet.technical);
}

export function getBauratenFromAllTechnicalBaugebiete(abfragevariante: AbfragevarianteDto): Array<BaurateDto> {
  return _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .filter((baugebiet) => baugebiet.technical)
    .flatMap((baugebiet) => _.toArray(baugebiet.bauraten));
}
