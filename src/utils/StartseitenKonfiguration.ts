import { AbfrageDtoArtAbfrageEnum, type SearchQueryAndSortingDto, StatusAbfrage } from "@/api/api-client/isi-backend";
import { getAbfrageArtLabel, getAbfrageIcon } from "@/utils/AbfrageIconUtil";
import _ from "lodash";
import {
  type AuswahlOption,
  type SchnellfilterVorgaenge,
  SCHNELLFILTER_OPTIONEN,
  SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG,
  SCHNELLFILTER_OPTIONEN_BEDARFSMELDUNG,
  SCHNELLFILTER_OPTIONEN_ANWENDER,
  getStatusAbfrageForSchnellfilter,
} from "@/utils/StartseiteUtil";

/**
 * Die vom Schnellfilter abhängigen Teile der Suchanfrage im Bereich "Meine Vorgänge".
 */
export type Suchkriterien = Pick<
  SearchQueryAndSortingDto,
  | "selectBauleitplanverfahren"
  | "selectBaugenehmigungsverfahren"
  | "selectWeiteresVerfahren"
  | "selectBauvorhaben"
  | "selectGrundschule"
  | "selectGsNachmittagBetreuung"
  | "selectHausFuerKinder"
  | "selectKindergarten"
  | "selectKinderkrippe"
  | "selectMittelschule"
  | "selectNachbarschaftstreff"
  | "filterNurEigeneAbfragen"
  | "filterNurEigeneVorgaenge"
  | "filterStatusAbfrage"
>;

/**
 * Ein Eintrag im Menü "Neu" des Bereichs "Meine Vorgänge".
 */
export interface NeuanlageOption {
  title: string;
  icon: string;
  route: string;
}

/**
 * Beschreibt die personalisierte Startseite einer Rolle.
 *
 * Eine Startseite für eine weitere Rolle entsteht durch eine weitere Konfiguration und deren Zuordnung in
 * {@link getStartseitenKonfiguration}. Aufbau, Sortierung, Seitenweises Laden und Übersicht werden von allen
 * Rollen geteilt.
 */
export interface StartseitenKonfiguration {
  /** Die im Bereich "Meine Vorgänge" und in den Profileinstellungen angebotenen Schnellfilter. */
  schnellfilterOptionen: Array<AuswahlOption<SchnellfilterVorgaenge>>;
  /** Bildet den gewählten Schnellfilter auf die Suchkriterien ab. */
  getSuchkriterien: (schnellfilter: SchnellfilterVorgaenge) => Suchkriterien;
  /** Die Einträge des Menüs "Neu". Ohne Einträge wird der Button "Neu" nicht angezeigt. */
  neuanlageOptionen: Array<NeuanlageOption>;
  /** Ob die Vorgänge zusätzlich nach Stadtbezirken gefiltert werden können. */
  stadtbezirkFilter: boolean;
}

const KEINE_OBJEKTE: Suchkriterien = {
  selectBauleitplanverfahren: false,
  selectBaugenehmigungsverfahren: false,
  selectWeiteresVerfahren: false,
  selectBauvorhaben: false,
  selectGrundschule: false,
  selectGsNachmittagBetreuung: false,
  selectHausFuerKinder: false,
  selectKindergarten: false,
  selectKinderkrippe: false,
  selectMittelschule: false,
  selectNachbarschaftstreff: false,
};

const ABFRAGEN: Suchkriterien = {
  ...KEINE_OBJEKTE,
  selectBauleitplanverfahren: true,
  selectBaugenehmigungsverfahren: true,
  selectWeiteresVerfahren: true,
};

const VORHABEN: Suchkriterien = {
  ...KEINE_OBJEKTE,
  selectBauvorhaben: true,
};

const INFRASTRUKTUREINRICHTUNGEN: Suchkriterien = {
  ...KEINE_OBJEKTE,
  selectGrundschule: true,
  selectGsNachmittagBetreuung: true,
  selectHausFuerKinder: true,
  selectKindergarten: true,
  selectKinderkrippe: true,
  selectMittelschule: true,
  selectNachbarschaftstreff: true,
};

