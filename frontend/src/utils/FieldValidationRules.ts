import _ from "lodash";
import moment from "moment";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { addiereAnteile } from "@/utils/CalculationUtil";
import { UncertainBoolean } from "@/api/api-client/isi-backend";

export function pflichtfeld(v: string): boolean | string {
  return !!v || "Pflichtfeld";
}

export function pflichtfeldMehrfachauswahl(v: Array<string>): boolean | string {
  return !!(v && v.length) || "Pflichtfeld";
}

export function pflichtfeldNotNil(v: string): boolean | string {
  return !_.isNil(v) || "Pflichtfeld";
}

export function buchstaben(v: string): boolean | string {
  return !v || /^[a-zA-Z_äÄöÖüÜß -\s]*$/.test(v) || "Nur Buchstaben erlaubt";
}

export function min5(v: string): boolean | string {
  return !v || /.{5,}$/.test(v) || "Mindestens fünf Zeichen benötigt";
}

export function hausnummer(v: string): boolean | string {
  return !v || /^[a-zA-Z 0-9 \s]*$/.test(v) || "Nur Buchstaben und Zahlen erlaubt";
}

export function datum(format: string): (v: string) => boolean | string {
  return (v: string) => !v || moment(v, format, true).isValid() || "Muss korrekt formatiert sein";
}

export function digits(v: string): boolean | string {
  return !v || /^\d*$/.test(v) || "Nur Ziffern erlaubt";
}

export function notUnspecified(v: string): boolean | string {
  return (!_.isNil(v) && v !== UncertainBoolean.Unspecified) || "Pflichtfeld";
}

/**
 * Rule die Überprüft, dass der minimal erlaubte Wert nicht unterschritten wird.
 * Evtl. vorhandene Formatierungen werden entfernt (Tausender-Trennzeichen) oder
 * umgewandelt (Komma in Punkt).
 */
export function min(limit: number): (v: string) => boolean | string {
  return (v: string) => {
    if (!_.isNil(v) && !_.isNaN(v)) {
      v = _.replace(v, /\./g, "");
      v = _.replace(v, ",", ".");
    }
    const num = parseFloat(v);
    return _.isNaN(num) || num >= limit || `Darf nicht kleiner als ${limit} sein`;
  };
}

/**
 * Rule die Überprüft, dass der maximal erlaubte Wert nicht überschritten wird.
 * Evtl. vorhandene Formatierungen werden entfernt (Tausender-Trennzeichen) oder
 * umgewandelt (Komma in Punkt). 999.999.999,99 -> 99999999.99
 */
export function max(limit: number): (v: string) => boolean | string {
  return (v: string) => {
    if (!_.isNil(v) && !_.isNaN(v)) {
      v = _.replace(v, /\./g, "");
      v = _.replace(v, ",", ".");
    }
    const num = parseFloat(v);
    return _.isNaN(num) || num <= limit || `Darf nicht größer als ${limit} sein`;
  };
}

/**
 * Rule die Überprüft ob der Gesamtwert nicht über 100 Prozent liegt.
 * Werte die null/undefined sind werden als 0 gewertet
 */
export function nichtGleich100Prozent(foerdermix: FoerdermixModel): boolean | string {
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
}
