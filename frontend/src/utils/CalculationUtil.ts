import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import _ from "lodash";
import { AbfragevarianteBauleitplanverfahrenDto, BaugebietDto, BaurateDto } from "@/api/api-client/isi-backend";

export function countDecimals(numberToCount: number): number {
  return numberToCount % 1 ? numberToCount.toString().split(".")[1].length : 0;
}

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

export function anzahlUeberBaugebieteVerteilteWohneinheiten(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto,
): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .map((baugebiet) => (_.isNil(baugebiet.weGeplant) ? 0 : baugebiet.weGeplant));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteWohneinheitenForAbfragevariante(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto,
): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
    .map((baurate) => (_.isNil(baurate.weGeplant) ? 0 : baurate.weGeplant));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteWohneinheitenForBaugebiet(baugebiet: BaugebietDto): number {
  const sumWohneinheiten = _.toArray(baugebiet.bauraten).map((baurate) =>
    _.isNil(baurate.weGeplant) ? 0 : baurate.weGeplant,
  );
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBaugebieteVerteilteGeschossflaecheWohnen(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto,
): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .map((baugebiet) => (_.isNil(baugebiet.gfWohnenGeplant) ? 0 : baugebiet.gfWohnenGeplant));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteGeschossflaecheWohnenForAbfragevariante(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto,
): number {
  const sumWohneinheiten = _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
    .map((baurate) => (_.isNil(baurate.gfWohnenGeplant) ? 0 : baurate.gfWohnenGeplant));
  return _.sum(sumWohneinheiten);
}

export function anzahlUeberBauratenVerteilteGeschossflaecheWohnenForBaugebiet(baugebiet: BaugebietDto): number {
  const sumWohneinheiten = _.toArray(baugebiet.bauraten).map((baurate) =>
    _.isNil(baurate.gfWohnenGeplant) ? 0 : baurate.gfWohnenGeplant,
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

export function getNonTechnicalBaugebiete(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto,
): Array<BaugebietDto> {
  return _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .filter((baugebiet) => !baugebiet.technical);
}

export function getBauratenFromAllTechnicalBaugebiete(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto,
): Array<BaurateDto> {
  return _.toArray(abfragevariante.bauabschnitte)
    .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
    .filter((baugebiet) => baugebiet.technical)
    .flatMap((baugebiet) => _.toArray(baugebiet.bauraten));
}

export function wohneinheiten(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  let value: number;
  if (baugebiet?.technical) {
    value = !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.weGesamt) ? abfragevariante.weGesamt : 0;
  } else {
    value = !_.isNil(baugebiet) && !_.isNil(baugebiet?.weGeplant) ? baugebiet.weGeplant : 0;
  }
  return value;
}

export function wohneinheitenFormatted(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = wohneinheiten(baugebiet, abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function verteilteWohneinheiten(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  let value: number;
  if (baugebiet?.technical) {
    value = _.isNil(abfragevariante) ? 0 : anzahlUeberBauratenVerteilteWohneinheitenForAbfragevariante(abfragevariante);
  } else {
    value = _.isNil(baugebiet) ? 0 : anzahlUeberBauratenVerteilteWohneinheitenForBaugebiet(baugebiet);
  }
  return value;
}

export function verteilteWohneinheitenFormatted(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = verteilteWohneinheiten(baugebiet, abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function geschossflaecheWohnen(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  let value: number;
  if (baugebiet?.technical) {
    value = !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.gfWohnenGesamt) ? abfragevariante.gfWohnenGesamt : 0;
  } else {
    value = !_.isNil(baugebiet) && !_.isNil(baugebiet?.gfWohnenGeplant) ? baugebiet.gfWohnenGeplant : 0;
  }
  return value;
}

export function geschossflaecheWohnenFormatted(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = geschossflaecheWohnen(baugebiet, abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}

export function verteilteGeschossflaecheWohnen(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  let value: number;
  if (baugebiet?.technical) {
    value = _.isNil(abfragevariante)
      ? 0
      : anzahlUeberBauratenVerteilteGeschossflaecheWohnenForAbfragevariante(abfragevariante);
  } else {
    value = _.isNil(baugebiet) ? 0 : anzahlUeberBauratenVerteilteGeschossflaecheWohnenForBaugebiet(baugebiet);
  }
  return value;
}
export function verteilteGeschossflaecheWohnenFormatted(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = verteilteGeschossflaecheWohnen(baugebiet, abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}

export function wohneinheitenAbfragevariante(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  return !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.weGesamt) ? abfragevariante.weGesamt : 0;
}

export function wohneinheitenAbfragevarianteFormatted(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = wohneinheitenAbfragevariante(abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function verteilteWohneinheitenAbfragevariante(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  return _.isNil(abfragevariante) ? 0 : anzahlUeberBaugebieteVerteilteWohneinheiten(abfragevariante);
}

export function verteilteWohneinheitenAbfragevarianteFormatted(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = verteilteWohneinheitenAbfragevariante(abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function geschossflaecheWohnenAbfragevariante(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  return !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.gfWohnenGesamt) ? abfragevariante.gfWohnenGesamt : 0;
}

export function geschossflaecheWohnenAbfragevarianteFormatted(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = geschossflaecheWohnenAbfragevariante(abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}

export function verteilteGeschossflaecheWohnenAbfragevariante(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): number {
  return _.isNil(abfragevariante) ? 0 : anzahlUeberBaugebieteVerteilteGeschossflaecheWohnen(abfragevariante);
}

export function verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
  abfragevariante: AbfragevarianteBauleitplanverfahrenDto | undefined,
): string {
  const value = verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}