const ALLE_OBJEKTE: Suchkriterien = {
  ...ABFRAGEN,
  selectBauvorhaben: true,
  selectGrundschule: true,
  selectGsNachmittagBetreuung: true,
  selectHausFuerKinder: true,
  selectKindergarten: true,
  selectKinderkrippe: true,
  selectMittelschule: true,
  selectNachbarschaftstreff: true,
};

/**
 * Abfrageersteller sehen ausschließlich die selbst angelegten Abfragen.
 */
export const STARTSEITE_ABFRAGEERSTELLUNG: StartseitenKonfiguration = {
  schnellfilterOptionen: SCHNELLFILTER_OPTIONEN,
  getSuchkriterien: (schnellfilter) => ({
    ...ABFRAGEN,
    filterNurEigeneAbfragen: true,
    filterStatusAbfrage: getStatusAbfrageForSchnellfilter(schnellfilter),
  }),
  neuanlageOptionen: [
    AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren,
    AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren,
    AbfrageDtoArtAbfrageEnum.WeiteresVerfahren,
  ].map((artAbfrage) => ({
    title: getAbfrageArtLabel(artAbfrage) + " erstellen",
    icon: getAbfrageIcon(artAbfrage),
    route: "/abfrage?art=" + artAbfrage,
  })),
  stadtbezirkFilter: false,
};

/**
 * Bildet die Schnellfilter der Sachbearbeitung auf die Suchkriterien ab.
 * <p>
 * "Eigene Vorgänge" sind alle Abfragen, Vorhaben und Infrastruktureinrichtungen, welche die Person laut
 * Bearbeitungshistorie erstellt oder bearbeitet hat. Die noch nicht übernommenen Abfragen im Status
 * "Übermittelt zur Bearbeitung" werden ohne Personenbezug angezeigt.
 *
 * @param schnellfilter der ausgewählte Schnellfilter.
 * @returns die Suchkriterien.
 */
export function getSuchkriterienSachbearbeitung(schnellfilter: SchnellfilterVorgaenge): Suchkriterien {
  switch (schnellfilter) {
    case "ANGELEGT":
      return { ...ABFRAGEN, filterNurEigeneVorgaenge: true, filterStatusAbfrage: [StatusAbfrage.Angelegt] };
    case "UEBERMITTELT_ZUR_BEARBEITUNG":
      return { ...ABFRAGEN, filterStatusAbfrage: [StatusAbfrage.UebermitteltZurBearbeitung] };
    case "START_BEARBEITUNG":
      return { ...ABFRAGEN, filterNurEigeneVorgaenge: true, filterStatusAbfrage: [StatusAbfrage.StartBearbeitung] };
    case "EINPFLEGEN_BEDARFSMELDUNG":
      return {
        ...ABFRAGEN,
        filterNurEigeneVorgaenge: true,
        filterStatusAbfrage: [StatusAbfrage.EinpflegenBedarfsmeldung],
      };
    case "EINPLANUNG_BEDARFE":
      return { ...ABFRAGEN, filterNurEigeneVorgaenge: true, filterStatusAbfrage: [StatusAbfrage.EinplanungBedarfe] };
    case "ERLEDIGT":
      return {
        ...ABFRAGEN,
        filterNurEigeneVorgaenge: true,
        filterStatusAbfrage: [StatusAbfrage.ErledigtMitFachreferat, StatusAbfrage.ErledigtOhneFachreferat],
      };
    case "VORHABEN":
      return { ...VORHABEN, filterNurEigeneVorgaenge: true };
    case "INFRASTRUKTUREINRICHTUNGEN":
      return { ...INFRASTRUKTUREINRICHTUNGEN, filterNurEigeneVorgaenge: true };
    case "ALLE":
    default:
      return { ...ALLE_OBJEKTE, filterNurEigeneVorgaenge: true };
  }
}

/**
 * Die Sachbearbeitung sieht ihre Vorgänge und überwacht ihren Zuständigkeitsbereich über den Stadtbezirksfilter.
 */
export const STARTSEITE_SACHBEARBEITUNG: StartseitenKonfiguration = {
  schnellfilterOptionen: SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG,
  getSuchkriterien: getSuchkriterienSachbearbeitung,
  neuanlageOptionen: [
    { title: "Vorhaben erstellen", icon: "mdi-account-hard-hat", route: "/bauvorhaben" },
    { title: "Infrastruktureinrichtung erstellen", icon: "mdi-home", route: "/infrastruktureinrichtung" },
  ],
  stadtbezirkFilter: true,
};

