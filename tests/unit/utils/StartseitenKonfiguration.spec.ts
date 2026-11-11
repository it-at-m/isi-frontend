import { describe, expect, test } from "vitest";
import { StatusAbfrage } from "@/api/api-client/isi-backend";
import {
  STARTSEITE_ABFRAGEERSTELLUNG,
  STARTSEITE_BEDARFSMELDUNG,
  STARTSEITE_SACHBEARBEITUNG,
  getStartseitenKonfiguration,
  getSuchkriterienBedarfsmeldung,
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
    const KEINE_ROLLEN = {
      hasRoleAdmin: false,
      hasRoleAbfrageerstellung: false,
      hasRoleSachbearbeitung: false,
      hasRoleBedarfsmeldungKita: false,
      hasRoleBedarfsmeldungSchule: false,
      hasRoleBedarfsmeldungSozialplanung: false,
      hasRoleFlaechenbedarfsmeldung: false,
    };

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

    test.each([
      "hasRoleBedarfsmeldungKita",
      "hasRoleBedarfsmeldungSchule",
      "hasRoleBedarfsmeldungSozialplanung",
      "hasRoleFlaechenbedarfsmeldung",
    ] as const)("liefert für die Bedarfsmeldungsrolle '%s' die Startseite der Bedarfsmeldung", (rolle) => {
      expect(getStartseitenKonfiguration({ ...KEINE_ROLLEN, [rolle]: true })).toBe(STARTSEITE_BEDARFSMELDUNG);
    });

    test("liefert bei Sachbearbeitung und Bedarfsmeldung die Startseite der Sachbearbeitung", () => {
      const konfiguration = getStartseitenKonfiguration({
        ...KEINE_ROLLEN,
        hasRoleSachbearbeitung: true,
        hasRoleBedarfsmeldungKita: true,
      });

      expect(konfiguration?.getSuchkriterien).toBe(STARTSEITE_SACHBEARBEITUNG.getSuchkriterien);
      expect(konfiguration?.neuanlageOptionen.map((option) => option.route)).toEqual([
        "/bauvorhaben",
        "/infrastruktureinrichtung",
      ]);
    });

    test("liefert bei Bedarfsmeldung und Abfrageerstellung die Startseite der Bedarfsmeldung mit beiden Neuanlagen", () => {
      const konfiguration = getStartseitenKonfiguration({
        ...KEINE_ROLLEN,
        hasRoleAbfrageerstellung: true,
        hasRoleBedarfsmeldungSchule: true,
      });

      expect(konfiguration?.schnellfilterOptionen).toBe(STARTSEITE_BEDARFSMELDUNG.schnellfilterOptionen);
      expect(konfiguration?.getSuchkriterien).toBe(STARTSEITE_BEDARFSMELDUNG.getSuchkriterien);
      expect(konfiguration?.neuanlageOptionen.map((option) => option.route)).toEqual([
        "/infrastruktureinrichtung",
        "/abfrage?art=BAULEITPLANVERFAHREN",
        "/abfrage?art=BAUGENEHMIGUNGSVERFAHREN",
        "/abfrage?art=WEITERES_VERFAHREN",
      ]);
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
        "/infrastruktureinrichtung",
        "/abfrage?art=BAULEITPLANVERFAHREN",
        "/abfrage?art=BAUGENEHMIGUNGSVERFAHREN",
        "/abfrage?art=WEITERES_VERFAHREN",
      ]);
    });

    test("liefert Administratoren unabhängig von weiteren Rollen keine personalisierte Startseite", () => {
      expect(getStartseitenKonfiguration({ ...KEINE_ROLLEN, hasRoleAdmin: true })).toBeUndefined();
      expect(
        getStartseitenKonfiguration({
          ...KEINE_ROLLEN,
          hasRoleAdmin: true,
          hasRoleAbfrageerstellung: true,
          hasRoleSachbearbeitung: true,
          hasRoleBedarfsmeldungKita: true,
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
    test("bietet den Stadtbezirksfilter und die Neuanlage von Vorhaben und Infrastruktureinrichtungen an", () => {
      expect(STARTSEITE_SACHBEARBEITUNG.stadtbezirkFilter).toBe(true);
      expect(STARTSEITE_SACHBEARBEITUNG.neuanlageOptionen.map((option) => option.title)).toEqual([
        "Vorhaben erstellen",
        "Infrastruktureinrichtung erstellen",
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

    test("zeigt bei 'Infrastruktureinrichtungen' ausschließlich die eigenen Infrastruktureinrichtungen", () => {
      const suchkriterien = getSuchkriterienSachbearbeitung("INFRASTRUKTUREINRICHTUNGEN");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(INFRASTRUKTUREINRICHTUNGEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
    });

    test("behandelt einen nicht angebotenen Schnellfilter wie 'Alle'", () => {
      expect(getSuchkriterienSachbearbeitung("ENTWUERFE")).toEqual(getSuchkriterienSachbearbeitung("ALLE"));
    });

    test("bietet für jeden Schnellfilter eigene Suchkriterien an", () => {
      const kriterien = STARTSEITE_SACHBEARBEITUNG.schnellfilterOptionen.map((option) =>
        JSON.stringify(getSuchkriterienSachbearbeitung(option.value)),
      );
      expect(new Set(kriterien).size).toBe(kriterien.length);
    });
  });

  describe("Startseite der Bedarfsmeldung", () => {
    test("bietet den Stadtbezirksfilter und ausschließlich die Neuanlage von Infrastruktureinrichtungen an", () => {
      expect(STARTSEITE_BEDARFSMELDUNG.stadtbezirkFilter).toBe(true);
      expect(STARTSEITE_BEDARFSMELDUNG.neuanlageOptionen.map((option) => option.title)).toEqual([
        "Infrastruktureinrichtung erstellen",
      ]);
    });

    test("bietet die Schnellfilter der Anforderung in der vorgegebenen Reihenfolge an", () => {
      expect(STARTSEITE_BEDARFSMELDUNG.schnellfilterOptionen.map((option) => option.title)).toEqual([
        "Alle",
        "Zur Bearbeitung",
        "Meine zur Kenntnis",
        "Meine erledigt",
        "Infrastruktureinrichtungen",
        "Vorhaben",
      ]);
    });

    test("zeigt bei 'Alle' alle Abfragen im Zuständigkeitsbereich der Bedarfsmeldung ohne Personenbezug", () => {
      const suchkriterien = getSuchkriterienBedarfsmeldung("ALLE");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(ABFRAGEARTEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBeUndefined();
      expect(suchkriterien.filterNurEigeneAbfragen).toBeUndefined();
      expect(suchkriterien.filterStatusAbfrage).toEqual([
        StatusAbfrage.EinpflegenBedarfsmeldung,
        StatusAbfrage.EinplanungBedarfe,
        StatusAbfrage.ErledigtMitFachreferat,
      ]);
    });

    test("zeigt bei 'Zur Bearbeitung' alle Abfragen im Status 'Einpflegen Bedarfsmeldung' ohne Personenbezug", () => {
      const suchkriterien = getSuchkriterienBedarfsmeldung("ZUR_BEARBEITUNG");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(ABFRAGEARTEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBeUndefined();
      expect(suchkriterien.filterStatusAbfrage).toEqual([StatusAbfrage.EinpflegenBedarfsmeldung]);
    });

    test.each([
      ["ZUR_KENNTNIS", [StatusAbfrage.EinplanungBedarfe]],
      ["ERLEDIGT", [StatusAbfrage.ErledigtMitFachreferat]],
    ] as const)("zeigt bei '%s' die selbst bearbeiteten Abfragen im passenden Status", (schnellfilter, status) => {
      const suchkriterien = getSuchkriterienBedarfsmeldung(schnellfilter);
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(ABFRAGEARTEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
      expect(suchkriterien.filterStatusAbfrage).toEqual(status);
    });

    test("zeigt bei 'Infrastruktureinrichtungen' ausschließlich die eigenen Infrastruktureinrichtungen", () => {
      const suchkriterien = getSuchkriterienBedarfsmeldung("INFRASTRUKTUREINRICHTUNGEN");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(INFRASTRUKTUREINRICHTUNGEN);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
      expect(suchkriterien.filterStatusAbfrage).toBeUndefined();
    });

    test("zeigt bei 'Vorhaben' ausschließlich die eigenen Vorhaben", () => {
      const suchkriterien = getSuchkriterienBedarfsmeldung("VORHABEN");
      expect(getAusgewaehlteObjekte(suchkriterien)).toEqual(["selectBauvorhaben"]);
      expect(suchkriterien.filterNurEigeneVorgaenge).toBe(true);
    });

    test("behandelt einen nicht angebotenen Schnellfilter wie 'Alle'", () => {
      expect(getSuchkriterienBedarfsmeldung("START_BEARBEITUNG")).toEqual(getSuchkriterienBedarfsmeldung("ALLE"));
    });

    test("bietet für jeden Schnellfilter eigene Suchkriterien an", () => {
      const kriterien = STARTSEITE_BEDARFSMELDUNG.schnellfilterOptionen.map((option) =>
        JSON.stringify(getSuchkriterienBedarfsmeldung(option.value)),
      );
      expect(new Set(kriterien).size).toBe(kriterien.length);
    });
  });
});
