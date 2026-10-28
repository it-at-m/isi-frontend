import { describe, expect, test } from "vitest";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import {
  DEFAULT_SCHNELLFILTER,
  DEFAULT_SORTIERUNG,
  SCHNELLFILTER_OPTIONEN,
  SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG,
  SORTIERUNG_OPTIONEN,
  STADTBEZIRK_OPTIONEN,
  getGueltigenSchnellfilter,
  getSortOrderForSortierung,
  getStatusAbfrageForSchnellfilter,
  type SchnellfilterVorgaenge,
} from "@/utils/StartseiteUtil";

describe("StartseiteUtil.spec.ts", () => {
  describe("getStatusAbfrageForSchnellfilter", () => {
    test("liefert für 'Alle Vorgänge' keinen Statusfilter", () => {
      expect(getStatusAbfrageForSchnellfilter("ALLE")).toBeUndefined();
    });

    test("liefert für 'Entwürfe' ausschließlich den Status ANGELEGT", () => {
      expect(getStatusAbfrageForSchnellfilter("ENTWUERFE")).toEqual([StatusAbfrage.Angelegt]);
    });

    test("liefert für 'Zur Bearbeitung' die bearbeitbaren Status ohne ANGELEGT", () => {
      expect(getStatusAbfrageForSchnellfilter("ZUR_BEARBEITUNG")).toEqual([StatusAbfrage.EinplanungBedarfe]);
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

    test("liefert den Status ANGELEGT ausschließlich für 'Entwürfe'", () => {
      const optionenMitAngelegt = SCHNELLFILTER_OPTIONEN.filter((option) =>
        (getStatusAbfrageForSchnellfilter(option.value) ?? []).includes(StatusAbfrage.Angelegt),
      ).map((option) => option.value);
      expect(optionenMitAngelegt).toEqual(["ENTWUERFE"]);
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

  describe("getGueltigenSchnellfilter", () => {
    test("übernimmt einen angebotenen Schnellfilter", () => {
      expect(getGueltigenSchnellfilter("ERLEDIGT", SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG)).toBe("ERLEDIGT");
      expect(getGueltigenSchnellfilter("ENTWUERFE", SCHNELLFILTER_OPTIONEN)).toBe("ENTWUERFE");
    });

    test("ersetzt einen nicht angebotenen oder fehlenden Schnellfilter durch den Standard", () => {
      expect(getGueltigenSchnellfilter("ENTWUERFE", SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG)).toBe(
        DEFAULT_SCHNELLFILTER,
      );
      expect(getGueltigenSchnellfilter("VORHABEN", SCHNELLFILTER_OPTIONEN)).toBe(DEFAULT_SCHNELLFILTER);
      expect(getGueltigenSchnellfilter(undefined, SCHNELLFILTER_OPTIONEN)).toBe(DEFAULT_SCHNELLFILTER);
    });

    test("enthält den Standard in den Schnellfiltern der Sachbearbeitung ohne Duplikate", () => {
      const werte = SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG.map((option) => option.value);
      expect(werte).toContain(DEFAULT_SCHNELLFILTER);
      expect(new Set(werte).size).toBe(werte.length);
    });
  });

  describe("STADTBEZIRK_OPTIONEN", () => {
    test("enthält die 25 Stadtbezirke mit zweistelliger Nummer", () => {
      expect(STADTBEZIRK_OPTIONEN).toHaveLength(25);
      expect(STADTBEZIRK_OPTIONEN[0]).toEqual({ title: "01 Altstadt-Lehel", value: "01" });
      expect(STADTBEZIRK_OPTIONEN[24]).toEqual({ title: "25 Laim", value: "25" });
    });
  });
});