/**
 * Die Abfragestatus, in denen die Bedarfsmeldung eingebunden ist bzw. war.
 * <p>
 * "Erledigt ohne Einbindung Fachreferat" fehlt bewusst, da die Bedarfsmeldung an diesen Abfragen nie beteiligt war.
 */
const STATUS_BEDARFSMELDUNG = {
  zurBearbeitung: [StatusAbfrage.EinpflegenBedarfsmeldung],
  zurKenntnis: [StatusAbfrage.EinplanungBedarfe],
  erledigt: [StatusAbfrage.ErledigtMitFachreferat],
};

/**
 * Bildet die Schnellfilter der Bedarfsmeldung auf die Suchkriterien ab.
 * <p>
 * "Alle" und "Zur Bearbeitung" zeigen die Abfragen im Zuständigkeitsbereich der Bedarfsmeldung ohne Personenbezug.
 * Die übrigen Schnellfilter zeigen nur die Vorgänge, welche die Person laut Bearbeitungshistorie erstellt oder
 * bearbeitet hat.
 *
 * @param schnellfilter der ausgewählte Schnellfilter.
 * @returns die Suchkriterien.
 */
export function getSuchkriterienBedarfsmeldung(schnellfilter: SchnellfilterVorgaenge): Suchkriterien {
  switch (schnellfilter) {
    case "ZUR_BEARBEITUNG":
      return { ...ABFRAGEN, filterStatusAbfrage: STATUS_BEDARFSMELDUNG.zurBearbeitung };
    case "ZUR_KENNTNIS":
      return { ...ABFRAGEN, filterNurEigeneVorgaenge: true, filterStatusAbfrage: STATUS_BEDARFSMELDUNG.zurKenntnis };
    case "ERLEDIGT":
      return { ...ABFRAGEN, filterNurEigeneVorgaenge: true, filterStatusAbfrage: STATUS_BEDARFSMELDUNG.erledigt };
    case "INFRASTRUKTUREINRICHTUNGEN":
      return { ...INFRASTRUKTUREINRICHTUNGEN, filterNurEigeneVorgaenge: true };
    case "VORHABEN":
      return { ...VORHABEN, filterNurEigeneVorgaenge: true };
    case "ALLE":
    default:
      return {
        ...ABFRAGEN,
        filterStatusAbfrage: [
          ...STATUS_BEDARFSMELDUNG.zurBearbeitung,
          ...STATUS_BEDARFSMELDUNG.zurKenntnis,
          ...STATUS_BEDARFSMELDUNG.erledigt,
        ],
      };
  }
}

/**
 * Die Bedarfsmeldung (Kita, Schule, Sozialplanung und Flächenbedarfsmeldung) sieht die Abfragen ihres
 * Zuständigkeitsbereichs und ihre Vorgänge und kann diese nach Stadtbezirken filtern.
 * <p>
 * Die Neuanlage beschränkt sich auf Infrastruktureinrichtungen, da Vorhaben nur von der Sachbearbeitung angelegt
 * werden dürfen (Authority `ISI_BACKEND_WRITE_BAUVORHABEN`).
 */
export const STARTSEITE_BEDARFSMELDUNG: StartseitenKonfiguration = {
  schnellfilterOptionen: SCHNELLFILTER_OPTIONEN_BEDARFSMELDUNG,
  getSuchkriterien: getSuchkriterienBedarfsmeldung,
  neuanlageOptionen: [
    { title: "Infrastruktureinrichtung erstellen", icon: "mdi-home", route: "/infrastruktureinrichtung" },
  ],
  stadtbezirkFilter: true,
};

/**
 * Bildet die Schnellfilter der Nutzer (Rolle Anwender) auf die Suchkriterien ab.
 * <p>
 * Nutzer lesen ausschließlich und sehen daher alle Vorgänge ohne Personenbezug. Die Einschränkung auf erledigte
 * Abfragen bei "Alle" nimmt das Backend für Nutzer mit ausschließlich der Rolle Anwender selbst vor, damit Vorhaben
 * und Infrastruktureinrichtungen nicht durch den Statusfilter der Abfragen herausfallen.
 *
 * @param schnellfilter der ausgewählte Schnellfilter.
 * @returns die Suchkriterien.
 */
