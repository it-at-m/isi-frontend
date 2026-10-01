import { describe, expect, test } from "vitest";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import {
  DEFAULT_SCHNELLFILTER,
  DEFAULT_SORTIERUNG,
  SCHNELLFILTER_OPTIONEN,
  SORTIERUNG_OPTIONEN,
  getSortOrderForSortierung,
  getStatusAbfrageForSchnellfilter,
  type SchnellfilterVorgaenge,
} from "@/utils/StartseiteUtil";

describe("StartseiteUtil.spec.ts", () => {
  describe("getStatusAbfrageForSchnellfilter", () => {
    test("liefert für 'Alle Vorgänge' keinen Statusfilter", () => {
      expect(getStatusAbfrageForSchnellfilter("ALLE")).toBeUndefined();
    });

    test("liefert für 'Zur Bearbeitung' die bearbeitbaren Status", () => {
      expect(getStatusAbfrageForSchnellfilter("ZUR_BEARBEITUNG")).toEqual([
        StatusAbfrage.EinplanungBedarfe,
        StatusAbfrage.Angelegt,
      ]);
    });

    test("liefert für 'Zur Kenntnis' die laufenden Status", () => {
      expect(getStatusAbfrageForSchnellfilter("ZUR_KENNTNIS")).toEqual([
        StatusAbfrage.UebermitteltZurBearbeitung,
        StatusAbfrage.StartBearbeitung,
        StatusAbfrage.EinpflegenBedarfsmeldung,
      ]);
    });

    test("liefert für 'Abgeschlossene Vorgänge' die erledigten Status", () => {
      expect(getStatusAbfrageForSchnellfilter("ABGESCHLOSSEN")).toEqual([
        StatusAbfrage.ErledigtMitFachreferat,
        StatusAbfrage.ErledigtOhneFachreferat,
      ]);
    });

    test("liefert für undefined und unbekannte Werte keinen Statusfilter", () => {
      expect(getStatusAbfrageForSchnellfilter(undefined)).toBeUndefined();
      expect(getStatusAbfrageForSchnellfilter("GIBT_ES_NICHT" as SchnellfilterVorgaenge)).toBeUndefined();
    });

    test("filtert den Status ABBRUCH aus keinem Schnellfilter heraus versehentlich hinein", () => {
      const alleGefiltertenStatus = SCHNELLFILTER_OPTIONEN.flatMap(
        (option) => getStatusAbfrageForSchnellfilter(option.value) ?? [],
      );
      expect(alleGefiltertenStatus).not.toContain(StatusAbfrage.Abbruch);
    });
  });

  describe("getSortOrderForSortierung", () => {
    test("sortiert die Bearbeitungsfrist aufsteigend", () => {
      expect(getSortOrderForSortierung("FRIST_BEARBEITUNG")).toBe("ASC");
    });

    test("sortiert die übrigen Kriterien absteigend", () => {
      expect(getSortOrderForSortierung("CREATED_DATE_TIME")).toBe("DESC");
      expect(getSortOrderForSortierung("LAST_MODIFIED_DATE_TIME")).toBe("DESC");
      expect(getSortOrderForSortierung(undefined)).toBe("DESC");
    });
  });

  describe("Auswahloptionen", () => {
    test("enthalten die Standardwerte", () => {
      expect(SCHNELLFILTER_OPTIONEN.map((option) => option.value)).toContain(DEFAULT_SCHNELLFILTER);
      expect(SORTIERUNG_OPTIONEN.map((option) => option.value)).toContain(DEFAULT_SORTIERUNG);
    });

    test("enthalten keine Duplikate", () => {
      const schnellfilterWerte = SCHNELLFILTER_OPTIONEN.map((option) => option.value);
      const sortierungWerte = SORTIERUNG_OPTIONEN.map((option) => option.value);
      expect(new Set(schnellfilterWerte).size).toBe(schnellfilterWerte.length);
      expect(new Set(sortierungWerte).size).toBe(sortierungWerte.length);
    });
  });
});
