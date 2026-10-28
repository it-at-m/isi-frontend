import { AbfrageDtoArtAbfrageEnum, type SearchQueryAndSortingDto, StatusAbfrage } from "@/api/api-client/isi-backend";
import { getAbfrageArtLabel, getAbfrageIcon } from "@/utils/AbfrageIconUtil";
import {
  type AuswahlOption,
  type SchnellfilterVorgaenge,
  SCHNELLFILTER_OPTIONEN,
  SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG,
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
  /** Die Einträge des Menüs "Neu". */
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
 * "Eigene Vorgänge" sind die selbst erstellten oder zuletzt bearbeiteten Vorhaben und Infrastruktureinrichtungen
 * sowie die Abfragen, welche die Sachbearbeitung in den Status "Start Bearbeitung" übernommen hat. Die noch nicht
 * übernommenen Abfragen im Status "Übermittelt zur Bearbeitung" werden ohne Personenbezug angezeigt.
 *
 * @param schnellfilter der ausgewählte Schnellfilter.
 * @returns die Suchkriterien.
 */
export function getSuchkriterienSachbearbeitung(schnellfilter: SchnellfilterVorgaenge): Suchkriterien {
  switch (schnellfilter) {
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
 * Die Rollen, für die eine personalisierte Startseite existiert.
 */
export interface StartseitenRollen {
  hasRoleAbfrageerstellung: boolean;
  hasRoleSachbearbeitung: boolean;
}

/**
 * Ermittelt die personalisierte Startseite anhand der Rollen des Nutzers.
 * <p>
 * Bei mehreren Rollen gewinnt die erste passende Rolle in der hier festgelegten Reihenfolge.
 *
 * @param rollen die Rollen des Nutzers.
 * @returns die Konfiguration der Startseite oder `undefined`, falls für keine Rolle eine personalisierte
 *          Startseite existiert und die Standard-Startseite angezeigt wird.
 */
export function getStartseitenKonfiguration(rollen: StartseitenRollen): StartseitenKonfiguration | undefined {
  if (rollen.hasRoleAbfrageerstellung) {
    return STARTSEITE_ABFRAGEERSTELLUNG;
  }
  if (rollen.hasRoleSachbearbeitung) {
    return STARTSEITE_SACHBEARBEITUNG;
  }
  return undefined;
}