export function getSuchkriterienAnwender(schnellfilter: SchnellfilterVorgaenge): Suchkriterien {
  switch (schnellfilter) {
    case "ERLEDIGT":
      return {
        ...ABFRAGEN,
        filterStatusAbfrage: [StatusAbfrage.ErledigtMitFachreferat, StatusAbfrage.ErledigtOhneFachreferat],
      };
    case "VORHABEN":
      return { ...VORHABEN };
    case "INFRASTRUKTUREINRICHTUNGEN":
      return { ...INFRASTRUKTUREINRICHTUNGEN };
    case "ALLE":
    default:
      return { ...ALLE_OBJEKTE };
  }
}

/**
 * Nutzer (Rolle Anwender) sehen die erledigten Abfragen sowie alle Vorhaben und Infrastruktureinrichtungen und
 * können diese nach Stadtbezirken filtern. Da sie nur lesen, gibt es keine Neuanlage.
 */
export const STARTSEITE_ANWENDER: StartseitenKonfiguration = {
  schnellfilterOptionen: SCHNELLFILTER_OPTIONEN_ANWENDER,
  getSuchkriterien: getSuchkriterienAnwender,
  neuanlageOptionen: [],
  stadtbezirkFilter: true,
};

/**
 * Die Rollen, für die eine personalisierte Startseite existiert.
 */
export interface StartseitenRollen {
  hasRoleAdmin: boolean;
  hasRoleAbfrageerstellung: boolean;
  hasRoleSachbearbeitung: boolean;
  hasRoleBedarfsmeldungKita: boolean;
  hasRoleBedarfsmeldungSchule: boolean;
  hasRoleBedarfsmeldungSozialplanung: boolean;
  hasRoleFlaechenbedarfsmeldung: boolean;
  hasOnlyRoleAnwender: boolean;
}

/**
 * Ermittelt die personalisierte Startseite anhand der Rollen des Nutzers.
 * <p>
 * Bei mehreren Rollen bestimmt die erste passende Rolle in der hier festgelegten Reihenfolge Schnellfilter,
 * Suchkriterien und Stadtbezirksfilter. Das Menü "Neu" bietet die Neuanlagen aller Rollen des Nutzers an.
 * Administratoren erhalten unabhängig von weiteren Rollen die Standard-Startseite.
 *
 * @param rollen die Rollen des Nutzers.
 * @returns die Konfiguration der Startseite oder `undefined`, falls für keine Rolle eine personalisierte
 *          Startseite existiert und die Standard-Startseite angezeigt wird.
 */
export function getStartseitenKonfiguration(rollen: StartseitenRollen): StartseitenKonfiguration | undefined {
  if (rollen.hasRoleAdmin) {
    return undefined;
  }
  const konfigurationen: Array<StartseitenKonfiguration> = [];
  if (rollen.hasRoleSachbearbeitung) {
    konfigurationen.push(STARTSEITE_SACHBEARBEITUNG);
  }
  if (
    rollen.hasRoleBedarfsmeldungKita ||
    rollen.hasRoleBedarfsmeldungSchule ||
    rollen.hasRoleBedarfsmeldungSozialplanung ||
    rollen.hasRoleFlaechenbedarfsmeldung
  ) {
    konfigurationen.push(STARTSEITE_BEDARFSMELDUNG);
  }
  if (rollen.hasRoleAbfrageerstellung) {
    konfigurationen.push(STARTSEITE_ABFRAGEERSTELLUNG);
  }
  // Wie im Backend gilt die Einschränkung auf erledigte Abfragen nur für Nutzer, die ausschließlich Anwender sind.
  if (rollen.hasOnlyRoleAnwender) {
    konfigurationen.push(STARTSEITE_ANWENDER);
  }
  if (konfigurationen.length <= 1) {
    return konfigurationen[0];
  }
  return {
    ...konfigurationen[0],
    neuanlageOptionen: _.uniqBy(
      konfigurationen.flatMap((konfiguration) => konfiguration.neuanlageOptionen),
      (option) => option.route,
    ),
  };
}
