import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import _ from "lodash";
import { addiereAnteile } from "@/utils/CalculationUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { UncertainBoolean } from "@/api/api-client/isi-backend";

@Component
export default class FieldValidationRulesMixin extends Vue {
  private static readonly DATE_FORMAT = "DD.MM.YYYY";

  fieldValidationRules: unknown = {
    pflichtfeld: (v: string): boolean | string => !!v || "Pflichtfeld",

    pflichtfeldMehrfachauswahl: (v: Array<string>): boolean | string => !!(v && v.length) || "Pflichtfeld",

    pflichtfeldNotNil: (v: string): boolean | string => !_.isNil(v) || "Pflichtfeld",

    buchstaben: (v: string): boolean | string => !v || /^[a-zA-Z_äÄöÖüÜß -\s]*$/.test(v) || "Nur Buchstaben erlaubt",

    min5: (v: string): boolean | string => !v || /.{5,}$/.test(v) || "Mindestens fünf Zeichen benötigt",

    hausnummer: (v: string): boolean | string =>
      !v || /^[a-zA-Z 0-9 \s]*$/.test(v) || "Nur Buchstaben und Zahlen erlaubt",

    datum: (v: string) =>
      !v || moment(v, FieldValidationRulesMixin.DATE_FORMAT, true).isValid() || "Muss korrekt formatiert sein",

    digits: (v: string): string | boolean => {
      return !v || /^\d*$/.test(v) || "Nur Ziffern erlaubt";
    },

    min:
      (limit: number) =>
      (v: string): string | boolean => {
        const num = parseFloat(v);
        return _.isNaN(num) || num >= limit || `Darf nicht kleiner als ${limit} sein`;
      },

    max:
      (limit: number) =>
      (v: string): string | boolean => {
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
