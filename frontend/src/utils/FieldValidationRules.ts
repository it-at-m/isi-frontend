// FieldValidationRules

import _ from "lodash";
import moment from "moment";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { addiereAnteile } from "@/utils/CalculationUtil";
import { UncertainBoolean } from "@/api/api-client/isi-backend";

export const pflichtfeld = (v: string) => !!v || "Pflichtfeld";

export const pflichtfeldMehrfachauswahl = (v: Array<string>) => !!(v && v.length) || "Pflichtfeld";

export const pflichtfeldNotNil = (v: string) => !_.isNil(v) || "Pflichtfeld";

export const buchstaben = (v: string) => !v || /^[a-zA-Z_äÄöÖüÜß -\s]*$/.test(v) || "Nur Buchstaben erlaubt";

export const min5 = (v: string) => !v || /.{5,}$/.test(v) || "Mindestens fünf Zeichen benötigt";

export const hausnummer = (v: string) => !v || /^[a-zA-Z 0-9 \s]*$/.test(v) || "Nur Buchstaben und Zahlen erlaubt";

export const datum = (format: string) => (v: string) =>
  !v || moment(v, format, true).isValid() || "Muss korrekt formatiert sein";

export const digits = (v: string) => !v || /^\d*$/.test(v) || "Nur Ziffern erlaubt";

export const notUnspecified = (v: string) => (!_.isNil(v) && v !== UncertainBoolean.Unspecified) || "Pflichtfeld";

/**
 * Rule die Überprüft, dass der minimal erlaubte Wert nicht unterschritten wird.
 * Evtl. vorhandene Formatierungen werden entfernt (Tausender-Trennzeichen) oder
 * umgewandelt (Komma in Punkt).
 */

export const min = (limit: number) => (v: string) => {
  if (!_.isNil(v) && !_.isNaN(v)) {
    v = _.replace(v, /\./g, "");
    v = _.replace(v, ",", ".");
  }
  const num = parseFloat(v);
  return _.isNaN(num) || num >= limit || `Darf nicht kleiner als ${limit} sein`;
};

/**
 * Rule die Überprüft, dass der maximal erlaubte Wert nicht überschritten wird.
 * Evtl. vorhandene Formatierungen werden entfernt (Tausender-Trennzeichen) oder
 * umgewandelt (Komma in Punkt). 999.999.999,99 -> 99999999.99
 */
export const max = (limit: number) => (v: string) => {
  if (!_.isNil(v) && !_.isNaN(v)) {
    v = _.replace(v, /\./g, "");
    v = _.replace(v, ",", ".");
  }
  const num = parseFloat(v);
  return _.isNaN(num) || num <= limit || `Darf nicht größer als ${limit} sein`;
};

/**
 * Rule die Überprüft ob der Gesamtwert nicht über 100 Prozent liegt.
 * Werte die null/undefined sind werden als 0 gewertet
 */
export const nichtGleich100Prozent = (foerdermix: FoerdermixModel) => {
  if (!_.isNil(foerdermix)) {
    const sum: number = addiereAnteile(foerdermix);
    if (sum < 100) {
      return "Die Summe ist unter 100";
    }

    if (sum > 100) {
      return "Die Summe ist über 100";
    }

    if (sum === 100) {
      return true;
    }
  } else {
    return false;
  }
  return true;
};
