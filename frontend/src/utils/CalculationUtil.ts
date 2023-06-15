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

export function wohneinheiten(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteDto | undefined
): number {
  let value: number;
  if (baugebiet?.technical) {
    value = !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.gesamtanzahlWe) ? abfragevariante.gesamtanzahlWe : 0;
  } else {
    value = !_.isNil(baugebiet) && !_.isNil(baugebiet?.gesamtanzahlWe) ? baugebiet.gesamtanzahlWe : 0;
  }
  return value;
}

export function wohneinheitenFormatted(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteDto | undefined
): string {
  const value = wohneinheiten(baugebiet, abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function verteilteWohneinheiten(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteDto | undefined
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
  abfragevariante: AbfragevarianteDto | undefined
): string {
  const value = verteilteWohneinheiten(baugebiet, abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function geschossflaecheWohnen(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteDto | undefined
): number {
  let value: number;
  if (baugebiet?.technical) {
    value =
      !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.geschossflaecheWohnen)
        ? abfragevariante.geschossflaecheWohnen
        : 0;
  } else {
    value = !_.isNil(baugebiet) && !_.isNil(baugebiet?.geschossflaecheWohnen) ? baugebiet.geschossflaecheWohnen : 0;
  }
  return value;
}

export function geschossflaecheWohnenFormatted(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteDto | undefined
): string {
  const value = geschossflaecheWohnen(baugebiet, abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}

export function verteilteGeschossflaecheWohnen(
  baugebiet: BaugebietDto | undefined,
  abfragevariante: AbfragevarianteDto | undefined
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
  abfragevariante: AbfragevarianteDto | undefined
): string {
  const value = verteilteGeschossflaecheWohnen(baugebiet, abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}

export function wohneinheitenAbfragevariante(abfragevariante: AbfragevarianteDto | undefined): number {
  return !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.gesamtanzahlWe) ? abfragevariante.gesamtanzahlWe : 0;
}

export function wohneinheitenAbfragevarianteFormatted(abfragevariante: AbfragevarianteDto | undefined): string {
  const value = wohneinheitenAbfragevariante(abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function verteilteWohneinheitenAbfragevariante(abfragevariante: AbfragevarianteDto | undefined): number {
  return _.isNil(abfragevariante) ? 0 : anzahlUeberBaugebieteVerteilteWohneinheiten(abfragevariante);
}

export function verteilteWohneinheitenAbfragevarianteFormatted(
  abfragevariante: AbfragevarianteDto | undefined
): string {
  const value = verteilteWohneinheitenAbfragevariante(abfragevariante);
  return numberToFormattedStringZeroDecimals(value);
}

export function geschossflaecheWohnenAbfragevariante(abfragevariante: AbfragevarianteDto | undefined): number {
  return !_.isNil(abfragevariante) && !_.isNil(abfragevariante?.geschossflaecheWohnen)
    ? abfragevariante.geschossflaecheWohnen
    : 0;
}

export function geschossflaecheWohnenAbfragevarianteFormatted(abfragevariante: AbfragevarianteDto | undefined): string {
  const value = geschossflaecheWohnenAbfragevariante(abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}

export function verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante: AbfragevarianteDto | undefined): number {
  return _.isNil(abfragevariante) ? 0 : anzahlUeberBaugebieteVerteilteGeschossflaecheWohnen(abfragevariante);
}

export function verteilteGeschossflaecheWohnenAbfragevarianteFormatted(
  abfragevariante: AbfragevarianteDto | undefined
): string {
  const value = verteilteGeschossflaecheWohnenAbfragevariante(abfragevariante);
  return numberToFormattedStringTwoDecimals(value);
}
