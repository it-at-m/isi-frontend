import { describe, expect, test } from "vitest";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import {
  STARTSEITE_ABFRAGEERSTELLUNG,
  STARTSEITE_SACHBEARBEITUNG,
  getStartseitenKonfiguration,
  getSuchkriterienSachbearbeitung,
  type Suchkriterien,
} from "@/utils/StartseitenKonfiguration";

const ABFRAGEARTEN = ["selectBauleitplanverfahren", "selectBaugenehmigungsverfahren", "selectWeiteresVerfahren"];
const INFRASTRUKTUREINRICHTUNGEN = [
  "selectGrundschule",
  "selectGsNachmittagBetreuung",
  "selectHausFuerKinder",
  "selectKindergarten",
  "selectKinderkrippe",
  "selectMittelschule",
  "selectNachbarschaftstreff",
];

function getAusgewaehlteObjekte(suchkriterien: Suchkriterien): Array<string> {
  return Object.entries(suchkriterien)
    .filter(([key, value]) => key.startsWith("select") && value === true)
    .map(([key]) => key);
}

describe("StartseitenKonfiguration.spec.ts", () => {
  describe("getStartseitenKonfiguration", () => {
    const KEINE_ROLLEN = { hasRoleAdmin: false, hasRoleAbfrageerstellung: false, hasRoleSachbearbeitung: false };

    test("liefert für Abfrageersteller die Startseite der Abfrageerstellung", () => {
      expect(getStartseitenKonfiguration({ ...KEINE_ROLLEN, hasRoleAbfrageerstellung: true })).toBe(
        STARTSEITE_ABFRAGEERSTELLUNG,
      );
    });

    test("liefert für die Sachbearbeitung die Startseite der Sachbearbeitung", () => {
      expect(getStartseitenKonfiguration({ ...KEINE_ROLLEN, hasRoleSachbearbeitung: true })).toBe(
        STARTSEITE_SACHBEARBEITUNG,
      );
    });

    test("liefert bei Mischrollen die Startseite der Sachbearbeitung mit den Neuanlagen beider Rollen", () => {
      const konfiguration = getStartseitenKonfiguration({
        ...KEINE_ROLLEN,
        hasRoleAbfrageerstellung: true,
        hasRoleSachbearbeitung: true,
      });

      expect(konfiguration?.schnellfilterOptionen).toBe(STARTSEITE_SACHBEARBEITUNG.schnellfilterOptionen);
      expect(konfiguration?.getSuchkriterien).toBe(STARTSEITE_SACHBEARBEITUNG.getSuchkriterien);
      expect(konfiguration?.stadtbezirkFilter).toBe(true);
      expect(konfiguration?.neuanlageOptionen.map((option) => option.route)).toEqual([
        "/bauvorhaben",
        "/abfrage?art=BAULEITPLANVERFAHREN",
        "/abfrage?art=BAUGENEHMIGUNGSVERFAHREN",
        "/abfrage?art=WEITERES_VERFAHREN",
      ]);
    });

    test("liefert Administratoren unabhängig von weiteren Rollen keine personalisierte Startseite", () => {
      expect(getStartseitenKonfiguration({ ...KEINE_ROLLEN, hasRoleAdmin: true })).toBeUndefined();
      expect(
        getStartseitenKonfiguration({
          hasRoleAdmin: true,
          hasRoleAbfrageerstellung: true,
          hasRoleSachbearbeitung: true,
        }),
      ).toBeUndefined();
    });

    test("liefert für alle übrigen Rollen keine personalisierte Startseite", () => {
      expect(getStartseitenKonfiguration(KEINE_ROLLEN)).toBeUndefined();
    });
  });

  describe("Startseite der Abfrageerstellung", () => {
    test("durchsucht ausschließlich die eigenen Abfragen", () => {
      const suchkriterien = STARTSEITE_ABFRAGEERSTELLUNG.getSuchkriterien("ALLE");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(ABFRAGEARTEN);
      expect(suchkriterien.filterNurEigeneAbfragen).toBe(true);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBeUndefined();
    });

    test("übernimmt den Schnellfilter in den Statusfilter", () => {
      expect(STARTSEITE_ABFRAGEERSTELLUNG.getSuchkriterien("ENTWUERFE").filterStatusAbfrage).toEqual([
        StatusAbfrage.Angelegt,
      ]);
    });

    test("bietet keinen Stadtbezirksfilter an", () => {
      expect(STARTSEITE_ABFRAGEERSTELLUNG.stadtbezirkFilter).toBe(false);
    });
  });

  describe("Startseite der Sachbearbeitung", () => {
    test("bietet den Stadtbezirksfilter und ausschließlich die Neuanlage von Vorhaben an", () => {
      expect(STARTSEITE_SACHBEARBEITUNG.stadtbezirkFilter).toBe(true);
      expect(STARTSEITE_SACHBEARBEITUNG.neuanlageOptionen.map((option) => option.title)).toEqual([
        "Vorhaben erstellen",
      ]);
    });

    test("durchsucht bei 'Alle' die eigenen Vorgänge aller Objektarten in allen Status", () => {
      const suchkriterien = getSuchkriterienSachbearbeitung("ALLE");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual([
        ...ABFRAGEARTEN,
        "selectBauvorhaben",
        ...INFRASTRUKTUREINRICHTUNGEN,
      ]);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
      expect(suchkriterien.filterStatusAbfrage).toBeUndefined();
    });

    test("zeigt bei 'Übermittelt zur Bearbeitung' alle übermittelten Abfragen ohne Personenbezug", () => {
      const suchkriterien = getSuchkriterienSachbearbeitung("UEBERMITTELT_ZUR_BEARBEITUNG");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(ABFRAGEARTEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBeUndefined();
      expect(suchkriterien.filterNurEigeneAbfragen).toBeUndefined();
      expect(suchkriterien.filterStatusAbfrage).toEqual([StatusAbfrage.UebermitteltZurBearbeitung]);
    });

    test.each([
      ["ANGELEGT", [StatusAbfrage.Angelegt]],
      ["START_BEARBEITUNG", [StatusAbfrage.StartBearbeitung]],
      ["EINPFLEGEN_BEDARFSMELDUNG", [StatusAbfrage.EinpflegenBedarfsmeldung]],
      ["EINPLANUNG_BEDARFE", [StatusAbfrage.EinplanungBedarfe]],
      ["ERLEDIGT", [StatusAbfrage.ErledigtMitFachreferat, StatusAbfrage.ErledigtOhneFachreferat]],
    ] as const)("zeigt bei '%s' die selbst bearbeiteten Abfragen im passenden Status", (schnellfilter, status) => {
      const suchkriterien = getSuchkriterienSachbearbeitung(schnellfilter);
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(ABFRAGEARTEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
      expect(suchkriterien.filterStatusAbfrage).toEqual(status);
    });

    test("zeigt bei 'Vorhaben' ausschließlich die eigenen Vorhaben", () => {
      const suchkriterien = getSuchkriterienSachbearbeitung("VORHABEN");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(["selectBauvorhaben"]);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
      expect(suchkriterien.filterStatusAbfrage).toBeUndefined();
    });

    test("bietet keinen Schnellfilter 'Infrastruktureinrichtungen' an", () => {
      expect(STARTSEITE_SACHBEARBEITUNG.schnellfilterOptionen.map((option) => option.value)).not.toContain(
        "INFRASTRUKTUREINRICHTUNGEN",
      );
    });

    test.each(["ENTWUERFE", "INFRASTRUKTUREINRICHTUNGEN"] as const)(
      "behandelt den nicht angebotenen Schnellfilter '%s' wie 'Alle'",
      (schnellfilter) => {
        expect(getSuchkriterienSachbearbeitung(schnellfilter)).toEqual(getSuchkriterienSachbearbeitung("ALLE"));
      },
    );

    test("bietet für jeden Schnellfilter eigene Suchkriterien an", () => {
      const kriterien = STARTSEITE_SACHBEARBEITUNG.schnellfilterOptionen.map((option) =>
        JSON.stringify(getSuchkriterienSachbearbeitung(option.value)),
      );
      expect(new Set(kriterien).size).toBe(kriterien.length);
    });
  });
});
