import {
  type AbfrageSearchResultDto,
  type BauvorhabenSearchResultDto,
  type InfrastruktureinrichtungSearchResultDto,
  type SchnellfilterVorgaenge,
  StatusAbfrage,
} from "@/api/api-client/isi-backend";

/**
 * Die Schnellfilter des Startseitenbereichs "Meine Vorgänge" aller Rollen.
 *
 * Die Werte entsprechen dem Backend-Enum `SchnellfilterVorgaenge`. Welche Schnellfilter einer Rolle angeboten
 * werden, legt deren Startseitenkonfiguration fest (siehe `StartseitenKonfiguration.ts`).
 */
export type { SchnellfilterVorgaenge };

/**
 * Ein Eintrag im Bereich "Meine Vorgänge".
 */
export type Vorgang = AbfrageSearchResultDto | BauvorhabenSearchResultDto | InfrastruktureinrichtungSearchResultDto;

/**
 * Die Sortierkriterien des Startseitenbereichs "Meine Vorgänge".
 *
 * Die Werte entsprechen dem Backend-Enum `SortAttribute`.
 */
export type SortierungVorgaenge = "CREATED_DATE_TIME" | "LAST_MODIFIED_DATE_TIME" | "FRIST_BEARBEITUNG";

export const DEFAULT_SCHNELLFILTER: SchnellfilterVorgaenge = "ALLE";

export const DEFAULT_SORTIERUNG: SortierungVorgaenge = "CREATED_DATE_TIME";

export interface AuswahlOption<T> {
  title: string;
  value: T;
}

/**
 * Die Schnellfilter der Startseite für Abfrageersteller.
 */
export const SCHNELLFILTER_OPTIONEN: Array<AuswahlOption<SchnellfilterVorgaenge>> = [
  { title: "Alle Vorgänge", value: "ALLE" },
  { title: "Entwürfe", value: "ENTWUERFE" },
  { title: "Zur Bearbeitung", value: "ZUR_BEARBEITUNG" },
  { title: "Zur Kenntnis", value: "ZUR_KENNTNIS" },
  { title: "Abgeschlossene Vorgänge", value: "ABGESCHLOSSEN" },
];

export const SORTIERUNG_OPTIONEN: Array<AuswahlOption<SortierungVorgaenge>> = [
  { title: "Zuletzt hinzugefügt", value: "CREATED_DATE_TIME" },
  { title: "Zuletzt bearbeitet", value: "LAST_MODIFIED_DATE_TIME" },
  { title: "Bearbeitungsfrist", value: "FRIST_BEARBEITUNG" },
];

/**
 * Bildet einen Schnellfilter auf die dazugehörigen Abfragestatus ab.
 * <p>
 * Der Schnellfilter "Entwürfe" enthält ausschließlich die noch nicht übermittelten Abfragen im Status
 * `ANGELEGT`. Die Einschränkung auf die selbst angelegten Abfragen erfolgt beim Aufruf der Suche über
 * `filterNurEigeneAbfragen`, welches im Bereich "Meine Vorgänge" immer gesetzt ist.
 *
 * @param schnellfilter der ausgewählte Schnellfilter.
 * @returns die zu filternden Status oder `undefined`, falls nicht nach Status gefiltert werden soll.
 */
export function getStatusAbfrageForSchnellfilter(
  schnellfilter: SchnellfilterVorgaenge | undefined,
): Array<StatusAbfrage> | undefined {
  switch (schnellfilter) {
    case "ENTWUERFE":
      return [StatusAbfrage.Angelegt];
    case "ZUR_BEARBEITUNG":
      return [StatusAbfrage.EinplanungBedarfe];
    case "ZUR_KENNTNIS":
      return [
        StatusAbfrage.UebermitteltZurBearbeitung,
        StatusAbfrage.StartBearbeitung,
        StatusAbfrage.EinpflegenBedarfsmeldung,
      ];
    case "ABGESCHLOSSEN":
      return [StatusAbfrage.ErledigtMitFachreferat, StatusAbfrage.ErledigtOhneFachreferat];
    case "ALLE":
    default:
      return undefined;
  }
}

