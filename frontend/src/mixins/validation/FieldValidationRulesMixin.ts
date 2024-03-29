import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import _ from "lodash";
import { addiereAnteile } from "@/utils/CalculationUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { UncertainBoolean } from "@/api/api-client/isi-backend";

type Input = string | number | unknown[];

@Component
export default class FieldValidationRulesMixin extends Vue {
  private isEmpty(value: Input): boolean {
    if (_.isNil(value)) {
      return true;
    }

    if (typeof value === "number") {
      if (_.isNaN(value)) {
        return true;
      }
    } else {
      if (value.length === 0) {
        return true;
      }

      if (typeof value === "string" && (value === "" || value === UncertainBoolean.Unspecified)) {
        return true;
      }
    }

    return false;
  }

  fieldValidationRules: unknown = {
    pflichtfeld: (v: string): boolean | string => !!v || "Pflichtfeld",

    pflichtfeldMehrfachauswahl: (v: Array<string>): boolean | string => !!(v && v.length) || "Pflichtfeld",

    pflichtfeldNotNil: (v: string): boolean | string => !_.isNil(v) || "Pflichtfeld",

    buchstaben: (v: string): boolean | string => !v || /^[a-zA-Z_äÄöÖüÜß -\s]*$/.test(v) || "Nur Buchstaben erlaubt",

    min5: (v: string): boolean | string => !v || /.{5,}$/.test(v) || "Mindestens fünf Zeichen benötigt",

    hausnummer: (v: string): boolean | string =>
      !v || /^[a-zA-Z 0-9 \s]*$/.test(v) || "Nur Buchstaben und Zahlen erlaubt",

    datum:
      (format: string) =>
      (v: string): string | boolean =>
        !v || moment(v, format, true).isValid() || "Muss korrekt formatiert sein",

    digits: (v: string): string | boolean => {
      return !v || /^\d*$/.test(v) || "Nur Ziffern erlaubt";
    },

    /**
     * Rule die Überprüft, dass der minimal erlaubte Wert nicht unterschritten wird.
     * Evtl. vorhandene Formatierungen werden entfernt (Tausender-Trennzeichen) oder
     * umgewandelt (Komma in Punkt).
     */
    min:
      (limit: number) =>
      (v: string): string | boolean => {
        if (!_.isNil(v) && !_.isNaN(v)) {
          v = _.replace(v, /\./g, "");
          v = _.replace(v, ",", ".");
        }
        const num = parseFloat(v);
        return _.isNaN(num) || num >= limit || `Darf nicht kleiner als ${limit} sein`;
      },

    /**
     * Rule die Überprüft, dass der maximal erlaubte Wert nicht überschritten wird.
     * Evtl. vorhandene Formatierungen werden entfernt (Tausender-Trennzeichen) oder
     * umgewandelt (Komma in Punkt). 999.999.999,99 -> 99999999.99
     */
    max:
      (limit: number) =>
      (v: string): string | boolean => {
        if (!_.isNil(v) && !_.isNaN(v)) {
          v = _.replace(v, /\./g, "");
          v = _.replace(v, ",", ".");
        }
        const num = parseFloat(v);
        return _.isNaN(num) || num <= limit || `Darf nicht größer als ${limit} sein`;
      },

    /**
     * Rule die Überprüft ob der Gesamtwert nicht über 100 Prozent liegt.
     * Werte die null/undefined sind werden als 0 gewertet
     */
    nichtGleich100Prozent(foerdermix: FoerdermixModel): string | boolean {
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
    },

    notUnspecified: (v: string): boolean | string => {
      return (!_.isNil(v) && v !== UncertainBoolean.Unspecified) || "Pflichtfeld";
    },
  };
}