/**
 * Die Sortierreihenfolge zum jeweiligen Sortierkriterium.
 *
 * Nach der Bearbeitungsfrist wird aufsteigend sortiert, damit die kürzeste Restlaufzeit zuerst erscheint.
 * Die übrigen Kriterien werden absteigend sortiert, damit die neuesten Vorgänge zuerst erscheinen.
 *
 * @param sortierung das ausgewählte Sortierkriterium.
 * @returns "ASC" oder "DESC".
 */
export function getSortOrderForSortierung(sortierung: SortierungVorgaenge | undefined): "ASC" | "DESC" {
  return sortierung === "FRIST_BEARBEITUNG" ? "ASC" : "DESC";
}

/**
 * Die Schnellfilter der Startseite für die Sachbearbeitung.
 */
export const SCHNELLFILTER_OPTIONEN_SACHBEARBEITUNG: Array<AuswahlOption<SchnellfilterVorgaenge>> = [
  { title: "Alle", value: "ALLE" },
  { title: "Übermittelt zur Bearbeitung", value: "UEBERMITTELT_ZUR_BEARBEITUNG" },
  { title: "Start Bearbeitung", value: "START_BEARBEITUNG" },
  { title: "Einpflegen Bedarfsmeldung", value: "EINPFLEGEN_BEDARFSMELDUNG" },
  { title: "Einplanung Bedarfe", value: "EINPLANUNG_BEDARFE" },
  { title: "Erledigt", value: "ERLEDIGT" },
  { title: "Vorhaben", value: "VORHABEN" },
  { title: "Infrastruktureinrichtungen", value: "INFRASTRUKTUREINRICHTUNGEN" },
];

/**
 * Liefert den Schnellfilter, falls er zu den angebotenen Optionen gehört, andernfalls den Standard-Schnellfilter.
 *
 * Die Voreinstellung wird je Nutzer gespeichert. Ein Nutzer mit mehreren Rollen kann daher einen Schnellfilter
 * gespeichert haben, den die aktuell angezeigte Startseite nicht anbietet.
 *
 * @param schnellfilter der gespeicherte oder ausgewählte Schnellfilter.
 * @param optionen die angebotenen Schnellfilter.
 * @returns einen angebotenen Schnellfilter.
 */
export function getGueltigenSchnellfilter(
  schnellfilter: SchnellfilterVorgaenge | undefined,
  optionen: Array<AuswahlOption<SchnellfilterVorgaenge>>,
): SchnellfilterVorgaenge {
  return optionen.some((option) => option.value === schnellfilter)
    ? (schnellfilter as SchnellfilterVorgaenge)
    : DEFAULT_SCHNELLFILTER;
}

/**
 * Die Stadtbezirke der Landeshauptstadt München zur Filterung der Vorgänge.
 *
 * Die Werte entsprechen dem Suchfilter `filterStadtbezirkNummer`.
 */
export const STADTBEZIRK_OPTIONEN: Array<AuswahlOption<string>> = [
  "Altstadt-Lehel",
  "Ludwigsvorstadt-Isarvorstadt",
  "Maxvorstadt",
  "Schwabing-West",
  "Au-Haidhausen",
  "Sendling",
  "Sendling-Westpark",
  "Schwanthalerhöhe",
  "Neuhausen-Nymphenburg",
  "Moosach",
  "Milbertshofen-Am Hart",
  "Schwabing-Freimann",
  "Bogenhausen",
  "Berg am Laim",
  "Trudering-Riem",
  "Ramersdorf-Perlach",
  "Obergiesing-Fasangarten",
  "Untergiesing-Harlaching",
  "Thalkirchen-Obersendling-Forstenried-Fürstenried-Solln",
  "Hadern",
  "Pasing-Obermenzing",
  "Aubing-Lochhausen-Langwied",
  "Allach-Untermenzing",
  "Feldmoching-Hasenbergl",
  "Laim",
].map((name, index) => {
  const nummer = String(index + 1).padStart(2, "0");
  return { title: nummer + " " + name, value: nummer };
});
